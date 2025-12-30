import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button,getAllProducts,deleteProduct } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {loading ,products} = useSelector((state) => state.product);

  const navigate=useNavigate()
const [selectedFilter, setSelectedFilter] =useState("all");
  const filters = ["All", "Active", "Inactive", "Out of Stock", "In Stock"];
const [search, setSearch] = useState("");

const handleFilterChange = (filter) => {
  setSelectedFilter(filter);
};
useEffect(() => {
  dispatch(getAllProducts({filter:selectedFilter,search,page:1,limit:10}));  
}, [search,selectedFilter,dispatch]);


const handleEdit=(id)=>{
  navigate(`/edit-product/${id}`)
}

const handleDelete=(id)=>{
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
          <Link to="/new-product">
            <Button children="Create Product" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" />
          </Link>
        </div>

        </div>

        <div className="filter flex justify-between border border-border-primary rounded-md bg-white">
          <div className="options rounded-md flex-wrap border-border-primary overflow-scroll no-scrollbar flex w-fit">
            {filters.map((filter,index) => (
              <Button key={index}
                children={filter}
                onClick={() => handleFilterChange(filter.toLowerCase())}
                className={`option ${selectedFilter === filter.toLowerCase() ? "bg-primary-base text-white" : "text-black"}  text-center  border-border-primary border px-p-md py-p-xxs`}
              />
            ))}
          </div>
          <div className="search">
            <Input placeholder="Search"  onChange={(e) => setSearch(e.target.value)} value={search} icon={<SearchOutlined  />} />
          </div>
        </div>
        <div className="content border border-border-primary bg-white  w-full overflow-scroll no-scrollbar">

       
        <div className="data w-full grid overflow-scroll no-scrollbar">
          <div className="head grid grid-cols-[48px_389px_389px_137px_179px_111px] h-[54px] items-center bg-border-primary">
           <div className="id border pl-[10px] w-[48px] flex items-center border-border-primary h-full" >ID</div>
           <div className="name border pl-[10px] w-[389px] flex items-center border-border-primary h-full" >Product Name</div>
           <div className="stock border pl-[10px] w-[389px] flex items-center border-border-primary h-full" >In Stock</div>
           <div className="price border pl-[10px] w-[137px] flex items-center border-border-primary h-full" >Price</div>
           <div className="price border pl-[10px] w-[179px] flex items-center border-border-primary h-full" >Status</div>
           <div className="action border pl-[10px] w-[111px] flex items-center border-border-primary h-full" >Action</div>
          </div>
          {
            products?.map((product,index)=>(
              <div key={product._id} className="body grid grid-cols-[48px_389px_389px_137px_179px_111px] items-center  h-[72px]  ">
              <div className="id border pl-[10px] w-[48px] flex items-center border-border-primary h-full" >{index+1}</div>
               <div className="name border text-text-secondary gap-xs text-sm pl-[10px] w-[389px] flex items-center border-border-primary h-full" >
               <div className="img w-[40px] h-[40px]">
               <img src={product.image} alt=""  className="w-full h-full"/>
               </div>
               <div className="name">
                <p>{product?.name?.length>40?product.name.slice(0,40)+"...":product.name}</p>
               <p>in {product.category}</p>
               </div>
                </div>
               <div className="stock border pl-[10px] w-[389px] flex flex-col gap-xs justify-center border-border-primary h-full" >
               <div className="bar w-[128px] h-[10px] rounded-md overflow-hidden bg-border-primary relative ">
                          <div className={`range absolute left-0 top-0 bg-primary-base h-full`} style={{width:`${product.currentStock/product.totalStock*100}%`}}></div>
                        </div>
                          <p>{product.currentStock} {product.stockStatus}</p>
               </div>
               <div className="price border pl-[10px] w-[137px] flex items-center border-border-primary h-full" >{product.price}</div>
               <div className="price border pl-[10px] w-[179px] flex items-center border-border-primary h-full" >{product.status}</div>
               <div className="action border pl-[10px] w-[111px] flex items-center border-border-primary h-full" ><span className="cursor-pointer" onClick={()=>handleEdit(product._id)}>Edit</span><span className="cursor-pointer" onClick={()=>handleDelete(product._id)} >Delete</span></div>
                 
              </div>
            ))
          }    
         
        </div>
        {/* Pagination */}
        {products?.length === 0 ? "" :
        <div className="pagination flex gap-xs mt-md justify-center items-center py-p-md border-t border-border-primary">
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
