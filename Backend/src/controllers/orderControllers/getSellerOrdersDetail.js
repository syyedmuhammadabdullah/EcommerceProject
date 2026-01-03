import mongoose from "mongoose";
import {apiError,apiResponse,asyncHandler,OrderModel,SellerWalletModel} from "../../index.js";

const orginizeChart=(chartStats)=>{
const labelsSet = new Set();
const delivered = {};
const pending = {};
const refunded = {};
let totalItems = 0;
let totalPendingOrders = 0;
let totalDeliveredOrders = 0;

chartStats.forEach(item => {
  const date = item._id.date;
  const status = item._id.status;

  labelsSet.add(date);
  totalItems +=item.count
  if (status === "delivered") {
    delivered[date] = (delivered[date] || 0) + item.amount;
    totalDeliveredOrders += item.count
  }

  if (status === "pending") {
    pending[date] = (pending[date] || 0) + item.amount;
    totalPendingOrders += item.count
  }

  if (status === "refunded") {
    refunded[date] = (refunded[date] || 0) + item.amount;
  }
});

const labels = [...labelsSet].sort();


const response = {
  labels,
  totalItems,
  totalPendingOrders,
  totalDeliveredOrders,
  delivered: labels.map(d => delivered[d] || 0),
  pending: labels.map(d => pending[d] || 0),
  refunded: labels.map(d => refunded[d] || 0)
};

return response

}

const rangeFormat=(range)=>{
  let groupFormat;
   

switch (range) {
  case"daily":
  
  groupFormat = "%Y-%m-%d %H";
  break;
  case "weekly":
    groupFormat = "%Y-%m-%d";
    break;
    case "monthly":
      groupFormat = "%Y-%U"; // week number
      break;
      case "6 months":
    groupFormat = "%Y-%m";
    break;
  default:
    groupFormat = "%Y-%m-%d";
}
const now = new Date();

if (range === "daily") {
 return {startDate: new Date(now.setHours(now.getHours() - 24)), groupFormat }
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

const getSellerOrdersDetail=asyncHandler(async(req,res)=>{

  let sellerId;
  if (req?.query?.sellerId) {
    if (!mongoose.Types.ObjectId.isValid(req?.query?.sellerId)) {
        throw new apiError(400, "Invalid seller id");
    }
    sellerId=new mongoose.Types.ObjectId(req.query?.sellerId);
  }else{
    sellerId=req?.seller?.sellerId
  }

const{  startDate, groupFormat} = rangeFormat(req.query.range);

 const chartStats = await OrderModel.aggregate([
  {
    $match: {
      sellerId:sellerId,
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
      amount: { $sum: "$totalPrice" }
    }
  },
  { $sort: { "_id.date": 1 } }
]).catch((error) => {
  console.error("Error fetching chart stats:", error);
  throw new apiError(500, "Failed to fetch chart stats",error);
});
let wallet;
if (req.role==="admin", sellerId) {
  wallet=await SellerWalletModel.findOne({sellerId}).select("balance -_id");
}
const response={chart:orginizeChart(chartStats),wallet};


    res.status(200).json(new apiResponse(200,"Order found successfully",response))
})
export {getSellerOrdersDetail}