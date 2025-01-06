import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeliveredProcedureOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { Button, StarRating, trackOrder,addProductReview } from '../index'

const OrderDetailPage = () => {
    const dispatch=useDispatch()
    const {trackedOrder,error}=useSelector(state=>state.order)
    const {orderId}=useParams();
    const [starRating, setStarRating] = useState(0);
    const [review,setReview]=useState('')
    const createdDate=trackedOrder && new Date(trackedOrder[0]?.createdAt)

    useEffect(() => {

        dispatch(trackOrder({trackingNumber:orderId}))
        console.log("the tracked order is ",trackedOrder);

    
    }, [orderId]);
    const handleClick=(index)=>{
        console.log(index);
        setStarRating(index)
    }
    const handleReviewSubmit=()=>{
        const productId=trackedOrder[0].products[0].productId;
        const reviewData={
            productId,
            comment:review,
            rating:starRating
        }
        console.log(reviewData);
    dispatch(addProductReview(reviewData))
    }
  return (
    
   
    <section className='flex justify-center'>
        <div className="container w-full lg:gap-xxl  bg-white grid gap-xl px-p-md lg:p-p-xxl">
        <div className="title">
                <h3>Order Details</h3>
            </div>

            <div className="content flex flex-col gap-md">

            <div className="details grid gap-xs grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  py-p-sm">

<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Order place date:</h5>
    <p>17 Nov 2024</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Order status:</h5>
    <p>Delivered</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Delivery partner:</h5>
    <p>Fedex</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Payment:</h5>
    <p>Paypal</p>
</div>
<div className="name py-sm px-xs flex flex-col gap-base">
    <h5>Amount:</h5>
    <p>$100</p>
</div>

            </div>

            <div className="reviewOrderStatus grid grid-cols-1 md:grid-cols-2 gap-lg">

                <div className="left flex flex-col gap-lg">
                    <h3>Order Status</h3>
                    <div className="status flex flex-col gap-lg">
                        <div className="item flex items-center gap-sm">
                            <div className="icon"><DeliveredProcedureOutlined className='text-primary-base'/></div>
                            <div className="text">
                                <h4>Order Placed</h4>
                                <p>17 Nov 2024</p>
                            </div>
                        </div>
                        <div className="item flex items-center gap-sm">
                            <div className="icon"><DeliveredProcedureOutlined className='text-primary-base'/></div>
                            <div className="text">
                                <h4>Order Placed</h4>
                                <p>17 Nov 2024</p>
                            </div>
                        </div>
                        <div className="item flex items-center gap-sm">
                            <div className="icon"><DeliveredProcedureOutlined className='text-primary-base'/></div>
                            <div className="text">
                                <h4>Order Placed</h4>
                                <p>17 Nov 2024</p>
                            </div>
                        </div>
                        <div className="item flex items-center gap-sm">
                            <div className="icon"><DeliveredProcedureOutlined className='text-primary-base'/></div>
                            <div className="text">
                                <h4>Order Placed</h4>
                                <p>17 Nov 2024</p>
                            </div>
                        </div>
                        <div className="item flex items-center gap-sm">
                            <div className="icon"><DeliveredProcedureOutlined className='text-primary-base'/></div>
                            <div className="text">
                                <h4>Order Placed</h4>
                                <p>17 Nov 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reviewBox bg-yellow-100">
                    <h3>Review</h3>
                    <StarRating size="text-xl cursor-pointer" rating={starRating} onClick={handleClick}/>
                    <textarea name="reveiw" cols="30" rows="4"  id="" placeholder='Write a review' value={review} onChange={(e)=>setReview(e.target.value)} maxLength={560} minLength={10} className='border-2 w-full h-[270px] resize-none border-b-border-primary outline-none rounded-md'></textarea>

                    <Button text='Submit Review' className='bg-primary-base text-white rounded-md px-xl py-2' onClick={handleReviewSubmit}/>
                </div>

            </div>
                </div>
    
        </div>
    
    </section>
  )
 
   
}

export default OrderDetailPage