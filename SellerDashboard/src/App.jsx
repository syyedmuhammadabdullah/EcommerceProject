import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import {
  OrderHistoryPage,
  TranscationPage,
  ProductsPage,
  ShipableOrderPage,
  ShipmentPage,
  LoginPage,
  RefundOrderPage,
  SuspendPage,
  RegisterPage,
  MainLayout,
  LinkBankPage,
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
  getSeller,
  UpdateRefundStatusPage
} from "./index";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import {  useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { initializeSocketListeners } from "./socket/socketListeners";
import FullPageLoader from "./pages/FullPageLoader";
function App() {
  const { isAuthenticated,seller,loading } = useSelector(state => state.seller);
  const {unreadCount} = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuthenticated)return;
    
    dispatch(getSeller());
  }, []);

 
  
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

 if (loading) {
   return <FullPageLoader />
  }
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
        { path: "verify", element: <VerificationPage /> },
             { path: "suspend", element: <SuspendPage /> },
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
          {path:"shipment/:orderId",element:<ShipmentPage/>},
          { path: "refund-requests", element: <RefundOrderPage /> },
          {path:"updaterefundstatus/:orderId",element:<UpdateRefundStatusPage/>},
          { path: "shipable-order", element: <ShipableOrderPage /> },
          { path: "order-invoice/:orderId", element: <OrderInvoicePage /> },
          { path: "product-questions", element: <ProductQuestionsPage /> },
          { path: "customers", element: <CustomersPage /> },
          { path: "wallet", element: <WalletPage /> },
          { path: "withdrawals", element: <WithdrawPage /> },
          { path: "coupons", element: <CouponPage /> },
          { path: "link-bank", element: <LinkBankPage /> },
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
