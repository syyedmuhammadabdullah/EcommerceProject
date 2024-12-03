import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {store,} from "./index.js"
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe("pk_test_51PWcOWEI9mH68xHVRxfH2fqo2r5llTVpv8dvxwy8IrmCKJi9eUfQzl8rQi7bHG1QzIqHUx921Bvmspj7TDsH78RW00dQEYUyL3");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
  <Provider store={store}>
<App/>
  <ToastContainer />
  </Provider> 
  </Elements>

);