import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import confirmStripePayment from "../store/slices/paymentSlice/stripePayment/confirmStripePayment";

// Load Stripe promise outside of the component

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { stripePayment } = useSelector((state) => state.payment);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await dispatch(
        confirmStripePayment({
          clientSecret: stripePayment?.client_secret,
          cardElement: elements?.getElement(CardElement),
          stripe,
        })
      ).unwrap();

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
      }
    } catch (err) {
      setMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
      <form id="custom-payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="custom-payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="custom-submit">
          <span id="custom-button-text">
            {isLoading ? <div className="custom-spinner" id="custom-spinner"></div> : "Pay now"}
          </span>
        </button>
        {message && <div id="custom-payment-message">{message}</div>}
      </form>
  );
}
