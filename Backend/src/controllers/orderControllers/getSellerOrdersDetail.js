import mongoose from "mongoose";
import {
  apiError,
  apiResponse,
  asyncHandler,
  OrderModel,
  SellerWalletModel
} from "../../index.js";


const generateLabels = (range, startDate) => {
  const labels = [];
  const current = new Date(startDate);

  // const pad = (n) => String(n).padStart(2, "0");
  const pad = (n) => (n < 10 ? '0' + n : n);
  const pad2 = (n) => ( n);

  if (range === "daily") {
    // 24 hours
    for (let i = 0; i < 24; i++) {
      labels.push(
        `${pad(current.getDate())}-${pad(current.getHours())}`
      );
      current.setHours(current.getHours() + 1);
    }
  }

  else if (range === "weekly") {
    // 7 days
    for (let i = 0; i < 7; i++) {
      labels.push(
        `${current.getFullYear()}-${pad(current.getMonth()+1)}-${pad(current.getDate())}`
      );
      current.setDate(current.getDate() + 1);
    }
  }

  else if (range === "monthly") {
    // 30 days
    for (let i = 0; i < 30; i++) {
      labels.push(
        `${current.getFullYear()}-${pad(current.getMonth()+1)}-${pad2(current.getDate())}`
      );
      current.setDate(current.getDate() + 1);
    }
  }

  else if (range === "6 months") {
    // 6 months
    for (let i = 0; i < 6; i++) {
      labels.push(
        `${current.getFullYear()}-${pad(current.getMonth()+1)}`
      );
      current.setMonth(current.getMonth() + 1);
    }
  }

  return labels;
};



/* -------------------- ORGANIZE CHART -------------------- */
// const orginizeChart = (chartStats) => {
//   const labelsSet = new Set();
//   const delivered = {};
//   const pending = {};
//   const refunded = {};

//   let totalItems = 0;
//   let totalPendingOrders = 0;
//   let totalDeliveredOrders = 0;

//   chartStats.forEach(item => {
//     const date = item._id.date;
//     const status = item._id.status;

//     labelsSet.add(date);
//     totalItems += item.count;

//     if (status === "delivered") {
//       delivered[date] = (delivered[date] || 0) + item.amount;
//       totalDeliveredOrders += item.count;
//     }

//     if (status === "pending") {
//       pending[date] = (pending[date] || 0) + item.amount;
//       totalPendingOrders += item.count;
//     }

//     if (status === "refunded") {
//       refunded[date] = (refunded[date] || 0) + item.amount;
//     }
//   });

//   const labels = [...labelsSet].sort();

//   return {
//     labels,
//     totalItems,
//     totalPendingOrders,
//     totalDeliveredOrders,
//     delivered: labels.map(d => delivered[d] || 0),
//     pending: labels.map(d => pending[d] || 0),
//     refunded: labels.map(d => refunded[d] || 0)
//   };
// };




const fillSeries = (labels, map) =>{
  
 return labels.map(label => map[label] || 0)}


const orginizeChart = (chartStats, range, startDate) => {
  const delivered = [];
  const pending = {};
  const refunded = {};

  let totalItems = 0;
  let totalPendingOrders = 0;
  let totalDeliveredOrders = 0;

  chartStats.forEach(item => {
    const { date, status } = item._id;

    totalItems += item.count;
    console.log(item);
    

    if (status === "delivered") {
      
      delivered[date] = (delivered[date] || 0) + item.amount;
      totalDeliveredOrders += item.count;
    }

    if (status === "pending") {
      pending[date] = (pending[date] || 0) + item.amount;
      totalPendingOrders += item.count;
    }

    if (status === "refunded") {
      console.log("refunded", item);
      
      refunded[date] = (refunded[date] || 0) + item.amount;
    }
  });

  const labels = generateLabels(range, startDate);

  return {
    labels,
    totalItems,
    totalPendingOrders,
    totalDeliveredOrders,
    delivered: fillSeries(labels, delivered),
    pending: fillSeries(labels, pending),
    refunded: fillSeries(labels, refunded)
  };
};


/* -------------------- RANGE FORMAT -------------------- */

const rangeFormat=(range)=>{
  let groupFormat;
   

switch (range) {
  case"daily":
  
  groupFormat = "%d-%H";
  break;
  case "weekly":
    groupFormat = "%Y-%m-%d";
    break;
    case "monthly":
      groupFormat = "%Y-%U-%w"; // week number
      break;
      case "6 months":
    groupFormat = "%Y-%m";
    break;
  default:
    groupFormat = "%Y-%m-%d";
}
const now = new Date();

if (range === "daily") {
 return {startDate: new Date(now.setDate(now.getDate() - 1)), groupFormat }
}else if (range === "weekly") {
 return {startDate:new Date(now.setDate(now.getDate() -7)), groupFormat}; // last 7 days
}
else if (range === "monthly") {
 return {startDate:new Date(now.setDate(now.getDate() - 30)), groupFormat}; 
}
else if (range === "6 months") {
 return{startDate: new Date(now.setMonth(now.getMonth() - 6)), groupFormat};
}
}

/* -------------------- CONTROLLER -------------------- */
const getSellerOrdersDetail = asyncHandler(async (req, res) => {

  let sellerId;
  if (req?.query?.sellerId) {
    if (!mongoose.Types.ObjectId.isValid(req.query.sellerId)) {
      throw new apiError(400, "Invalid seller id");
    }
    sellerId = new mongoose.Types.ObjectId(req.query.sellerId);
  } else {
    sellerId = req.seller.sellerId;
  }

  const { startDate, groupFormat } = rangeFormat(req.query.range);

const chartStats = await OrderModel.aggregate([
  {
    $match: {
      sellerId,
      orderDate: { $gte: startDate }
    }
  },
  {
    $group: {
      _id: {
        date: {
          $dateToString: {
            format: groupFormat,
            date: "$updatedAt" 
          }
        },
        status: "$status"
      },
      count: { $sum: 1 },
      amount: {
  $sum: {
    
        $subtract: [
          { $ifNull: ["$totalPrice", 0] },
          { $ifNull: ["$commissionAmount", 0] }
        ]
      
  }
},
    netEarning: {
  $sum: {
    
        $subtract: [
          { $ifNull: ["$totalPrice", 0] },
          { $ifNull: ["$commissionAmount", 0] }
        ]
      
  }
}
    }
  },
  { $sort: { "_id.date": 1 } }
]);


  let wallet = null;
  if (req.role === "admin" && sellerId) {
    wallet = await SellerWalletModel
      .findOne({ sellerId })
      .select("balance -_id");
  }

  res.status(200).json(
    new apiResponse(
      200,
      "Order found successfully",
      {
        chart: orginizeChart(chartStats, req.query.range,startDate),
        wallet
      }
    )
  );
});

export { getSellerOrdersDetail };
