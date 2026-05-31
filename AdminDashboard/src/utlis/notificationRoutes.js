const notificationRoutes = {
  order: (data) => `/order-details/${data.orderId}`,
  withdraw: (data) => `/withdraw/${data.withdrawId}`,
  message: (data) => `/chat/${data.chatId}`,
  product: (data) => `/edit-product/${data.productId}`,
  question: (data) => `/product-questions/${data.productId}/question/${data.questionId}`,
  withdrawal: (data) => `/withdraw/${data.transactionId}`,

};

export default notificationRoutes;