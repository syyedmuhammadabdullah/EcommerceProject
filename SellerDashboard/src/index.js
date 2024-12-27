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
import ProductForm from "./components/ProductForm";
//Home Components
import PromoSectionOne from "./components/Home/PromoSectionOne";
import PopularProducts from "./components/Home/PopularProducts";
import ProductWithCategory from "./components/Home/ProductWithCategory";

// pages
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductQuestionsPage from "./pages/ProductQuestionsPage";

//layouts
import MainLayout from "./layouts/MainLayout";
//hooks
import useProductFormData from "./hooks/useProductFormData";

//redux store
// Slices
import productFormReducer from "./store/productForm/productForm";
import { updateProductFormData } from "./store/productForm/productForm";

//product Slice
import productReducer from "./store/slices/productSlice/productSlice";
import createProduct from "./store/Slices/ProductSlice/createProduct";
import getAllProducts from "./store/Slices/ProductSlice/getAllProducts";
import updateProduct from "./store/Slices/ProductSlice/updateProduct";
import deleteProduct from "./store/Slices/ProductSlice/deleteProduct";

//productQuestion Slice
import productQuestionReducer from "./store/Slices/ProductQuestionSlice/productQuestionSlice";
// import createProductQuestion from "./store/Slices/ProductQuestionSlice/createProductQuestion";
import getProductsQuestion from "./store/Slices/ProductQuestionSlice/getProductsQuestion";
import giveAnswerToQuestion from "./store/Slices/ProductQuestionSlice/giveAnswerToQuestion";
// import updateProductQuestion from "./store/Slices/ProductQuestionSlice/updateProductQuestion";
// import deleteProductQuestion from "./store/Slices/ProductQuestionSlice/deleteProductQuestion";

//seller Slice
import sellerReducer from "./store/Slices/SellerSlice/SellerSlice";
import createSeller from "./store/Slices/SellerSlice/createSeller";
import loginSeller from "./store/Slices/SellerSlice/loginSeller";

// store
import store from "./store/store";
export {
  PrimaryBtn,
  DefaultBtn,
  productFormReducer,
  useProductFormData,
  updateProductFormData,
  deleteProduct,
  updateProduct,
  productQuestionReducer,
  getProductsQuestion,
  giveAnswerToQuestion,
  productReducer,
  createSeller,
  getAllProducts,
  loginSeller,
  sellerReducer,
  createProduct,
  SearchBtn,
  Divider,
  ProductForm,
  OrderHistoryPage,
  ProductQuestionsPage,
  ProductsPage,
  InputBox,
  Footer,
  store,
  Input,
  Button,
  CheckBox,
  SelectMenu,
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
