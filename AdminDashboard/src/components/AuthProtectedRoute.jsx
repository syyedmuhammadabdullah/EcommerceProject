import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthProtectedRoute = () => {
const { isAuthenticated, loading } = useSelector(state => state.admin);

  // 1️⃣ Not logged in
  if (!isAuthenticated) {
    console.log(isAuthenticated);
    
      // return <Navigate to="/login" replace />;

  }

//   3️⃣ Sab OK
  return <Outlet />;
}
export default AuthProtectedRoute;