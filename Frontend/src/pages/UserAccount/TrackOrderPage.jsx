// import React, { useState } from 'react'
// import {Button, Input,trackOrder,TrackOrder} from "../../index"
// import { DeliveredProcedureOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// const TrackOrderPage = () => {
//     const [width, setWidth] = useState(0)

//     const handleWidth=()=>{
//         setWidth((prev)=> prev+25 )
//     }

//     const dispatch=useDispatch()
//     const { loading,error,trackedOrder }=useSelector(state=>state.order)
//     const [orderId, setOrderId] = useState("")
//     const [isTracked, setIsTracked] = useState(false)

//     const handleTrackOrder=()=>{
//         setIsTracked(false)
//         dispatch(trackOrder({orderId}))         
//             setIsTracked(true)
  
//     }

//     useEffect(() => {
//       }, [trackedOrder,error]);

//     return (
//     <>
//     { isTracked && !error ? <TrackOrder/>:<section className='flex justify-center '>
//         <div className="container w-full lg:gap-xxl  bg-white grid gap-xl px-p-md lg:p-p-xxl">
//             <div className="title">
//                 <h3>Track Order</h3>
//             </div>
//             <div className="content flex flex-col gap-md ">
//                 <div className="title">
//                     <p>To track your order please enter your order ID in the input field below and press the “Track Order” button. this was given to you on your receipt and in the confirmation email you should have received.</p>
//                 </div>
//                 <div className="getdetails flex flex-col gap-md">
//                     <div className="input">

//                     <label htmlFor="OrderId">Order ID</label>
//                     <Input type="text" placeholder="Order id" id="OrderId" value={orderId} onChange={(e)=>setOrderId(e.target.value)}/>
//                     {error && <p className='text-red-600'>{error}</p>}
//                     </div>
//                     <p><ExclamationCircleOutlined/> Order ID that we sended to your in your email address.</p>
//                     <Button onClick={handleTrackOrder} children='Track order' className='py-p-xs bg-primary-base rounded-md w-full text-white'/>
//                 </div>
//             </div>
//         </div>
//     </section> } 
    


    
//     </>
//   )
// }

// export default TrackOrderPage

import React, { useState, useEffect } from "react";
import { Button, Input, TrackOrder,trackOrder } from "../../index";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState(""); // Input field state
  const [isTracked, setIsTracked] = useState(false); // Tracks whether the user clicked "Track Order"

  const dispatch = useDispatch();
  const { loading, error, trackedOrder } = useSelector((state) => state.order); // Redux state

  const handleTrackOrder = () => {
    if (!orderId.trim()) return; // Prevent empty input
    dispatch(trackOrder({ orderId }));
    setIsTracked(true); // Indicate that tracking is in progress
  };

  useEffect(() => {
    if (trackedOrder) {
      console.log(trackedOrder); // Debugging
    }
  }, [trackedOrder]);

  return (
    <section className="flex justify-center">
      <div className="container w-full lg:gap-xxl bg-white grid gap-xl px-p-md lg:p-p-xxl">
    {!trackedOrder &&
        <React.Fragment>
       <div className="title">
          <h3>Track Order</h3>
        </div>
        <div className="content flex flex-col gap-md">
          <div className="title">
            <p>
              To track your order, please enter your order ID in the input field below and press the “Track Order” button. This was given to you on your receipt and in the confirmation email.
            </p>
          </div>
          <div className="getdetails flex flex-col gap-md">
            <div className="input">
              <label htmlFor="OrderId">Order ID</label>
              <Input
                type="text"
                placeholder="Order ID"
                id="OrderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              {error && (
                <p className="text-red-500 mt-xs">
                  <ExclamationCircleOutlined /> Unable to track the order. Please check your order ID and try again.
                </p>
              )}
            </div>
            <p>
              <ExclamationCircleOutlined /> Order ID was sent to your email address.
            </p>
            <Button
              onClick={handleTrackOrder}
              className="py-p-xs bg-primary-base rounded-md w-full text-white"
              disabled={loading} // Disable button during loading
            >
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </div>
        </div>
        </React.Fragment>
            }

        {isTracked && trackedOrder && !loading && !error && (
          <TrackOrder order={trackedOrder} />
        )}
      </div>
    </section>
  );
};

export default TrackOrderPage;
