

import React, { useState, useEffect } from "react";
import { Button, Input,  } from "../index";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState(""); // Input field state
  const [isTracked, setIsTracked] = useState(false); // Tracks whether the user clicked "Track Order"
  const navigate = useNavigate(); // For navigation


  const dispatch = useDispatch();
  const { loading, error, trackedOrder } = useSelector((state) => state.order); // Redux state


  const handleTrackOrder = () => {
    if (!orderId.trim()) return; // Prevent empty input
    navigate(`/user-account/track-order/${orderId}`); // Navigate to the order tracking page
    setIsTracked(true); // Indicate that tracking is in progress
  };

  useEffect(() => {
    if (trackedOrder) {
      console.log(trackedOrder); // Debugging
    }
  }, [trackedOrder]);

  return (
    <section className="flex justify-center">
      <div className="container min-h-screen w-full lg:gap-xxl bg-white grid gap-xl px-p-md lg:p-p-xxl">
  
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
        

   
      </div>
    </section>
  );
};

export default TrackOrder;
