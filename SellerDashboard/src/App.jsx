import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import {
  OrderHistoryPage,
  ProductsPage,
  LoginPage,
  RegisterPage,
  MainLayout,
  ProductQuestionsPage,
  CustomersPage,
  OrderDetailPage,
  OrderInvoicePage,
  DashboardPage,
  WalletPage,
  WithdrawPage,
  CouponPage,
  ProfilePage,
  CreateCouponPage,
  CreateProductPage,
getSellerOrders,
useDebouncedAPI,
getNotificationCount,
addNotification,
  socket,
} from "./index";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import {  useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
function App() {
  const { isAuthenticated,seller,loading } = useSelector(state => state.seller);
  const {unreadCount} = useSelector(state => state.notifications);
  const dispatch = useDispatch();
  useEffect(() => {
  if (!isAuthenticated) return;
  socket.connect();
  socket.on("connect", () => {
  socket.emit("joinRoom",seller._id );    
  });
  return () => {
    socket.disconnect();
  };
}, [isAuthenticated,seller]);

useEffect(() => {
  if (!isAuthenticated || !seller?._id) return;
  if (!unreadCount) {
    dispatch(getNotificationCount(seller._id));
    console.log(unreadCount);
    
  }
}, [dispatch, isAuthenticated, seller?._id]);


useEffect(() => {
  socket.on("notification", (data) => {
    if (data.title==="Order created") {
      useDebouncedAPI(()=>dispatch(getSellerOrders()),2000);
    }
    console.log("LIVE MESSAGE:", data);
    toast.success(data.message);
      dispatch(addNotification(data));
  });

  return () => socket.off("notification");
}, [dispatch]);
// useEffect(() => {
//   if (!isAuthenticated || !seller?._id) return;

//   socket.connect();

//   const handleConnect = () => {
//     console.log("Connected");

//     socket.emit("joinRoom", seller._id);
//     console.log("user joined room", seller._id);
//   };

//   socket.on("connect", handleConnect);

//   return () => {
//     socket.off("connect", handleConnect);
//     socket.disconnect();
//   };
// }, [isAuthenticated, seller?._id]);
const router = createBrowserRouter([
  // 🔓 Public
  {
    element: <MainLayout />,
    children: [
      
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
 // 🔐 Login required (settings allowed)
  {
    element: <AuthProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
        { path: "settings", element: <ProfilePage />,}
        ],
      },
    ],
  },
  // 🔒 Login + store completed required
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "order-history", element: <OrderHistoryPage /> },
          { path: "order-details/:orderId", element: <OrderDetailPage /> },
          { path: "order-invoice/:orderId", element: <OrderInvoicePage /> },
          { path: "product-questions", element: <ProductQuestionsPage /> },
          { path: "customers", element: <CustomersPage /> },
          { path: "wallet", element: <WalletPage /> },
          { path: "withdrawals", element: <WithdrawPage /> },
          { path: "coupons", element: <CouponPage /> },
          { path: "new-coupon", element: <CreateCouponPage /> },
          { path: "edit-coupon/:id", element: <CreateCouponPage /> },
          { path: "new-product", element: <CreateProductPage /> },
          { path: "edit-product/:id", element: <CreateProductPage /> },
        ],
      },
    ],
  },
  ,

 
  
]);


  
  return <RouterProvider router={router} />;
}

export default App;
