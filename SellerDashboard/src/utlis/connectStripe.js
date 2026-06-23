import { loadConnectAndInitialize } from "@stripe/connect-js";

const stripeConnect = loadConnectAndInitialize({
  publishableKey: "pk_test_51PWcOWEI9mH68xHVRxfH2fqo2r5llTVpv8dvxwy8IrmCKJi9eUfQzl8rQi7bHG1QzIqHUx921Bvmspj7TDsH78RW00dQEYUyL3",
  fetchClientSecret: async () => {
    const res = await fetch("/api/account-session", {
      method: "POST",
    });
    const data = await res.json();
    return data.client_secret;
  },
});