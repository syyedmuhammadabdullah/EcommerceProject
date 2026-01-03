import React, { useEffect,useState } from "react";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button,getAllProducts,deleteProduct,useDebouncedHook,SelectMenu,updateProduct,getSellerAllProducts,getSellerProducts } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {loading ,products,sellerProducts,venderId} = useSelector((state) => state.product);
  const [status, setStatus] = useState("");
const location = useLocation();
  const currentPath = location.pathname;
  const params =new URLSearchParams(location.search);
  const sellerId = params?.get("sellerId");
  const storeName=params?.get("storeName")
  const navigate=useNavigate()
const [selectedFilter, setSelectedFilter] =useState("all");
  const filters = ["All", "Active", "Inactive", "Out of Stock", "In Stock"];
const [search, setSearch] = useState("");
const [editId, setEditId] = useState(null);
const debouncedSearch = useDebouncedHook(search,500);

 const mode =
  currentPath === "/products"
    ? "all"
    : "seller";

const handleFilterChange = (filter) => {
  if (filter!==selectedFilter) {
    dispatch(getAllProducts({filter}));
  }
  setSelectedFilter(filter);
};

useEffect(() => {
  
  const payload = { search: debouncedSearch, filter: selectedFilter };  
  switch(mode) {
    case "all": (products?.length === 0 ||search===debouncedSearch )&& dispatch(getAllProducts(payload)); break;
    case "seller": (sellerProducts?.length === 0 ||search===debouncedSearch || sellerId!==venderId) && dispatch(getSellerAllProducts({ ...payload, sellerId })); break;
  }
}, [mode, debouncedSearch,search, selectedFilter, sellerId, dispatch]);



const handleEdit=(id)=>{
setEditId(id)
}

const handleSave=(id)=>{
  // dispatch update product action
  dispatch(updateProduct({productId:id,status}));
  setEditId(null);
}

const handleCancel=()=>{
  setEditId(null);
}
const handleKeyDown = (e) => {    
  if (e.key === 'Enter') {
    dispatch(getAllProducts({debouncedSearch}));
  }
};

const handleDelete=(id)=>{
  dispatch(deleteProduct({productId:id}))
}


const columns = {
  all: [
    { key: "id", label: "ID", width: "48px" },
    { key: "product", label: "Product Name", width: "minmax(389px,1fr)" },
    { key: "seller", label: "Store Name", width: "minmax(200px,1fr)" },
    { key: "amount", label: "Total Amount", width: "minmax(137px,1fr)" },
    { key: "status", label: "Order Status", width: "minmax(179px,1fr)" },
    { key: "action", label: "Action", width: "minmax(170px,1fr)" },
  ],
  seller: [
    { key: "id", label: "ID", width: "48px" },
    { key: "product", label: "Produict Name", width: "minmax(389px,1fr)" },
    { key: "amount", label: "Total Amount", width: "minmax(137px,1fr)" },
    { key: "status", label: "Order Status", width: "minmax(179px,1fr)" },
    { key: "action", label: "Action", width: "minmax(170px,1fr)" },
  ],
};
const gridTemplate = columns[mode]
  .map(col => col.width)
  .join(" ").trim();
const dataSource = (() => {
  switch (mode) {
    case "all":      
      return products;

    case "seller":    
      return sellerProducts; // Redux slice for seller
  }
})();

  return (
    <section className="flex justify-center">
      <div className="container max-w-screen-xl lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">
        <div className="top-menu ">
        <div className="title ">
          <h4>{mode === "all" ? "All" : storeName} Products</h4>
          <p>Manage All Products</p>
        </div>
      

        </div>

        <div className="filter flex justify-between border border-border-primary rounded-md bg-white">
          <div className="options rounded-md flex-wrap border-border-primary overflow-scroll no-scrollbar flex w-fit">
            {filters.map((filter,index) => (
              <Button key={index}
                children={filter}
                onClick={() => handleFilterChange(filter.toLowerCase())}
                className={`option hover:bg-primary-hover hover:text-white ${selectedFilter === filter.toLowerCase() ? "bg-primary-base text-white" : "text-black"}  text-center  border-border-primary border px-p-md py-p-xxs`}
              />
            ))}
          </div>
          <div className="search">
            <Input placeholder="Search"  onChange={(e) => setSearch(e.target.value)} value={search} icon={<SearchOutlined onKeyDown={handleKeyDown} />} />
          </div>
        </div>
        <div className="content  border border-border-primary bg-white overflow-scroll no-scrollbar">

       
        <div className="data w-full  grid overflow-scroll no-scrollbar">
         
          <div
  className={`head h-[54px] grid  items-center bg-[#00000005]`}
   style={{ gridTemplateColumns: gridTemplate }}
>
  {columns[mode].map(col => (
    <div
      key={col.key}
      className="border pl-[10px] flex items-center border-border-primary h-full"
    >
      {col.label}
    </div>
  ))}
</div>
          {
            dataSource?.map((product,index)=>(
               <div
    key={product._id}
    className={`body h-[72px] grid  items-center bg-[#00000005]`}
  style={{ gridTemplateColumns: gridTemplate }}
 >
              <div className="id border pl-[10px] w-[48px] flex items-center border-border-primary h-full" >{index+1}</div>
               <div className="name border text-text-secondary gap-xs text-sm pl-[10px] min-w-[389px] flex items-center border-border-primary h-full" >
               <div className="img w-[40px] h-[40px]">
               <img src={product.image} alt=""  className="w-full h-full"/>
               </div>
               <div className="name">
                <p>{product?.name?.length>40?product.name.slice(0,40)+"...":product.name}</p>
               <p>in {product.category}</p>
               </div>
                </div>
               {
       
              mode==="all"&& <div className="sellerName border pl-[10px] min-w-[200px] flex items-center border-border-primary h-full" >{product?.seller?.storeDetails?.storeName}</div>
           
               }
               <div className="price border pl-[10px] min-w-[137px] flex items-center border-border-primary h-full" >{product.price}</div>
               <div className="status border pl-[10px] min-w-[179px] flex items-center border-border-primary h-full" >{editId===product._id? <SelectMenu defaultValue={product.status} options={["active", "inactive", "suspended"]} onClick={(value)=>setStatus(value)}/>:  product.status}</div>
               <div className="action border pl-[10px] min-w-[170px] flex gap-sm items-center border-border-primary h-full" >{editId===product._id? <Button children="Save" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleSave(product._id)} />: <Button children="Edit" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleEdit(product._id)} />} {editId===product._id? <Button children="Cancel" className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleCancel(product._id)} />:<Button children="Delete" className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleDelete(product._id)} />}</div>
                 
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
