//Components import
import PrimaryBtn from "./components/PrimaryBtn";
import DefaultBtn from "./components/DefaultBtn";
import SearchBtn from "./components/SearchBtn";
import Divider from "./components/Divider";
import InputBox from "./components/InputBox";
import Footer from "./components/Footer";
import Input from "./components/Input";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";
import SelectMenu from "./components/SelectMenu";
import ProductContainer from "./components/ProductContainer";
import StarRating from "./components/StarRating";
import BillingFormCard from "./components/BillingFormCard";
import TrackOrder from "./components/TrackOrder";
import ProductDescriptionEditor from "./components/ProductDescriptionEditor";
import MyChart from "./components/MyChart";
//Home Components
import PromoSectionOne from "./components/Home/PromoSectionOne";
import PopularProducts from "./components/Home/PopularProducts";
import ProductWithCategory from "./components/Home/ProductWithCategory";

// pages
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import SellerWithdrawRequests from "./pages/SellerWithdrawRequest.jsx";
import CustomersPage from "./pages/CustomersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderInvoicePage from "./pages/OrderInvoicePage";
import DashboardPage from "./pages/DashboardPage";
import WalletPage from "./pages/WalletPage";
import WithdrawPage from "./pages/WithdrawPage";
import CouponPage from "./pages/CouponPage";
import ProfilePage from "./pages/ProfilePage";
import CreateCouponPage from "./pages/CreateCouponPage";
import CreateProductPage from "./pages/CreateProductPage";
import SellerPage from "./pages/SellerPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
//layouts
import MainLayout from "./layouts/MainLayout";
//hooks
import useDebouncedHook from "./hooks/useDebouncedHook";

//redux store
// Slices

//product Slice
import productReducer from "./store/slices/productSlice/productSlice";
import createProduct from "./store/Slices/ProductSlice/createProduct";
import getAllProducts from "./store/Slices/ProductSlice/getAllProducts";
import updateProduct from "./store/Slices/ProductSlice/updateProduct";
import deleteProduct from "./store/Slices/ProductSlice/deleteProduct";
import getOneProduct from "./store/Slices/ProductSlice/getOneProduct";
import getSellerAllProducts from "./store/Slices/ProductSlice/getSellerAllProducts.js";
import getSellerProducts from "./store/Slices/ProductSlice/getSellerProducts.js";
//productQuestion Slice
import productQuestionReducer from "./store/Slices/ProductQuestionSlice/productQuestionSlice";
// import createProductQuestion from "./store/Slices/ProductQuestionSlice/createProductQuestion";
import getProductsQuestion from "./store/Slices/ProductQuestionSlice/getProductsQuestion";
import giveAnswerToQuestion from "./store/Slices/ProductQuestionSlice/giveAnswerToQuestion";
// import updateProductQuestion from "./store/Slices/ProductQuestionSlice/updateProductQuestion";
// import deleteProductQuestion from "./store/Slices/ProductQuestionSlice/deleteProductQuestion";

//Admin Slice
import adminReducer from "./store/Slices/AdminSlice/adminSlice";
import createAdmin from "./store/Slices/AdminSlice/createAdmin";
import loginAdmin from "./store/Slices/AdminSlice/loginAdmin";
import updateAdmin from "./store/Slices/AdminSlice/updateAdmin";
import getAdmin from "./store/Slices/AdminSlice/getAdmin";
import logoutAdmin from "./store/Slices/AdminSlice/logoutAdmin";
//customer Slice
import customerReducer from "./store/Slices/CustomerSlice/CustomerSlice";
import getAllCustomers from "./store/Slices/CustomerSlice/getAllCustomers";
//order Slice
import orderReducer from "./store/Slices/OrderSlice/OrderSlice";
import getAllOrders from "./store/Slices/orderSlice/getAllOrders";
import getOneSellerOrder from "./store/Slices/orderSlice/getOneSellerOrder";
import getCustomerOrders from "./store/Slices/orderSlice/getCustomerOrders.js";
import updateOrderStatus from "./store/Slices/orderSlice/updateOderStatus";
import getSellerOrdersDetail from "./store/Slices/orderSlice/getSellerOrdersDetail";
import getSellerOrders from "./store/Slices/orderSlice/getSellerOrders.js";
import getSellerDetailForAdmin from "./store/Slices/SellerSlice/getSellerDetailForAdmin.js";

//transaction

import transationReducer from "./store/Slices/TransactionSlice/transactionSlice";
import getBalance from "./store/Slices/TransactionSlice/getBalance";
import getTransactions from "./store/Slices/TransactionSlice/getTransaction";
import requestWithdraw from "./store/Slices/TransactionSlice/requestWithdraw";
import getPendingWithdrawRequest from "./store/Slices/TransactionSlice/getPendingWithdrawRequest";
import updateWithdrawRequest from "./store/Slices/TransactionSlice/updateWithdrawRequest.js";

//sellerSlice
import sellerReducer from "./store/Slices/SellerSlice/SellerSlice";
import getAllSellers from "./store/Slices/SellerSlice/getAllSellers.js";
import updateSellerStatus from "./store/Slices/SellerSlice/updateSellerStatus";

//categorySlice
import categoryReducer from "./store/Slices/CategorySlice/CategorySlice";
import getMainCategories from "./store/Slices/CategorySlice/getMainCategories";
import createMainCategory from "./store/Slices/CategorySlice/createMainCategory";
import updateMainCategory from "./store/Slices/CategorySlice/updateMainCategory";
import deleteMainCategory from "./store/Slices/CategorySlice/deleteMainCategory";
import createSubCategory from "./store/Slices/CategorySlice/createSubCategory.js";
import getSubCategories from "./store/Slices/CategorySlice/getSubCategories";
import deleteSubCategory from "./store/Slices/CategorySlice/deleteSubCategory";
import updateSubCategory from "./store/Slices/CategorySlice/updateSubCategory";
// import getOneCategory from "./store/Slices/CategorySlice/getOneCategory";

// store
import store from "./store/store";
export {
  PrimaryBtn,
  DefaultBtn,
  requestWithdraw,
  deleteProduct,
  updateProduct,
  getOneProduct,
  productQuestionReducer,
  getProductsQuestion,
  giveAnswerToQuestion,
  customerReducer,
  getBalance,
  logoutAdmin,
  getTransactions,
  getAllCustomers,
  orderReducer,
  getSellerDetailForAdmin,
  transationReducer,
  updateWithdrawRequest,
  getPendingWithdrawRequest,
  getAllSellers,
  updateSellerStatus,
  sellerReducer,
  getSellerAllProducts,
  getSellerOrdersDetail,
  updateOrderStatus,
  getAllOrders,
  getSellerProducts,
  getSellerOrders,
  getCustomerOrders,
  getOneSellerOrder,
  productReducer,
  createAdmin,
  getAllProducts,
  loginAdmin,
  updateAdmin,
  createMainCategory,
  updateMainCategory,
  deleteMainCategory,
  getMainCategories,
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,

  categoryReducer,
  getAdmin,
  adminReducer,
  createProduct,
  SearchBtn,
  Divider,
  OrderHistoryPage,
  CreateProductPage,
  SellerPage,
  WithdrawPage,
  WalletPage,
  DashboardPage,
  SellerWithdrawRequests,
  CouponPage,
  CustomersPage,
  CategoryPage,
  OrderDetailPage,
  ProductsPage,
  OrderInvoicePage,
  CreateCouponPage,
  ProfilePage,
  InputBox,
  Footer,
  ProductDescriptionEditor,
  store,
  Input,
  Button,
  CheckBox,
  useDebouncedHook,
  SelectMenu,
  MyChart,
  ProductContainer,
  StarRating,
  BillingFormCard,
  TrackOrder,
  PromoSectionOne,
  PopularProducts,
  ProductWithCategory,
  LoginPage,
  RegisterPage,
  MainLayout,
};
