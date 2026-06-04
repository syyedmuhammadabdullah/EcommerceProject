import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import {
  OrderHistoryPage,
  ProductsPage,
  LoginPage,
  RegisterPage,
  MainLayout,
  SellerWithdrawRequests,
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
  getAdmin,
  CategoryPage,
  SellerPage,
  SellerDetailPage,
  getNotificationCount,
} from "./index";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import { useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import { initializeSocketListeners } from "./socket/socketListeners";
import {socket} from "./socket/socket";
import FullPageLoader from "./pages/FullPageLoader";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, admin,loading } = useSelector((state) => state.admin);
  const {unreadCount} = useSelector(state => state.notifications);

  useEffect(() => {
    if (isAuthenticated) return;
    dispatch(getAdmin());
  }, []);



  useEffect(() => {
  if (!isAuthenticated) return;
  console.log("user authenticated",isAuthenticated);
  
  socket.connect();
  socket.on("connect", () => {
  socket.emit("joinRoom",admin._id );    
  });
  return () => {
    socket.disconnect();
  };
}, [isAuthenticated,admin]);

useEffect(() => {
  if (!isAuthenticated || !admin?._id) return;
  if (!unreadCount) {
    dispatch(getNotificationCount(admin._id));
  }
}, [dispatch, isAuthenticated, admin?._id]);
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
  return <FullPageLoader />;
}


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
          { index: true, element: <DashboardPage /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "order-history", element: <OrderHistoryPage /> },
          { path: "order-details/:orderId", element: <OrderDetailPage /> },
          { path: "order-invoice/:orderId", element: <OrderInvoicePage /> },
          { path: "seller-withdraw-requests", element: <SellerWithdrawRequests /> },
          { path: "customers", element: <CustomersPage /> },
          { path:"/sellers", element:<SellerPage/> },
          { path: "wallet", element: <WalletPage /> },
          { path: "withdrawals", element: <WithdrawPage /> },
          { path: "coupons", element: <CouponPage /> },
          { path: "new-coupon", element: <CreateCouponPage /> },
          { path: "edit-coupon/:id", element: <CreateCouponPage /> },
          { path: "new-product", element: <CreateProductPage /> },
          { path: "edit-product/:id", element: <CreateProductPage /> },
          {path:"/orders/customer",element:<OrderHistoryPage/>},
          {path:"/orders/seller",element:<OrderHistoryPage/>},
          {path:"/sellers/:id",element:<SellerDetailPage/>},
          {path:"/products/seller",element:<ProductsPage/>},
          {path:"/categories/main",element:<CategoryPage/>},
          {path:"/categories/submain",element:<CategoryPage/>},
        ],
      },
    ],
  },
  ,

 
  
]);


  
  return <RouterProvider router={router} />;
}

export default App;
