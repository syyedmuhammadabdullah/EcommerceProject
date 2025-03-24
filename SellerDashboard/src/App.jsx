import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  OrderHistoryPage,
  ProductsPage,
  ProductForm,
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
} from "./index";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <h1>error</h1>,
      children: [
        {
          path: "/",
          element:<DashboardPage/>,
        },
        {
          path: "dashboard",
          element:<DashboardPage/>,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "create-product",
          element: <ProductForm />,
        },
        {
          path: "edit-product/:id",
          element: <ProductForm />,
        },
        {
          path: "order-history",
          element: <OrderHistoryPage />,
        },
        {
          path:"order-details/:orderId",
          element:<OrderDetailPage/>
        },
        {
          path:"order-invoice/:orderId",
          element:<OrderInvoicePage/>
        },
        {
          path: "product-questions",
          element: <ProductQuestionsPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "customers",
          element: <CustomersPage />,
        },
        {
          path: "wallet",
          element: <WalletPage />,
        },
        {
          path: "withdrawals",
          element: <WithdrawPage />,
        },
        {
          path: "coupons",
          element: <CouponPage />,
        },
        {
          path: "settings",
          element: <ProfilePage />,
        },
        {
          path: "new-coupon",
          element: <CreateCouponPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
