
function updateProductsStatus(order,items,status,refundStatus) {
      const selectedSet=new Set(items);
    order.products=order.products.map(item=>{
        if(selectedSet.has(item.productId.toString())){
            return {
               
  ...item,
  ...(status && { status }),
  ...(refundStatus && { refundStatus }),
}
            
        }
        return item;
    })    
}

export  {updateProductsStatus}