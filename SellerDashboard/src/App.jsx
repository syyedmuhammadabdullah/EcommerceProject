import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { OrderHistoryPage } from './index'
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<OrderHistoryPage />,
      errorElement:<h1>error</h1>
    }
  ])
  return (
   <RouterProvider router={router} />
  )
}

export default App
