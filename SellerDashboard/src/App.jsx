import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import {
  OrderHistoryPage,
  TranscationPage,
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
  VerificationPage,
} from "./index";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import {  useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { initializeSocketListeners } from "./socket/socketListeners";
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
  }
}, [dispatch, isAuthenticated, seller?._id]);
useEffect(()=>{

   initializeSocketListeners({
      socket,
      dispatch
   });

   return ()=>{

      socket.off();

   }

},[])
const router = createBrowserRouter([
  // 🔓 Public
  {
    element: <MainLayout />,
    children: [
      
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "verify", element: <VerificationPage /> }
    ],
  },
 // 🔐 Login required (settings allowed)
  {
    element: <AuthProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
        { path: "settings", element: <ProfilePage />},
        { path: "verify", element: <VerificationPage /> }
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
          { path: "transactions/:type", element: <TranscationPage /> },
        ],
      },
    ],
  },
  ,

 
  
]);


  
  return <RouterProvider router={router} />;
}

export default App;
