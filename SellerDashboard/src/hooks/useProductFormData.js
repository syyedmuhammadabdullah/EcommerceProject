import { useSelector,useDispatch } from "react-redux";
import { updateProductFormData } from "../index";
const useProductFormData = () => {
    const dispatch = useDispatch();
    const productForm = useSelector((state) => state.productForm);


    const setProductForm=(name,value)=>{
        console.log(value,name);
        
        dispatch(updateProductFormData({name,value}))
    }

    return {productForm,setProductForm}
}

export default useProductFormData;