import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { OrderHistoryPage, ProductsPage, ProductForm,LoginPage, RegisterPage,MainLayout } from './index'
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<MainLayout />,
      errorElement:<h1>error</h1>,
      children:[
        {
          path:"/",
          element:<ProductsPage />
        },
        {
          path:"login",
          element:<LoginPage />
        },
        {
          path:"register",
          element:<RegisterPage />
        }
      ]
    }
  ])
  return (
   <RouterProvider router={router} />
  )
}

export default App
