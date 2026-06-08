import updateItemStatus from "../store/slices/orderSlice/updateItemStatus";
import Button from "./Button";
import CheckBox from "./CheckBox";
const OrderItemActions = ({ product, order, onReview, onCancel,items }) => {
  const isDelivered = order.shipmentStatus === "delivered";
  const isPending = order.status === "pending";
  const isRefunded = order.refundStatus === "refunded";

  const isReviewed = product.isReviewed;

  const canReview = (isDelivered || isRefunded) && !isReviewed;
  console.log(product,items);
  

  return (
    <div>
      {isPending &&product.status==="pending"?
        <CheckBox id={product.productId} isChecked={items?.includes(product.productId)}   onChange={() => onCancel(product.productId)}/>
        :!isDelivered&& product.status
      }

      {canReview &&product.status!=="cancelled"&&product.status!=="rejected" && (
        <Button onClick={() => onReview(product)}>Review</Button>
      )}

      {isReviewed && isDelivered && (product.status !== "cancelled"&&product.status!=="rejected") ? (
        <div>
          <Button onClick={() => onReview(product)}>Edit Review</Button>
        </div>
      ):product.status}
    </div>
  );
};

export default OrderItemActions;