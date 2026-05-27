

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Button,trackOrder,updateItemStatus,updateOderStatus} from "../index"
import ReviewComponent from '../components/ReviewComponent'
import OrderItemActions from '../components/OrderItemActions'

const TrackOrderPage = () => {
    const {trackedOrder,error}=useSelector(state=>state.order)
    const [formattedDate,setFormattedDate]=useState("loading...")
    const [isReview,setIsReview]=useState('')
    const [selectedReview, setSelectedReview] = useState(null);
    const {orderId}=useParams();
    const dispatch=useDispatch()

    const isDelivered = trackedOrder?.status === "delivered";
const isPending = trackedOrder?.status === "pending";
const isCancelled = trackedOrder?.status === "cancelled";
const isRefundPending = trackedOrder?.refundStatus === "pending";

const canCancelOrder = isPending;
const canReview = isDelivered || trackedOrder?.status === "refunded";



    useEffect(()=>{
        if(trackedOrder?._id===orderId) return;


        dispatch(trackOrder({orderId}))
    },[orderId,dispatch])

    useEffect(() => {
        if (trackedOrder?.createdAt) { // Check if createdAt exists
            console.log(trackedOrder);
            
          const createdAt = new Date(trackedOrder.createdAt);
          if (!isNaN(createdAt)) { // Ensure the date is valid
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }).format(createdAt);
            setFormattedDate(formattedDate);
          }
        }
      }, [trackedOrder]);

        const handleCancelOrder=()=>{
            // Implement cancel order functionality here
            dispatch(updateOderStatus({orderId,status:"cancelled"}))
        console.log("cancel called");
        }
        
        const handleProductCancel=(itemId)=>{
            // Implement cancel order functionality here
            dispatch(updateItemStatus({orderId,itemId,status:"cancelled"}))
        console.log("cancel called");
        }
        const handleReview=(product)=>{
            setSelectedReview(product)
            // setIsReview(productId)
            // Implement cancel order functionality here
            console.log("review called for product id ",product);
        }

        const handleRefund=()=>{
            // Implement cancel order functionality here
            dispatch(updateOderStatus({orderId,refundStatus:"requested"}))
        console.log("refund called");
        }
        const handleItemRefund=(itemId)=>{
            // Implement cancel order functionality here
            dispatch(updateItemStatus({orderId,itemId,status:"requested"}))
        console.log("refund called for item id ",itemId);
        }
    return (
        <section className='flex relative justify-center'>
        <div className="container flex flex-col gap-xxl py-p-xxl px-p-xl sm:p-xxl">
            <div className="content flex justify-between items-center">
                <h3>Order Detail</h3>
                {(isDelivered && isRefundPending)?<Button children='Request Refund' onClick={handleRefund} className='bg-warning-base text-white py-xs rounded-md px-xxl'/>:isRefundPending ?"": "Refund Status: "+trackedOrder?.refundStatus}
            {!isDelivered&& (isCancelled?"Canceled":<Button disabled={!isPending} onClick={handleCancelOrder} children="Cancel" className={`text-white rounded-md py-xs px-xxl bg-warning-base ${!isPending && "cursor-not-allowed"}`}></Button>)}
                {/* <Link to="/user-account/order-history" className='text-primary-base'>Back to orders</Link> */}
            </div>

        <div className="item grid gap-lg">

        <div className="payment flex md:gap-xxl flex-col md:flex-row gap-xs md:items-center">

            <div className="paymentTitle">
                <h4>Payment</h4>
            </div>

                <div className="orderStatus flex gap-xs ">
                    <p>Fullfillment Status:</p>
                    <p>{trackedOrder?.status}</p>
                </div>

            <div className="paymentStatus flex gap-xs">
                <p>Payment status:</p>
                <p>{trackedOrder?.paymentStatus}</p>
            </div>
        </div>

        <div className="paymentOptions grid md:grid-cols-2 gap-4">

        <div className="paymentMethod flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Payment method</h5>
            </div>

            <div className="method flex gap-xs">
                <p className='text-[#000000a6]'>Payment By:</p>
                <p>{trackedOrder?.paymentMethod}</p>
            </div>

            {
                trackedOrder?.paymentMethod!=="cod"&&
                <div className="transcationId flex gap-xs">
                <p className='text-[#000000a6]'>Transcaion id:</p>
                <p>#67575755</p>
            </div>
            }
           
            <div className="price flex gap-xs">
                <p className='text-[#000000a6]'>Amount:</p>
                <p>RS {trackedOrder?.totalPrice}</p>
            </div>
        </div>

        <div className="shippingtMethod flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Shipping method</h5>
            </div>

            <div className="method flex gap-xs">
                <p className='text-[#000000a6]'>Order Placed:</p>
                <p>{formattedDate}</p>
            </div>

            <div className="transcationId flex gap-xs">
                <p className='text-[#000000a6]'>Transcaion id:</p>
                <p>#67575755</p>
            </div>
            <div className="price flex gap-xs">
                <p className='text-[#000000a6]'>Amount:</p>
                <p>RS 2300</p>
            </div>
        </div>

        </div>
        <div className="shippingOptions grid md:grid-cols-2 gap-4">

        <div className="shippingAddress flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Shipping Address</h5>
            </div>

            <div className="f-name flex gap-xs">
                <p className='text-[#000000a6]'>Full Name:</p>
                <p>{trackedOrder?.shippingAddress?.fullName}</p>
            </div>
            
            <div className="Country flex gap-xs">
                <p className='text-[#000000a6]'>Country:</p>
                <p>{trackedOrder?.shippingAddress?.country}</p>
            </div>

            <div className="state flex gap-xs">
                <p className='text-[#000000a6]'>State:</p>
                <p>{trackedOrder?.shippingAddress?.state}</p>
            </div>

            <div className="city flex gap-xs">
                <p className='text-[#000000a6]'>City:</p>
                <p>{trackedOrder?.shippingAddress?.city}</p>
            </div>

            <div className="address flex gap-xs">
                <p className='text-[#000000a6]'>Address:</p>
                <div>

                <p>{trackedOrder?.shippingAddress?.addressOne}</p>
                <p>{trackedOrder?.shippingAddress?.addressTwo}</p>
                </div>
            </div>

            <div className="email flex gap-xs">
                <p className='text-[#000000a6]'>Postal code:</p>
                <p>{trackedOrder?.shippingAddress?.postalCode}</p>
            </div>

            <div className="phone flex gap-xs">
                <p className='text-[#000000a6]'>Phone:</p>
                <p>{trackedOrder?.shippingAddress?.phone}</p>
            </div>

        </div>
        <div className="billingAddress flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Billing Address</h5>
            </div>

            <div className="f-name flex gap-xs">
                <p className='text-[#000000a6]'>Full Name:</p>
                <p>{trackedOrder?.billingAddress?.fullName}</p>
            </div>
            
            <div className="Country flex gap-xs">
                <p className='text-[#000000a6]'>Country:</p>
                <p>{trackedOrder?.billingAddress?.country}</p>
            </div>

            <div className="state flex gap-xs">
                <p className='text-[#000000a6]'>State:</p>
                <p>{trackedOrder?.billingAddress?.state}</p>
            </div>

            <div className="city flex gap-xs">
                <p className='text-[#000000a6]'>City:</p>
                <p>{trackedOrder?.billingAddress?.city}</p>
            </div>

            <div className="address flex gap-xs">
                <p className='text-[#000000a6]'>Address:</p>
                <div>

                <p>{trackedOrder?.billingAddress?.addressOne}</p>
                <p>{trackedOrder?.billingAddress?.addressTwo}</p>
                </div>
            </div>

            <div className="email flex gap-xs">
                <p className='text-[#000000a6]'>Postal code:</p>
                <p>{trackedOrder?.billingAddress?.postalCode}</p>
            </div>

            <div className="phone flex gap-xs">
                <p className='text-[#000000a6]'>Phone:</p>
                <p>{trackedOrder?.billingAddress?.phone}</p>
            </div>

        </div>
        </div>

        <div className={`title grid gap-xs overflow-scroll no-scrollbar grid-cols-[40px,1fr,132px,132px,132px${trackedOrder?.status==="delivered" ? ",105px":""}]  py-p-sm`}>

<div className="name py-sm px-xs bg-[#00000005]"></div>
<div className="name py-sm px-xs bg-[#00000005]">Product</div>
<div className="name py-sm px-xs bg-[#00000005]">Price</div>
<div className="name py-sm px-xs bg-[#00000005]">Amount</div>
<div className="name py-sm px-xs bg-[#00000005]">Action</div>
{isDelivered && <div className="name py-sm px-xs bg-[#00000005]">Refund Status</div>}





      
        {trackedOrder && trackedOrder?.products?.map((product,i)=>{
            const isReviewed = product.isReviewed;
            const showReviewBtn = canReview && !isReviewed;
            const showEditReview = isReviewed && isDelivered;
            const isProductRefundPending = product.refundStatus === "pending";

          return  <React.Fragment key={product.productId}>

        <div className="price py-sm px-xs">{i+1}</div>
        <div className="btm mt-sm">
        <div className="name text-base w-full">{product.name?.slice(0, 75)}{product.name?.length > 75 && "..."} </div>
        <div className="sub-Cat text-primary-base text-sm">in Category</div>
   
        </div>
        
         <div className="price py-sm px-xs">$ <span>{product.priceAtPurchase}</span></div>
        <div className="amount  py-sm px-xs">{product.quantity}</div>
    
       <div className="details py-sm px-xs text-primary-base">
        <OrderItemActions product={product} order={trackedOrder} onReview={handleReview} onCancel={handleProductCancel}/>
{/* 
  {(!isDelivered && !isProductRefundPending) && (
    
    <button
      type="button"
      disabled={trackedOrder?.status !== "pending"}
      onClick={() => handleProductCancel(product.productId)}
      className={`text-white rounded-md py-xxs px-xs bg-warning-base ${
        trackedOrder?.status !== "pending" && "cursor-not-allowed"
      }`}
    >
      Cancel
    </button>
  )}

  {showReviewBtn && (
    <Button onClick={() => handleReview(product)} className="text-primary-base bg-[#00000005]">
      Review
    </Button>
  )}

  {showEditReview&& <div className=''>
    <p className='text-primary-base text-md'>Reviewed/</p>
    <Button children='Edit Review' onClick={() => handleReview(product)} className="text-primary-base bg-[#00000005]"></Button>
    </div>} */}

</div>    
        {(isDelivered && isRefundPending) ? <div className="refund py-sm px-xs text-primary-base">
        {isProductRefundPending && <Button children="Request Refund" onClick={() => handleItemRefund(product.productId)} className={`text-white rounded-md py-xxs px-xs bg-warning-base`}>
    </Button>}
      {!isProductRefundPending && <p>{product.refundStatus}</p>}
        </div>:isDelivered ?<div className="refund py-sm px-xs text-primary-base">
       {trackedOrder?.refundStatus}  </div>:""
        }

            </React.Fragment>
})}
       {selectedReview && (
  <ReviewComponent
    isReview={selectedReview?.isReviewed}
    comment={selectedReview?.review?.comment}
    rating={selectedReview?.review?.rating}
    productId={selectedReview?.productId}
    reviewId={selectedReview?.review?._id}
    selectedReview={setSelectedReview}
  />
)}
        </div>
        <div className="price ml-auto flex flex-col gap-sm w-[250px]">
          <div className="subtotal flex justify-between"><span>Total</span><span>{trackedOrder?.totalPrice}</span></div>
        </div>

        </div>
        </div>
       </section>
      )
}

export default TrackOrderPage;











// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import {Button,trackOrder,updateItemStatus,updateOderStatus} from "../index"
// import ReviewComponent from '../components/ReviewComponent'

// const TrackOrderPage = () => {
//     const {trackedOrder,error}=useSelector(state=>state.order)
//     const [formattedDate,setFormattedDate]=useState("loading...")
//     const [isReview,setIsReview]=useState('')
//     const [selectedReview, setSelectedReview] = useState(null);
//     const {orderId}=useParams();
//     const dispatch=useDispatch()

//     useEffect(()=>{
//         if(trackedOrder?._id===orderId) return;


//         dispatch(trackOrder({orderId}))
//     },[orderId,dispatch])

//     useEffect(() => {
//         if (trackedOrder?.createdAt) { // Check if createdAt exists
//             console.log(trackedOrder);
            
//           const createdAt = new Date(trackedOrder.createdAt);
//           if (!isNaN(createdAt)) { // Ensure the date is valid
//             const formattedDate = new Intl.DateTimeFormat('en-US', {
//               month: 'long',
//               day: 'numeric',
//               year: 'numeric',
//             }).format(createdAt);
//             setFormattedDate(formattedDate);
//           }
//         }
//       }, [trackedOrder]);

//         const handleCancelOrder=()=>{
//             // Implement cancel order functionality here
//             dispatch(updateOderStatus({orderId,status:"cancelled"}))
//         console.log("cancel called");
//         }
//         const handleProductCancel=(itemId)=>{
//             // Implement cancel order functionality here
//             dispatch(updateItemStatus({orderId,itemId,status:"cancelled"}))
//         console.log("cancel called");
//         }
//         const handleReview=(product)=>{
//             setSelectedReview(product)
//             // setIsReview(productId)
//             // Implement cancel order functionality here
//             console.log("review called for product id ",product);
//         }

//         const handleRefund=()=>{
//             // Implement cancel order functionality here
//             dispatch(updateOderStatus({orderId,refundStatus:"requested"}))
//         console.log("refund called");
//         }
//         const handleItemRefund=(itemId)=>{
//             // Implement cancel order functionality here
//             dispatch(updateItemStatus({orderId,itemId,status:"requested"}))
//         console.log("refund called for item id ",itemId);
//         }
//     return (
//         <section className='flex relative justify-center'>
//         <div className="container flex flex-col gap-xxl py-p-xxl px-p-xl sm:p-xxl">
//             <div className="content flex justify-between items-center">
//                 <h3>Order Detail</h3>
//                 {(trackedOrder?.status==="delivered" && trackedOrder?.refundStatus==="pending")?<Button children='Request Refund' onClick={handleRefund} className='bg-warning-base text-white py-xs rounded-md px-xxl'/>:trackedOrder?.refundStatus==="pending" ?"": "Refund Status: "+trackedOrder?.refundStatus}
//             {trackedOrder?.status!=="delivered"&& (trackedOrder?.status==="cancelled"?"Canceled":<Button disabled={trackedOrder?.status!=="pending"} onClick={handleCancelOrder} children="Cancel" className={`text-white rounded-md py-xs px-xxl bg-warning-base ${trackedOrder?.status!=="pending" && "cursor-not-allowed"}`}></Button>)}
//                 {/* <Link to="/user-account/order-history" className='text-primary-base'>Back to orders</Link> */}
//             </div>

//         <div className="item grid gap-lg">

//         <div className="payment flex md:gap-xxl flex-col md:flex-row gap-xs md:items-center">

//             <div className="paymentTitle">
//                 <h4>Payment</h4>
//             </div>

//                 <div className="orderStatus flex gap-xs ">
//                     <p>Fullfillment Status:</p>
//                     <p>{trackedOrder?.status}</p>
//                 </div>

//             <div className="paymentStatus flex gap-xs">
//                 <p>Payment status:</p>
//                 <p>{trackedOrder?.paymentStatus}</p>
//             </div>
//         </div>

//         <div className="paymentOptions grid md:grid-cols-2 gap-4">

//         <div className="paymentMethod flex flex-col w-full gap-xs">

//             <div className="title">
//                 <h5>Payment method</h5>
//             </div>

//             <div className="method flex gap-xs">
//                 <p className='text-[#000000a6]'>Payment By:</p>
//                 <p>{trackedOrder?.paymentMethod}</p>
//             </div>

//             {
//                 trackedOrder?.paymentMethod!=="cod"&&
//                 <div className="transcationId flex gap-xs">
//                 <p className='text-[#000000a6]'>Transcaion id:</p>
//                 <p>#67575755</p>
//             </div>
//             }
           
//             <div className="price flex gap-xs">
//                 <p className='text-[#000000a6]'>Amount:</p>
//                 <p>RS {trackedOrder?.totalPrice}</p>
//             </div>
//         </div>

//         <div className="shippingtMethod flex flex-col w-full gap-xs">

//             <div className="title">
//                 <h5>Shipping method</h5>
//             </div>

//             <div className="method flex gap-xs">
//                 <p className='text-[#000000a6]'>Order Placed:</p>
//                 <p>{formattedDate}</p>
//             </div>

//             <div className="transcationId flex gap-xs">
//                 <p className='text-[#000000a6]'>Transcaion id:</p>
//                 <p>#67575755</p>
//             </div>
//             <div className="price flex gap-xs">
//                 <p className='text-[#000000a6]'>Amount:</p>
//                 <p>RS 2300</p>
//             </div>
//         </div>

//         </div>
//         <div className="shippingOptions grid md:grid-cols-2 gap-4">

//         <div className="shippingAddress flex flex-col w-full gap-xs">

//             <div className="title">
//                 <h5>Shipping Address</h5>
//             </div>

//             <div className="f-name flex gap-xs">
//                 <p className='text-[#000000a6]'>Full Name:</p>
//                 <p>{trackedOrder?.shippingAddress?.fullName}</p>
//             </div>
            
//             <div className="Country flex gap-xs">
//                 <p className='text-[#000000a6]'>Country:</p>
//                 <p>{trackedOrder?.shippingAddress?.country}</p>
//             </div>

//             <div className="state flex gap-xs">
//                 <p className='text-[#000000a6]'>State:</p>
//                 <p>{trackedOrder?.shippingAddress?.state}</p>
//             </div>

//             <div className="city flex gap-xs">
//                 <p className='text-[#000000a6]'>City:</p>
//                 <p>{trackedOrder?.shippingAddress?.city}</p>
//             </div>

//             <div className="address flex gap-xs">
//                 <p className='text-[#000000a6]'>Address:</p>
//                 <div>

//                 <p>{trackedOrder?.shippingAddress?.addressOne}</p>
//                 <p>{trackedOrder?.shippingAddress?.addressTwo}</p>
//                 </div>
//             </div>

//             <div className="email flex gap-xs">
//                 <p className='text-[#000000a6]'>Postal code:</p>
//                 <p>{trackedOrder?.shippingAddress?.postalCode}</p>
//             </div>

//             <div className="phone flex gap-xs">
//                 <p className='text-[#000000a6]'>Phone:</p>
//                 <p>{trackedOrder?.shippingAddress?.phone}</p>
//             </div>

//         </div>
//         <div className="billingAddress flex flex-col w-full gap-xs">

//             <div className="title">
//                 <h5>Billing Address</h5>
//             </div>

//             <div className="f-name flex gap-xs">
//                 <p className='text-[#000000a6]'>Full Name:</p>
//                 <p>{trackedOrder?.billingAddress?.fullName}</p>
//             </div>
            
//             <div className="Country flex gap-xs">
//                 <p className='text-[#000000a6]'>Country:</p>
//                 <p>{trackedOrder?.billingAddress?.country}</p>
//             </div>

//             <div className="state flex gap-xs">
//                 <p className='text-[#000000a6]'>State:</p>
//                 <p>{trackedOrder?.billingAddress?.state}</p>
//             </div>

//             <div className="city flex gap-xs">
//                 <p className='text-[#000000a6]'>City:</p>
//                 <p>{trackedOrder?.billingAddress?.city}</p>
//             </div>

//             <div className="address flex gap-xs">
//                 <p className='text-[#000000a6]'>Address:</p>
//                 <div>

//                 <p>{trackedOrder?.billingAddress?.addressOne}</p>
//                 <p>{trackedOrder?.billingAddress?.addressTwo}</p>
//                 </div>
//             </div>

//             <div className="email flex gap-xs">
//                 <p className='text-[#000000a6]'>Postal code:</p>
//                 <p>{trackedOrder?.billingAddress?.postalCode}</p>
//             </div>

//             <div className="phone flex gap-xs">
//                 <p className='text-[#000000a6]'>Phone:</p>
//                 <p>{trackedOrder?.billingAddress?.phone}</p>
//             </div>

//         </div>
//         </div>

//         <div className={`title grid gap-xs overflow-scroll no-scrollbar grid-cols-[40px,1fr,132px,132px,132px${trackedOrder?.status==="delivered" ? ",105px":""}]  py-p-sm`}>

// <div className="name py-sm px-xs bg-[#00000005]"></div>
// <div className="name py-sm px-xs bg-[#00000005]">Product</div>
// <div className="name py-sm px-xs bg-[#00000005]">Price</div>
// <div className="name py-sm px-xs bg-[#00000005]">Amount</div>
// <div className="name py-sm px-xs bg-[#00000005]">Action</div>
// {trackedOrder?.status==="delivered" && <div className="name py-sm px-xs bg-[#00000005]">Refund Status</div>}


//         {/* </div> */}


//         {/* <div className="itemcontainer grid gap-lg"> */}
//         {trackedOrder && trackedOrder?.products?.map((product,i)=>(
//         // <div className="product border-b-2 items-center grid gap-xs overflow-scroll no-scrollbar grid-cols-[40px,1fr,132px,132px,132px,105px] py-p-xs">
//             <React.Fragment key={product.productId}>

//         <div className="price py-sm px-xs">{i+1}</div>
//         <div className="btm mt-sm">
//         <div className="name text-base w-full">{product.name?.slice(0, 75)}{product.name?.length > 75 && "..."} </div>
//         <div className="sub-Cat text-primary-base text-sm">in Category</div>
   
//         </div>
        
//          <div className="price py-sm px-xs">$ <span>{product.priceAtPurchase}</span></div>
//         <div className="amount  py-sm px-xs">{product.quantity}</div>
    
//        <div className="details py-sm px-xs text-primary-base">

//   {(trackedOrder?.status !== "delivered" &&
//     trackedOrder?.status !== "refunded") && (
    
//     <button
//       type="button"
//       disabled={trackedOrder?.status !== "pending"}
//       onClick={() => handleProductCancel(product.productId)}
//       className={`text-white rounded-md py-xxs px-xs bg-warning-base ${
//         trackedOrder?.status !== "pending" && "cursor-not-allowed"
//       }`}
//     >
//       Cancel
//     </button>
//   )}

//   {(trackedOrder?.status === "delivered" ||
//     trackedOrder?.status === "refunded")&& !product.isReviewed && (
    
//     <Button onClick={() => handleReview(product)} className="text-primary-base bg-[#00000005]">
//       Review
//     </Button>
//   )
// }
//   {(product.isReviewed && trackedOrder?.status === "delivered")&& <div className=''>
//     <p className='text-primary-base text-md'>Reviewed/</p>
//     <Button children='Edit Review' onClick={() => handleReview(product)} className="text-primary-base bg-[#00000005]"></Button>
//     </div>}

// </div>    
//         {(trackedOrder?.status==="delivered" && trackedOrder?.refundStatus==="pending") ? <div className="refund py-sm px-xs text-primary-base">
//         {product.refundStatus ==="pending" && <Button children="Request Refund" onClick={() => handleItemRefund(product.productId)} className={`text-white rounded-md py-xxs px-xs bg-warning-base`}>
//     </Button>}
//       {product.refundStatus !== "pending" && <p>{product.refundStatus}</p>}
//         </div>:trackedOrder?.status==="delivered" ?
//         <div className="refund py-sm px-xs text-primary-base">
//        {trackedOrder?.refundStatus}  </div>:""
//         }

//             </React.Fragment>
//         // </div>
//        ))}
//        {selectedReview && (
//   <ReviewComponent
//     isReview={selectedReview?.isReviewed}
//     comment={selectedReview?.review?.comment}
//     rating={selectedReview?.review?.rating}
//     productId={selectedReview?.productId}
//     reviewId={selectedReview?.review?._id}
//     selectedReview={setSelectedReview}
//   />
// )}
//         </div>
//         <div className="price ml-auto flex flex-col gap-sm w-[250px]">
//           <div className="subtotal flex justify-between"><span>Total</span><span>{trackedOrder?.totalPrice}</span></div>
//         </div>

//         </div>
//         </div>
//        </section>
//       )
// }

// export default TrackOrderPage;
