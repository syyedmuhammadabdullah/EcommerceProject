import { generateLabels } from "./generateLabels.js";
const orginizeChart = (chartStats, range, startDate) => {
  const delivered = [];
  const cancelled = [];
  const refunded = [];
  const pending = [];

  let totalItems = 0;
  let totalCancelledOrders = 0;
  let totalDeliveredOrders = 0;
  let totalRefundedOrders = 0;
  let totalPendingOrders = 0;

  chartStats.forEach(item => {
    const { date, status } = item._id;
    totalItems += item.count;    
    if (status === "delivered") {
      delivered[date] = (delivered[date] || 0) + item.amount;
      totalDeliveredOrders += item.count;
    }

    if (status === "cancelled" || status === "rejected") {
      cancelled[date] = (cancelled[date] || 0) + item.amount;
      totalCancelledOrders += item.count;
      
    }

    if (status === "refunded") {      
      refunded[date] = (refunded[date] || 0) + item.amount;
      totalRefundedOrders += item.count;
    }

    if (status === "pending") {
      pending[date] = (pending[date] || 0) + item.amount;
      totalPendingOrders += item.count;
      
    }
  });

  const labels = generateLabels(range, startDate);
  const fillSeries = (labels, map) =>{
    
 return labels.map(label => map[label] || 0)}

  return {
    labels,
    totalItems,
    totalCancelledOrders,
    totalDeliveredOrders,
    totalRefundedOrders,
    totalPendingOrders,
    pending: fillSeries(labels, pending),
    delivered: fillSeries(labels, delivered),
    cancelled: fillSeries(labels, cancelled),
    refunded: fillSeries(labels, refunded)
  };
}

export  {orginizeChart};