import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AuthProtectedRoute = () => {
const { isAuthenticated, seller, loading } = useSelector(state => state.seller);
  
  // 1️⃣ Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

//   3️⃣ Sab OK
  return <Outlet />;
}
export default AuthProtectedRoute;