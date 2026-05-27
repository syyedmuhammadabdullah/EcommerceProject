import Button from "./Button";

const OrderItemActions = ({ product, order, onReview, onCancel }) => {
  const isDelivered = order.status === "delivered";
  const isPending = order.status === "pending";
  const isRefunded = order.status === "refunded";

  const isReviewed = product.isReviewed;

  const canReview = (isDelivered || isRefunded) && !isReviewed;

  return (
    <div>
      {(!isDelivered && !isRefunded && product.status !== "cancelled") ?
        <Button disabled={!isPending} onClick={() => onCancel(product.productId)}>
          Cancel
        </Button>: <p>{product.status}</p>
      }

      {canReview && (
        <Button onClick={() => onReview(product)}>Review</Button>
      )}

      {isReviewed && isDelivered && (
        <div>
          <p>Reviewed</p>
          <Button onClick={() => onReview(product)}>Edit Review</Button>
        </div>
      )}
    </div>
  );
};

export default OrderItemActions;