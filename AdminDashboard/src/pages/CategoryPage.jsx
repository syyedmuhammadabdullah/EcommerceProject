import React, { useEffect,useState } from "react";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button,getAllProducts,deleteProduct,useDebouncedHook,getMainCategories,createMainCategory,SelectMenu,updateProduct,getSellerAllProducts,getSellerProducts, deleteMainCategory, updateMainCategory, createSubCategory, getSubCategories, deleteSubCategory, updateSubCategory } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";



const CreateCategory = ({handleCategoryCancel}) => {
    const [category,setCategory] = useState("")
    const dispatch = useDispatch();

    const handleCreate = () => {
        dispatch(createMainCategory({name:category}));
        handleCategoryCancel()
    }
  return (
    <div className="flex absolute top-0  bg-black/40 items-center justify-center w-full  h-screen">
     <div className="totalSales border border-border-primary rounded-md   bg-white ">
                    <div className="con  flex flex-col gap-sm p-lg">
                    <div className="t-sale text-text-description"><p>Create Category</p></div>
                    <Input type="text" placeholder="Category Name" onChange={(e) => {setCategory(e.target.value)}} value={category}/>
                    </div>
                    <div className="date py-md mt-auto flex px-sm justify-between items-center  h-auto   border-t border-border-primary">
                    <Button children={"Create"} onClick={handleCreate} className="primary-btn w-[76px] h-[32px] bg-primary-base text-white rounded-md border hover:bg-primary-hover"/>
                    <Button children={"Cancel"} onClick={() => {handleCategoryCancel()}} className="primary-btn w-[76px] h-[32px] bg-warning-base text-white rounded-md border hover:bg-warning-hover"/>
                    </div>
                </div>
    </div>
  )
}
const CreateSubCategory = ({ handleSubCategoryCancel }) => {
  const dispatch = useDispatch();

  const { mainCategories } = useSelector((state) => state.category);
  const [subCategory, setSubCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("");

useEffect(() => {
  if (!mainCategories || mainCategories.length === 0) {
    
    dispatch(getMainCategories());
  }
}, []);


  const handleCreate = () => {
    if (!subCategory || !parentCategory) return;

    dispatch(
      createSubCategory({
        name: subCategory,
        mainCategoryId: parentCategory, // main category id
      })
    );

    handleSubCategoryCancel();
  };

  return (
    <div className="flex absolute top-0 left-0 z-50 bg-black/40 items-center justify-center w-full h-screen">

      <div className="totalSales w-[400px] border border-border-primary rounded-md bg-white">

        <div className="con flex flex-col gap-sm p-lg">
          <div className="t-sale text-text-description">
            <p>Create Sub Category</p>
          </div>

          {/* Main Category Select */}
          <select
            className="border border-border-primary rounded-md px-sm py-xs"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">Select Main Category</option>
            {mainCategories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sub Category Input */}
          <Input
            type="text"
            placeholder="Sub Category Name"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </div>

        <div className="date py-md mt-auto flex px-sm justify-between items-center border-t border-border-primary">
          <Button
            children="Create"
            onClick={handleCreate}
            className="primary-btn w-[76px] h-[32px] bg-primary-base text-white rounded-md hover:bg-primary-hover"
          />
          <Button
            children="Cancel"
            onClick={handleSubCategoryCancel}
            className="primary-btn w-[76px] h-[32px] bg-warning-base text-white rounded-md hover:bg-warning-hover"
          />
        </div>

      </div>
    </div>
  );
};


const CategoryPage = () => {
  const dispatch = useDispatch();
  const {loading,mainCategories,subCategories} = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
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
const [isCreate,setIsCreate] = useState(false);

 const mode =
  currentPath === "/categories/main"
    ? "main"
    : "submain";

const handleFilterChange = (filter) => {
  if (filter!==selectedFilter) {
  }
  setSelectedFilter(filter);
};

useEffect(() => {
  
  const payload = { search: debouncedSearch};  
  switch(mode) {
    case "main":search===debouncedSearch&& dispatch(getMainCategories(payload)); break;
    case "submain": search===debouncedSearch&& dispatch(getSubCategories(payload)); break;
  }
  
  console.log(subCategories);
// search===debouncedSearch&& dispatch(getMainCategories(payload));
}, [mode, debouncedSearch,search, dispatch]);



const handleEdit=(id,name)=>{
  setCategoryName(name)
setEditId(id)
}

const handleSave=(id)=>{
  // dispatch update product action
  switch(mode){
    case "main": dispatch(updateMainCategory({id,name:categoryName})); break;
    case "submain":dispatch(updateSubCategory({id,name:categoryName}));  break;
  }
 
  setEditId(null);
}

const handleCancel=()=>{
  setEditId(null);
}
const handleKeyDown = (e) => {    
  if (e.key === 'Enter') {
  }
};

const handleDelete=(id)=>{
  switch(mode){
    case "main": dispatch(deleteMainCategory(id)); break;
    case "submain": dispatch(deleteSubCategory(id));  break;
  }
}

const handleCategoryCancel = () => {
  setIsCreate(false);
}

const columns = {
  main: [
    { key: "id", label: "ID", width: "minmax(100px,1fr)" },
    { key: "category", label: "Category Name", width: "minmax(200px,1fr)" },
    { key: "action", label: "Action", width: "minmax(170px,1fr)" },
  ],
  submain: [
    { key: "id", label: "ID", width: "minmax(100px,1fr)" },
    { key: "category", label: "Category Name", width: "minmax(200px,1fr)" },
    { key: "subCategory", label: "SubCategory Name", width: "minmax(200px,1fr)" },
    { key: "action", label: "Action", width: "minmax(170px,1fr)" },
  ],
};
const gridTemplate = columns[mode]
  .map(col => col.width)
  .join(" ").trim();

const dataSource = (() => {
  switch (mode) {
    case "main":      
      return mainCategories; ;

    case "submain":    
      return subCategories ; // Redux slice for seller
  }
})();


 
return (
    <section className="flex justify-center relative">
      {isCreate && mode === "main" && <CreateCategory handleCategoryCancel={handleCategoryCancel}/>}
      {isCreate && mode === "submain" && <CreateSubCategory handleSubCategoryCancel={handleCategoryCancel}/>}
      <div className="container max-w-screen-xl  lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">
        <div className="top-menu flex justify-between items-center">
        <div className="title ">
          <h4>{mode === "main" ? "Main" : "SubMain"} Categories</h4>
          <p>Manage All Categories</p>
        </div>
      
       <Button children={"Create"} onClick={() => {setIsCreate(true)}} className="primary-btn w-[76px] h-[32px] bg-primary-base text-white rounded-md border hover:bg-primary-hover"/>
        </div>

        <div className="filter flex justify-between border border-border-primary rounded-md bg-white">
         
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
            dataSource?.map((category,index)=>(
               <div
    key={category._id}
    className={`body h-[72px] grid  items-center bg-[#00000005]`}
  style={{ gridTemplateColumns: gridTemplate }}
 >
              <div className="id border pl-[10px] min-w-[100px] flex items-center border-border-primary h-full" >{category._id.slice(0,12)}</div>
               <div className="name border text-text-secondary gap-xs  pl-[10px] min-w-[200px] flex items-center border-border-primary h-full" >
             {
              mode==="main"&& editId===category._id?<Input type="text" placeholder="Category Name" onChange={(e) => {setCategoryName(e.target.value)}} value={categoryName} />: mode==="main"? category.name:category.mainCategoryId.name
             }
                </div>
              {mode==="submain"&& <div className="name border text-text-secondary gap-xs  pl-[10px] min-w-[200px] flex items-center border-border-primary h-full" >
             {
              mode==="submain"&& editId===category._id?<Input type="text" placeholder="Category Name" onChange={(e) => {setCategoryName(e.target.value)}} value={categoryName} />: category.name
             }
                </div>}
              
             
               <div className="action border pl-[10px] min-w-[170px] flex gap-sm items-center border-border-primary h-full" >{editId===category._id? <Button children="Save" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleSave(category._id)} />: <Button children="Edit" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleEdit(category._id,category.name)} />} {editId===category._id? <Button children="Cancel" className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleCancel()} />:<Button children="Delete" className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleDelete(category._id)} />}</div>
                 
              </div>
            ))
          }    
         
        </div>
        {/* Pagination */}
        {dataSource?.length === 0 ? "" :
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

}

export default CategoryPage