import React,{useEffect,useRef,useState} from 'react'
import { Button, createProduct, getOneProduct, Input, updateProduct,} from '../index'
import { useDispatch,useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { UploadOutlined ,CloseCircleOutlined } from '@ant-design/icons';
import { serialize } from 'object-to-formdata';
import {  useNavigate, useParams } from 'react-router-dom';

const CreateProductPage = () => {

  const [productForm, setProductForm] = useState({
  name: "",
  price: 0,
  discountPrice: 0,
  currentStock: 0,
  brand: "",
  description: "",
  category: "",
  subCategory: "",
  lowStock: 0,
  maxQuantity: 0,
  stockStatus: "in stock",
    length: 0,
    width: 0,
    height: 0,
  weight: 0,

});
const [productImage,setProductImage]=useState(null);
const [additionalImages,setAdditionalImages]=useState([]);
const {loading,product,error}=useSelector(state=>state.product)
    const dispatch=useDispatch()
const producrImaageRef=useRef(null);
const additionalImagesRef=useRef(null);
const navigate=useNavigate()
  const {id}=useParams()

  useEffect(() => {
    if (id) {
      dispatch(getOneProduct(id));
    }
  }, [id]);
    useEffect(() => {
        if (product) {
          setProductForm({...product,length:product?.dimensions?.length,width:product?.dimensions?.width,height:product?.dimensions?.height});
            setProductImage(product?.image);
            setAdditionalImages(product?.additionalImages || []);
        }
    }, [product]);
        

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProductForm(prev => ({
    ...prev,
    [name]: value
  }));
};
   
    const handleProductImageChange=(e)=>{
     const files = e?.target?.files || e?.dataTransfer?.files;
  if (!files || files.length === 0) return; 
  const file = files[0];
      if (file) {
      // Create a new File instance with the modified name
      const modifiedFile = new File([file], "mainImage", { type: file.type });
      // Update the images state with the new file
      console.log("mainImage",modifiedFile);
      
        setProductImage(modifiedFile);
    }
    }

    const handleProductImageDrag=(e)=>{
        
      e.preventDefault();
     e.stopPropagation();
    }
    const handleProductImageDrop=(e)=>{
        
      e.preventDefault();
        e.stopPropagation();
      handleProductImageChange(e);
    }

    const handleProductImageClick=()=>{
        if (producrImaageRef.current) {
            producrImaageRef.current.click()
        }
    }
    const handleProductImageRemove=()=>{
        
      setProductImage(null);
    }

    const handleAdditionalImagesChange=(e)=>{
      const files = e?.target?.files || e?.dataTransfer?.files;
      if (!files || files.length === 0) return; 
      const file = files[0];
      setAdditionalImages(prev => [...prev, ...files]);
    }
    const handleAdditionalImagesDrag=(e)=>{
        
      e.preventDefault();
     e.stopPropagation();
    }
    const handleAdditionalImagesDrop=(e)=>{
        
      e.preventDefault();
        e.stopPropagation();
      handleAdditionalImagesChange(e);
    }
    const handleAdditionalImagesClick=()=>{  
        if (additionalImagesRef.current) {
            additionalImagesRef.current.click()
        }
    }

    const handleSubmit = () => {
   const images = [productImage, ...additionalImages];
      const Data = { ...productForm, images };

        // Append credentials to formData
        const formData = serialize(Data);
        
        dispatch(createProduct({ formData }));
        if (!error&&!loading){
        navigate("/products");}
    };
    const  handleUpdateProduct = () => {
      const Data = { ...productForm, image: productImage, additionalImages,};

        
        // Append credentials to formData
        const formData = serialize(Data);
        
        dispatch(updateProduct({ formData }));
        if (!error&&!loading){
        navigate("/products");}
    };

    return (
        <section className="flex justify-center ">
          <div className="container max-w-screen-xl relative lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">

            <div className="top-menu ">
            <div className="title ">
              <h4>Product Details</h4>
            </div>
           
    
            </div>

<div className=" basic-Information bg-white border rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
  <div className="col-span-full">
    <h5>Basic Information</h5>
  </div>

  <div>
    <label>Product Name</label>
    <Input name="name" value={productForm.name} onChange={handleInputChange} placeholder="Product name" />
  </div>

  <div>
    <label>Brand</label>
    <Input name="brand" value={productForm.brand} onChange={handleInputChange} placeholder="Brand" />
  </div>

  <div>
    <label>SKU</label>
    <Input name="sku" value={productForm.sku} onChange={handleInputChange} placeholder="SKU" />
  </div>

  <div>
    <label>Stock Status</label>
    <Input name="stockStatus" value={productForm.stockStatus} onChange={handleInputChange} placeholder="in stock / out of stock" />
  </div>

  <div className="col-span-full">
    <label>Description</label>
    <Input name="description" value={productForm.description} onChange={handleInputChange} placeholder="Product description" />
  </div>
</div>

<div className="category bg-white border rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">

  <div className="col-span-full">
    <h5>Pricing & Category</h5>
  </div>
          <div>
    <label>Price</label>
    <Input type="number" name="price" value={productForm.price} onChange={handleInputChange} />
  </div>

  <div>
    <label>Discount Price</label>
    <Input type="number" name="discountPrice" value={productForm.discountPrice} onChange={handleInputChange} />
  </div>

 <div >
    <label>Category</label>
  <Input name="category" value={productForm.category} onChange={handleInputChange} placeholder="Category" />
    </div>
  <div >
    <label>Sub Category</label>
  <Input name="subCategory" value={productForm.subCategory} onChange={handleInputChange} placeholder="Sub Category" />
    </div>
</div>


<div className="inventory bg-white border rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
  <div className="col-span-full">
    <h5>Inventory</h5>
  </div>

  <div>
    <label>Current Stock</label>
    <Input type="number" name="currentStock" value={productForm.currentStock} onChange={handleInputChange} />
  </div>

  <div>
    <label>Max Quantity</label>
    <Input type="number" name="maxQuantity" value={productForm.maxQuantity} onChange={handleInputChange} />
  </div>

  <div>
    <label>Low Stock Threshold</label>
    <Input type="number" name="lowStock" value={productForm.lowStock} onChange={handleInputChange} />
  </div>
</div>

<div className="dimensions  bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
  <div className="col-span-full ">
    <h5>Dimensions</h5>
  </div>
 <div >
    <label>Length (cm)</label>
  <Input
    placeholder="Length"
    type="number"
    name="length"
    value={productForm?.length}
    onChange={handleInputChange}
  />
    </div>
 <div >
    <label>Width (cm)</label>
  <Input
    placeholder="Width"
    type="number"
    name="width"
    value={ productForm?.width}
    onChange={handleInputChange}
  />
    </div>
 <div >
    <label>Height (cm)</label>
  <Input
    placeholder="Height"
    type="number"
    name="height"
    value={ productForm.height}
    onChange={handleInputChange}
  />
    </div>

  <div >
    <label>Weight (kg)</label>
    <Input type="number" name="weight" value={productForm.weight} onChange={handleInputChange} />
  </div>
</div>

<div className="product-image  bg-white border border-border-primary rounded-md p-p-lg ">
  <div className="col-span-full ">
    <h5>Product Image</h5>
  </div>
{productImage ? <div className="image flex flex-col relative items-center justify-center gap-md h-[200px] w-[200px] border-dashed border border-border-primary rounded-md "> <img className='h-full w-full' src={!productImage.name? productImage: URL.createObjectURL(productImage)} alt="" /> <CloseCircleOutlined onClick={handleProductImageRemove} className='absolute top-2 right-2 text-xl text-red-500 cursor-pointer' /></div>:  <div >
    <div onDragOver={handleProductImageDrag} onDrop={handleProductImageDrop}  onClick={handleProductImageClick} className="upload cursor-pointer bg-[#00000005] flex flex-col items-center justify-center gap-md h-[146px] border-dashed border border-border-primary rounded-md ">
    <div className="icon">
        <UploadOutlined className='text-xxl text-primary-base'/>
    </div>

  <Input
  onChange={(e)=>handleProductImageChange(e)}
    ref={producrImaageRef}
    placeholder="Product Image"
    type="file"
    divClassName="hidden"
    className="hidden"/>
    </div>

    </div>}


</div>

<div className='additional-images bg-white border border-border-primary rounded-md p-p-lg '>
 <div className="col-span-full ">
    <h5>Additional Images</h5>
  </div>
    <div className="images flex flex-wrap gap-md">
    {additionalImages?.length>0 && additionalImages?.map((img,index)=><div key={index} className="image flex flex-col relative items-center justify-center gap-md h-[100px] w-[100px] border-dashed border border-border-primary rounded-md "> <img className='h-full w-full' src={!img._id ?  URL.createObjectURL(img): img.url} alt="" /> <CloseCircleOutlined onClick={()=>{
      setAdditionalImages(prev=>prev.filter((_,i)=>i!==index))
    }} className='absolute top-2 right-2 text-xl text-red-500 cursor-pointer' /></div>)}

  
    <div onClick={handleAdditionalImagesClick} onDragOver={handleAdditionalImagesDrag} onDrop={handleAdditionalImagesDrop} className="upload cursor-pointer bg-[#00000005] flex flex-col items-center justify-center gap-md h-[100px] w-[100px] border-dashed border border-border-primary rounded-md ">
   
        <UploadOutlined className='text-xxl text-primary-base'/>
  
    <Input
    onChange={(e)=>handleAdditionalImagesChange(e)}
      ref={additionalImagesRef}
      placeholder="Product Image"
      type="file"
      multiple
      divClassName="hidden"
      className="hidden"/>

   
 </div>
</div>
</div>



<div className="update col-span-full ml-auto">
    {id? < Button onClick={handleUpdateProduct}  children="update" className='w-full bg-primary-base text-white py-p-xs rounded-md px-p-md' /> :
<Button onClick={handleSubmit}  children="create" className='w-full bg-primary-base text-white py-p-xs rounded-md px-p-md' />}
    
</div>

</div>     
           
            
        
        </section>
      );
}

export default CreateProductPage;