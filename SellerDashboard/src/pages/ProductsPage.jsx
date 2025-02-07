import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button,getAllProducts,useProductFormData,deleteProduct } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {loading ,products} = useSelector((state) => state.product);
  const {productForm,setProductForm} = useProductFormData();
  const navigate=useNavigate()
useEffect(() => {
  dispatch(getAllProducts());
  console.log("products",products);
  
}, []);
const handleEdit=(name,value,product)=>{
  
  setProductForm(name,value,product)
  navigate("/edit-product")
}

const handleDelete=(id)=>{
  console.log("delete",id);
  dispatch(deleteProduct({productId:id}))
}
  return (
    <section className="flex justify-center">
      <div className="container max-w-screen-xl lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">
        <div className="top-menu flex justify-between items-end">
        <div className="title ">
          <h4>Products</h4>
          <p>Add edit or manage your Products</p>
        </div>
        <div className="createproduct">
          <Link to="/create-product">
            <Button children="Create Product" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" />
          </Link>
        </div>

        </div>

        <div className="filter flex justify-between">
          <div className="options rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex w-fit">
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
          </div>
          <div className="search">
            <Input placeholder="Search" icon={<SearchOutlined />} />
          </div>
        </div>
        <div className="content w-full overflow-scroll no-scrollbar">

       
        <div className="data w-full grid overflow-scroll no-scrollbar">
          <div className="head grid grid-cols-[48px_389px_389px_137px_179px_111px] h-[54px] items-center bg-[#00000005]">
           <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >ID</div>
           <div className="name border pl-[10px] w-[389px] flex items-center border-[#0000000f] h-full" >Product Name</div>
           <div className="stock border pl-[10px] w-[389px] flex items-center border-[#0000000f] h-full" >In Stock</div>
           <div className="price border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >Price</div>
           <div className="price border pl-[10px] w-[179px] flex items-center border-[#0000000f] h-full" >Status</div>
           <div className="action border pl-[10px] w-[111px] flex items-center border-[#0000000f] h-full" >Action</div>
          </div>
          {
            products?.map((product,index)=>(
              <div key={product._id} className="body grid grid-cols-[48px_389px_389px_137px_179px_111px] items-center  h-[72px]  ">
              <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >{index+1}</div>
               <div className="name border text-text-secondary gap-xs text-sm pl-[10px] w-[389px] flex items-center border-[#0000000f] h-full" >
               <div className="img w-[40px] h-[40px]">
               <img src={product.image} alt=""  className="w-full h-full"/>
               </div>
               <div className="name">
                <p>{product.name.length>40?product.name.slice(0,40)+"...":product.name}</p>
               <p>in {product.category}</p>
               </div>
                </div>
               <div className="stock border pl-[10px] w-[389px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >
               <div className="bar w-[128px] h-[10px] rounded-md overflow-hidden bg-border-secondary relative ">
                          <div className={`range absolute left-0 top-0 bg-primary-base h-full`} style={{width:`${product.currentStock/product.totalStock*100}%`}}></div>
                        </div>
                          <p>{product.currentStock} in Stock</p>
               </div>
               <div className="price border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >{product.price}</div>
               <div className="price border pl-[10px] w-[179px] flex items-center border-[#0000000f] h-full" >{product.status}</div>
               <div className="action border pl-[10px] w-[111px] flex items-center border-[#0000000f] h-full" >Action</div>
                 
              </div>
            ))
          }    
         
        </div>
        {/* Pagination */}
        {products?.length === 0 ? "" :
        <div className="pagination flex gap-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        }
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
