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
  SellerPage
} from "./index";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdmin());
  }, []);
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
          {path:"/products/seller",element:<ProductsPage/>},
        ],
      },
    ],
  },
  ,

 
  
]);


  
  return <RouterProvider router={router} />;
}

export default App;
