import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getSeller from "../store/Slices/SellerSlice/getSeller";

const ProtectedRoute = () => {
  const { isAuthenticated, seller, loading } = useSelector(state => state.seller);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    dispatch(getSeller());
  }, []);

  // 1️⃣ Not logged in
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (seller.verification.status !== "verified") {
  return <Navigate to="/verify" replace />;
}
if(seller.accountStatus.status==="suspended"){
  return <div className="flex items-center justify-center h-screen"><h2 className="text-2xl font-bold text-red-500">Your account has been suspended. Please contact support for more information.</h2></div>
}
  // 2️⃣ Logged in but profile incomplete
  if (!seller?.storeDetails?.storeName || !seller?.storeDetails?.storeDescription || !seller?.storeDetails?.storeLogo || !seller?.storeDetails?.storeBanner) {
    return <Navigate to="/settings" replace />;
  }

  // 3️⃣ Sab OK
  return <Outlet />;
};


export default ProtectedRoute;
