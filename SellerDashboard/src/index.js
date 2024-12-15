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

//hooks
import useProductFormData from "./hooks/useProductFormData";

//redux store
// Slices
import productFormReducer from "./store/productForm/productForm";
import { updateProductFormData } from "./store/productForm/productForm";

// store
import store from "./store/store";
export {
  PrimaryBtn,
  DefaultBtn,
  productFormReducer,
  useProductFormData,
  updateProductFormData,
  SearchBtn,
  Divider,
  ProductForm,
  OrderHistoryPage,
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
};
