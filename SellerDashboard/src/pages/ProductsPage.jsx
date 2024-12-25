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
      <div className="container lg:gap-xxl bg-white grid gap-xl px-p-md lg:p-p-xxl">
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

       
        <div className="data w-full grid gap-lg overflow-scroll no-scrollbar">
          
          <table className="w-[1200px] xl:w-full border-collapse  border-spacing-4 overflow-x-scroll xl:overflow-visible no-scrollbar">
            {/* Table Header */}
            <thead className="heading bg-gray-200">
              <tr className="h-[60px] ">
                <th>Order ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="ProductContainer text-center">
              {
                products?.length === 0 ? <tr ><td className="mt-5" colSpan={7}>No products found</td></tr> :
                products?.map((product) => (
                  <tr className="Product h-[60px] border-b-2" key={product._id}>
                  <td >{product._id.slice(0, 8)}</td>
                  <td width={"200px"}>{product.name.slice(0, 58)}	{product.name.length>58 && "..."}</td>
                  <td>${product.price}</td>
                  <td>{product.currentStock}</td>
                  <td>{product.averageRating}</td>
                  <td>{product.category}</td>
                  <td >
                   <Button children="Edit" onClick={() => handleEdit("","",product)} className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm mr-2 text-white" />
                   <Button children="Delete" onClick={() => handleDelete(product._id)} className="bg-error-base w-fit px-p-md py-p-xxs rounded-sm text-white" />
                  </td>
                </tr>
                ))
              }
            </tbody>
          </table>
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
