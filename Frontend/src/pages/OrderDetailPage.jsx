

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Button,trackOrder,updateItemStatus,updateOderStatus,cancelProducts, CheckBox, requestRefund} from "../index"
import ReviewComponent from '../components/ReviewComponent'
import OrderItemActions from '../components/OrderItemActions'

const OrderDetailPage = () => {
    const {trackedOrder,error}=useSelector(state=>state.order)
    const [formattedDate,setFormattedDate]=useState("loading...")
    const [isReview,setIsReview]=useState('')
    const [items,setItems]=useState([]);
    const [refundItems,setRefundItems]=useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const {orderId}=useParams();
    const dispatch=useDispatch()

    const isDelivered = trackedOrder?.shipmentStatus === "delivered";
const isPending = trackedOrder?.status === "pending";
const isCancelled = trackedOrder?.status === "cancelled";
const isRefundPending =
  Date.now() < new Date(trackedOrder?.deliveredAt).getTime() + (7 * 24 * 60 * 60 * 1000);

const gridCols = isDelivered
  ? "grid-cols-[40px_1fr_132px_132px_132px_132px]"
  : "grid-cols-[40px_1fr_132px_132px_132px]";
const canCancelOrder = isPending;
const canReview = isDelivered || trackedOrder?.refundStatus === "refunded";



    useEffect(()=>{
        if(trackedOrder?._id===orderId) return;

        dispatch(trackOrder({orderId}))
    },[orderId,dispatch])

    useEffect(() => {
        if (trackedOrder?.createdAt) { // Check if createdAt exists
        
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
            if(items.length===0)return;
            dispatch(cancelProducts({orderId,items}));
            setItems([]);
        console.log("cancel called");
        }
        

      const handleProductCancel = (itemId) => {
  if (items?.includes(itemId)) {
    setItems((prev) => prev.filter((id) => id !== itemId));
  } else {
    setItems((prev) => [...prev, itemId]);
  }
};
        const handleReview=(product)=>{
            setSelectedReview(product)
            // setIsReview(productId)
            // Implement cancel order functionality here
            console.log("review called for product id ",product);
        }


        const handleRefund=()=>{
            // Implement cancel order functionality here
            if(items.length===0)return;
            dispatch(requestRefund({orderId,items:refundItems}));
        console.log("refund called");
        }
        const handleItemRefund=(itemId)=>{
            // Implement cancel order functionality here
            if (refundItems.includes(itemId)) {
                setRefundItems((prev) => prev.filter((id) => id !== itemId));
            }else{
                setRefundItems((prev) => [...prev, itemId]);
            }

        console.log("refund called for item id ",itemId);
        }
    return (
        <section className='flex relative justify-center'>
        <div className="container flex flex-col gap-xxl py-p-xxl px-p-xl sm:p-xxl">
            <div className="content flex justify-between items-center">
                <h3>Order Detail</h3>
                {(isDelivered && isRefundPending)?<Button children={`Request Refund ${refundItems?.length}`} onClick={handleRefund} className='bg-warning-base text-white py-xs rounded-md px-xxl'/>:isRefundPending ?"": "Refund Status: "+trackedOrder?.refundStatus}
            {canCancelOrder&& (isCancelled?"Canceled":<Button disabled={!isPending} onClick={handleCancelOrder} children={`Cancel ${items?.length}`} className={`text-white rounded-md py-xs px-xxl bg-warning-base ${!isPending && "cursor-not-allowed"}`}></Button>)}
                {/* <Link to="/user-account/order-history" className='text-primary-base'>Back to orders</Link> */}
            </div>

        <div className="item grid gap-lg">

        <div className="payment flex md:gap-xxl flex-col md:flex-row gap-xs md:items-center">

            <div className="paymentTitle">
                <h4>Payment</h4>
            </div>

                <div className="orderStatus flex gap-xs ">
                    <p>Order Status:</p>
                    <p>{trackedOrder?.status}</p>
                </div>
                <div className="orderStatus flex gap-xs ">
                    <p>Shipment Status:</p>
                    <p>{trackedOrder?.shipmentStatus}</p>
                </div>
                <div className="orderStatus flex gap-xs ">
                    <p>Refund Status:</p>
                    <p>{trackedOrder?.refundStatus}</p>
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

        <div className={`title grid gap-xs overflow-scroll no-scrollbar ${gridCols}  py-p-sm`}>

<div className="name py-sm px-xs bg-[#00000005]">No</div>
<div className="name py-sm px-xs bg-[#00000005]">Product</div>
<div className="name py-sm px-xs bg-[#00000005]">Price</div>
<div className="name py-sm px-xs bg-[#00000005]">Amount</div>
<div className="name py-sm px-xs bg-[#00000005]">Action</div>
{isDelivered && <div className="name py-sm px-xs bg-[#00000005]">Refund Status</div>}

        {trackedOrder && trackedOrder?.products?.map((product,i)=>{
            const isReviewed = product.isReviewed;
            const showReviewBtn = canReview && !isReviewed;
            const showEditReview = isReviewed && isDelivered;
            const isProductRefundPending = product.refundStatus === "none";

          return  <React.Fragment key={product.productId}>

        <div className="price py-sm px-xs">{i+1}</div>
        <div className="btm mt-sm">
        <div className="name text-base w-full">{product.name?.slice(0, 75)}{product.name?.length > 75 && "..."} </div>
        <div className="sub-Cat text-primary-base text-sm">in Category</div>
   
        </div>
        
         <div className="price py-sm px-xs">$ <span>{product.priceAtPurchase}</span></div>
        <div className="amount  py-sm px-xs">{product.quantity}</div>
    
       <div className="details py-sm px-xs text-primary-base">
        <OrderItemActions items={items} product={product} order={trackedOrder} onReview={handleReview} onCancel={handleProductCancel}/>

</div>    
        {(isDelivered && isRefundPending) ? <div className="refund py-sm px-xs text-primary-base">
       
       {product.status==="cancelled"||product.status!=="rejected"&&<CheckBox id={product.productId} isChecked={refundItems?.includes(product.productId)}  onChange={() => handleItemRefund(product.productId)} /> }
      {!isProductRefundPending && <p>{product.refundStatus}</p>}
        </div>:isDelivered&&<div className="refund py-sm px-xs text-primary-base">{product.refundStatus}</div>
        
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
export default OrderDetailPage;