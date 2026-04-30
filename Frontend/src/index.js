// Components

import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Input from "./components/Input";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";
import SelectMenu from "./components/SelectMenu";
import VerticleNavbar from "./components/VerticleNavbar";
import ProductContainer from "./components/ProductContainer";
import StarRating from "./components/StarRating";
import AddressForm from "./components/AddressFrom";
import BillingFormCard from "./components/BillingFormCard";
import TrackOrder from "./components/TrackOrder";

//Home Components
import PromoSectionOne from "./components/Home/PromoSectionOne";
import PopularProducts from "./components/Home/PopularProducts";
import ProductWithCategory from "./components/Home/ProductWithCategory";

// Pages

import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopingCartPage from "./pages/ShopingCartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import BasicSettingPage from "./pages/UserAccount/BasicSettingPage";
import AddressSettingPage from "./pages/UserAccount/AddressSettingPage";
import SecuritySettingPage from "./pages/UserAccount/SecuritySettingPage";
import ProductFilterPage from "./pages/ProductFilterPage";
import DashboardPage from "./pages/UserAccount/DashboardPage";
import TrackOrderPage from "./pages/UserAccount/TrackOrderPage";
import AddressBookAndCardsPage from "./pages/UserAccount/AddressBookAndCardsPage";
import UpdateAddressPage from "./pages/UpdateAddressPage";
import CreateAddressPage from "./pages/CreateAddressPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyReviewPage from "./pages/MyReviewsPage";
//Layouts
import SettingLayout from "./layouts/SettingLayout";
import MainLayout from "./layouts/MainLayout";

//socket
import { socket } from "./socket/socket";

//Slices

//User Slice
import loginUser from "./store/slices/userSlice/loginUser";
import authReducer from "./store/slices/userSlice/authSlice";
import logoutUser from "./store/slices/userSlice/logoutUser";
import registerUser from "./store/slices/userSlice/registerUser";
import updateUserBasicInfo from "./store/slices/userSlice/updateUserBasicInfo";
import updateUserAvatar from "./store/slices/userSlice/updateUserAvatar";
import authCheck from "./store/slices/userSlice/authCheck";

//Location Slice
import locationReducer from "./store/slices/location/locationSlice";
import fetchCountries from "./store/slices/location/fetchCountries";
import fetchStates from "./store/slices/location/fetchStates";
import fetchCities from "./store/slices/location/fetchCities";
import fetchTowns from "./store/slices/location/fetchTowns";

//AddressBook Slice
import addressBookReducer from "./store/slices/addressBook/addressBookSlice";
import createAddress from "./store/slices/addressBook/createAddress";
import deleteAddress from "./store/slices/addressBook/deleteAddress";
import updateAddress from "./store/slices/addressBook/updateAddress";
import getAllAddress from "./store/slices/addressBook/getAllAddress";
import {setAddress,clearAddress} from "./store/slices/addressBook/addressBookSlice";
import changeDefaultAddress from "./store/slices/addressBook/changeDefaultAddress";

//Product Slice
import productReducer from "./store/slices/productSlice/productSlice";
import getProductDetails from "./store/slices/productSlice/getProductDetails";
import filterProduct from "./store/slices/productSlice/filterProduct";
import { setSearchProduct } from "./store/slices/productSlice/productSlice";
import getAllCategories from "./store/slices/productSlice/getAllCategories";
import getProducts from "./store/slices/productSlice/getProducts";
// import ProductContainer from "./components/ProductContainer";
// import ProductWithCategory from "./components/Home/ProductWithCategory";
// import PopularProducts from "./components/Home/PopularProducts";
// import ProductContainer from "./components/ProductContainer";
// import StarRating from "./components/StarRating";
// import AddressForm from "./components/AddressForm";
// import BillingFormCard from "./components/BillingFormCard";


//Cart Slice
import cartReducer from "./store/slices/cart/cartSlice";
import addItemToCart from "./store/slices/cart/addItemToCart";
import removeItemFromCart from "./store/slices/cart/removeITemFromCart";
import updateCartItem from "./store/slices/cart/UpdateCartItem"
import getUserCart from "./store/slices/cart/getUserCart";
import { clearCart } from "./store/slices/cart/cartSlice";
//Wishlist Slice
import wishlistReducer from "./store/slices/wishlist/wishlishSlice";
import addItemToWishlist from "./store/slices/wishlist/addItemToWishlist";
import removeItemFromWishlist from "./store/slices/wishlist/removeItemFromWishlist";
import getWishlist from "./store/slices/wishlist/getWishlist";
import { clearWishlist } from "./store/slices/wishlist/wishlishSlice";
//Order Slice
import orderReducer from "./store/slices/orderSlice/orderSlice";
import createOrder from "./store/slices/orderSlice/createOrder";
import getOrders from "./store/slices/orderSlice/getOrders";
import trackOrder from "./store/slices/orderSlice/trackOrder";
import deliveredOrder from "./store/slices/orderSlice/deliveredOrder";
import { clearOrders } from "./store/slices/orderSlice/orderSlice";
import updateItemStatus from "./store/slices/orderSlice/updateItemStatus";
import updateOderStatus from "./store/slices/orderSlice/updateOderStatus";
//Payment Slice
import paymentReducer from "./store/slices/paymentSlice/paymentSlice";
import createStripePayment from "./store/slices/paymentSlice/stripePayment/createStripePayment";
import confirmStripePayment from "./store/slices/paymentSlice/stripePayment/confirmStripePayment";
import handleStripePayment from "./store/slices/paymentSlice/stripePayment/handleStripePayment"

//Product Review Slice
import productReviewReducer from "./store/slices/productReview/productReviewSlice";
import getUserProductReview from "./store/slices/productReview/getUserProductReview";
import addProductReview from "./store/slices/productReview/addProductReveiw";
import updateProductReview from "./store/slices/productReview/updateProductReview";
import getProductReviews from "./store/slices/productReview/getProductReviews";
//Product Question Slice
import productQuestionReducer from "./store/slices/productQuestionSlice/productQuestionSlice";
import getProductQuestion from"./store/slices/productQuestionSlice/getProductQuestion"
import updateProductQuestion from "./store/slices/productQuestionSlice/updateProductQuestion";
import updateAnswerToProductQuestion from "./store/slices/productQuestionSlice/updateAnswerToProductQuestion";
import deleteProductQuestion from "./store/slices/productQuestionSlice/deleteProductQuestion";
import createProductQuestion from "./store/slices/productQuestionSlice/createProductQuestion";


//redux store
import store from "./store/store";

export {
  // Components
  Header,
  Footer,
  Input,
  Button,
  CheckBox,
  SelectMenu,
  ProductContainer,
  VerticleNavbar,
  StarRating,
  AddressForm,
  BillingFormCard,
  TrackOrder,
  // Home Components
  PromoSectionOne,
  PopularProducts,
  ProductWithCategory,

  // Pages
  LoginPage,
  RegisterPage,
  HomePage,
  ProductPage,
  ProductDetailPage,
  ShopingCartPage,
  WishlistPage,
  CheckOutPage,
  OrderHistoryPage,
  BasicSettingPage,
  AddressSettingPage,
  SecuritySettingPage,
  ProductFilterPage,
  DashboardPage,
  TrackOrderPage,
  AddressBookAndCardsPage,
  UpdateAddressPage,
  CreateAddressPage,
  OrderDetailPage,
  MyReviewPage,
  //Layouts
  SettingLayout,
  MainLayout,
  //socket
  socket,

  //Slices

  //User Slice
  loginUser,
  logoutUser,
  authCheck,
  registerUser,
  authReducer,
  updateUserBasicInfo,
  updateUserAvatar,

  //Location Slice
  locationReducer,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchTowns,
  
  //AddressBook Slice
  addressBookReducer,
  createAddress,
  updateAddress,
  deleteAddress,
  getAllAddress,
  setAddress,
  changeDefaultAddress,
  clearAddress,

  //Product Slice
  productReducer,
  getProductDetails,
  addProductReview,
  filterProduct,
  setSearchProduct,
  getAllCategories,
  getProducts,
  //Cart Slice
  cartReducer,
  addItemToCart,
  getUserCart,
  removeItemFromCart,
  updateCartItem,
  clearCart,

  //Wishlist Slice
  wishlistReducer,
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlist,
  clearWishlist,

  //Order Slice
  orderReducer,
  createOrder,
  getOrders,
  trackOrder,
  clearOrders,
  deliveredOrder,
  updateItemStatus,
  updateOderStatus,

  //Payment Slice
  paymentReducer,
  createStripePayment,
  confirmStripePayment,
  handleStripePayment,

  //Product Review Slice
  productReviewReducer,
  getUserProductReview,
  updateProductReview,
  getProductReviews,

  //Product Question Slice
  productQuestionReducer,
  getProductQuestion,
  updateProductQuestion,
  updateAnswerToProductQuestion,
  deleteProductQuestion,
  createProductQuestion,

  //redux store
  store,
};
