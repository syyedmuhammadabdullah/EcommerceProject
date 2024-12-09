import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { OrderHistoryPage, ProductsPage, ProductForm } from './index'
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<ProductForm />,
      errorElement:<h1>error</h1>
    }
  ])
  return (
   <RouterProvider router={router} />
  )
}

export default App
