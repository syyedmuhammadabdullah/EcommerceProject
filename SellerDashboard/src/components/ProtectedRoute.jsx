import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SuspendPage from "../pages/SuspendPage";

const ProtectedRoute = () => {
  const { isAuthenticated, seller, loading } = useSelector(state => state.seller);



  // 1️⃣ Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if(seller?.accountStatus?.status==="suspended" || seller?.accountStatus?.status==="reviewing"){
    return <Navigate to="/suspend" replace />;
  }
  if (seller?.verification?.status !== "verified" ) {
    console.log(seller);
    
  return <Navigate to="/verify" replace />;
}

  // 3️⃣ Sab OK
  return <Outlet />;
};


export default ProtectedRoute;
