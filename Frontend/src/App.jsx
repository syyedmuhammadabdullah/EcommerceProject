import { useEffect } from 'react'
import {useDispatch, useSelector } from "react-redux";
import authCheck from './store/slices/userSlice/authCheck'
import { RouterProvider } from 'react-router-dom';
import OTP from "./components/OTP";
import {
  HomePage,
  LoginPage,
  ProductDetailPage,
  ProductPage,
  RegisterPage,
  ShopingCartPage,
  WishlistPage,
  CheckOutPage,
  OrderHistoryPage,
  SettingLayout,
  BasicSettingPage,
  AddressSettingPage,
  SecuritySettingPage,
  ProductFilterPage,
  DashboardPage,
  TrackOrderPage,
  MainLayout,
  AddressBookAndCardsPage,
  UpdateAddressPage,
  getAllAddress,
  CreateAddressPage,
  getUserCart,
  getWishlist,
  OrderDetailPage,
  getOrders,
  MyReviewPage,
  deliveredOrder,
  getUserProductReview
} from "./index";
import { createBrowserRouter } from "react-router-dom";
function App() {
const dispatch=useDispatch()
const {user}=useSelector(state=>state.auth)
useEffect(()=>{
  dispatch(authCheck())
  dispatch(getAllAddress())
  dispatch(getUserCart({userId:user?._id}))
  dispatch(getWishlist())
  dispatch(getOrders())
  dispatch(deliveredOrder())
  dispatch(getUserProductReview())
},[])


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "product-filter",
        element: <ProductFilterPage />,
      },
      {
        path: "shoping-cart",
        element: <ShopingCartPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "product/:productId",
        element: <ProductDetailPage />,
      },
      {
        path:"order-history",
        element:<OrderHistoryPage/>
      },
      {
        path: "checkout",
        element: <CheckOutPage />,
      },
      

    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/test",
    element: <OTP/>
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user-account/",
    element: <SettingLayout />,
    
    children:[
      {
        index: true,  // Default route
        element: <DashboardPage />  // The page to show by default
      },
      {
        path:"dashboard",
        element:<DashboardPage/>
      },
      {
        path:"basic-settings",
        element:<BasicSettingPage/>
        
      },
      {
        path:"advance-settings",
        element:<AddressSettingPage/>
      },
      {
        path:"security-settings",
        element:<SecuritySettingPage/>  
      },
      {
        path: "shoping-cart",
        element: <ShopingCartPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path:"address-cards-setting",
        element:<AddressBookAndCardsPage/>
      },
      {
        path:"order-history",
        element:<OrderHistoryPage/>
      },
      {
        path:"track-order",
        element:<TrackOrderPage/>
      },
      {
        path:"my-reviews",
        element:<MyReviewPage/>
      },
      {
        path:"checkout",
        element:<CheckOutPage/>
      },
      {
        path:"editAddress/:id",
        element:<UpdateAddressPage/>
      },
      {
        path:"createAddress",
        element:<CreateAddressPage/>
      },
      {
        path: "order-detail/:orderId",
        element: <OrderDetailPage />,
      },
    ]
    
  }
]);

  return (
  <>
    <RouterProvider router={router} />
 
  </>
  )
}

export default App
