import { useSelector,useDispatch } from "react-redux";
import { updateProductFormData } from "../index";
const useProductFormData = () => {
    const dispatch = useDispatch();
    const productForm = useSelector((state) => state.productForm.product);


    const setProductForm=(name,value,product)=>{
        console.log(product);
        
        dispatch(updateProductFormData({name,value,product}));
    }

    return {productForm,setProductForm}
}

export default useProductFormData;