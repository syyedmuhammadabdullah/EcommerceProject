import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeliveredProcedureOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { Button, StarRating, trackOrder,addProductReview } from '../../index'

const OrderDetailPage = () => {
    const dispatch=useDispatch()
    const {trackedOrder,error}=useSelector(state=>state.order)
    const {trackingNumber}=useParams();
    const [starRating, setStarRating] = useState(0);
    const [review,setReview]=useState('')
    const createdDate=trackedOrder && new Date(trackedOrder[0]?.createdAt)
    const statusMap = {
  pending: "Your order is pending",
  rejected: "Your order has been rejected",
  refunded: "Your order has been refunded",
  cancelled: "Your order has been cancelled",
  confirmed: "Your order has been confirmed",
  processing: "Seller is preparing your order",
  shipped: "Courier has picked your order",
  "out for delivery": "Rider is on the way",
  delivered: "Order delivered successfully"
};
    useEffect(() => {
        if (trackedOrder?.trackingNumber === trackingNumber) return;
        console.log("order dispatched",trackedOrder?.trackingNumber,trackingNumber);
   
dispatch(trackOrder({trackingNumber: trackingNumber }))
    }, [trackingNumber,trackedOrder]);
    const handleClick=(index)=>{
        setStarRating(index)
    }
    const handleReviewSubmit=()=>{
        const productId=trackedOrder[0].products[0].productId;
        const reviewData={
            productId,
            comment:review,
            rating:starRating
        }
    dispatch(addProductReview(reviewData))
    }
  return (
    
   
    <section className='flex justify-center'>
        <div className="container w-full lg:gap-xxl  bg-white grid gap-xl px-p-md lg:p-p-xxl">
        <div className="title">
                <h3>Track Order</h3>
            </div>

            <div className="content flex flex-col gap-md">

            <div className="details grid gap-xs grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  py-p-sm">

<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Order place date:</h5>
    <p>{trackedOrder?.orderDate}</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Order status:</h5>
    <p>{trackedOrder?.status}</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Delivery partner:</h5>
    <p>Fedex</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Payment:</h5>
    <p>{trackedOrder?.paymentMethod}</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Amount:</h5>
    <p>${trackedOrder?.totalPrice?.toFixed(2)}</p>
</div>

            </div>

            <div className="reviewOrderStatus grid grid-cols-1 md:grid-cols-2 gap-lg">

                <div className="left flex flex-col gap-lg">
                    <h3>Order Status</h3>
                    <div className="status flex flex-col gap-lg">
                  {trackedOrder?.statusHistory?.map((status)=>(
                          <div className="item flex items-center gap-sm">
                            <div className="icon"><DeliveredProcedureOutlined className='text-primary-base'/></div>
                            <div className="text">
                                <h5>{status.status}</h5>
                                <p>{status.timestamp}</p>
                                <p className='text-primary-base text-md'>{statusMap[status.status]}</p>
                            </div>
                        </div>
                  ))}
                       
                    </div>
                </div>
                  

            </div>
                </div>
    
        </div>
    
    </section>
  )
 
   
}

export default OrderDetailPage

