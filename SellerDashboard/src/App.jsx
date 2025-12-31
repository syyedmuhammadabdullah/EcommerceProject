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
  getSeller,
} from "./index";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeller());
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
