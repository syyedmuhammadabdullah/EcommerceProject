import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, seller, loading } = useSelector(state => state.seller);

  

  // 1️⃣ Not logged in
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Logged in but profile incomplete
  if (!seller?.storeDetails?.storeName || !seller?.storeDetails?.storeDescription || !seller?.storeDetails?.storeLogo || !seller?.storeDetails?.storeBanner) {
    return <Navigate to="/settings" replace />;
  }

  // 3️⃣ Sab OK
  return <Outlet />;
};


export default ProtectedRoute;
