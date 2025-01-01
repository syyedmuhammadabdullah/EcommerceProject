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
          element: <h1>Home</h1>,
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
          path: "edit-product",
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
