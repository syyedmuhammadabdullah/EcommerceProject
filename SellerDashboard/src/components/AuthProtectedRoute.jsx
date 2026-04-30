import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getSeller from "../store/Slices/SellerSlice/getSeller";

const AuthProtectedRoute = () => {
const { isAuthenticated, seller, loading } = useSelector(state => state.seller);
const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    dispatch(getSeller());
  }, []);
  
useEffect(() => {
}, [loading,seller])
  // 1️⃣ Not logged in
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

//   3️⃣ Sab OK
  return <Outlet />;
}
export default AuthProtectedRoute;