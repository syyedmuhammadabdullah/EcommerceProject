import React, { useEffect, useState } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import axios from "axios";

const LinkBankPage = () => {
  const [clientSecret, setClientSecret] = useState(null);

  // STEP 1: get session from backend
  const fetchSession = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/payment/stripe/create-connect-session",
        {},
        { withCredentials: true }
      );
      console.log("data received ",res);
      
      setClientSecret(res.data.data);
    } catch (err) {
      console.log("Session Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  // STEP 2: init stripe after clientSecret is ready
  useEffect(() => {
    
    if (!clientSecret) return;
    

    const initStripe = async () => {
      const stripeConnect = await loadConnectAndInitialize({
        publishableKey: "pk_test_51PWcOWEI9mH68xHVRxfH2fqo2r5llTVpv8dvxwy8IrmCKJi9eUfQzl8rQi7bHG1QzIqHUx921Bvmspj7TDsH78RW00dQEYUyL3",
       fetchClientSecret: async () => {
    return clientSecret;
  },
      });
      

      const onboarding = stripeConnect.create("account-onboarding");
      if (!document.getElementById("stripe-onboarding").innerHTML) {
        
          document
      .getElementById("stripe-onboarding")
      .appendChild(onboarding);
      }
    };

    initStripe();
  }, [clientSecret]);

  return <div id="stripe-onboarding"></div>;
};

export default LinkBankPage;