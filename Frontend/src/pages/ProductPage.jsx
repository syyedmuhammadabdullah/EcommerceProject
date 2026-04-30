import React,{useEffect, useRef,useState} from 'react'
import {ProductContainer,getProducts,filterProduct} from "../index"
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const ProductPage = () => {
const [pageNum,setPageNum]=useState(1)
const [limit,setLimit]=useState(10)
const navigat=useNavigate()
const dispatch=useDispatch()
const {products,filteredProducts} = useSelector((state) => state.product);
const {category,subCategory}=useParams()

const data=category || subCategory ? filteredProducts : products
useEffect(()=>{  
  console.log(category,subCategory);
  
  if (category || subCategory) {
    dispatch(filterProduct({ category, subCategory, pageNum, limit }));
  } else {
    dispatch(getProducts({ pageNum, limit }));
  }
}, [pageNum, limit,category,subCategory,dispatch]);

  return (
    <section className='grid place-items-center'>
        <div className="container grid justify-center sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  gap-xl md:gap-xxl py-p-xxl px-0 sm:p-xl md:p-xxl">


      {data ? data?.map((item,i)=>(

<ProductContainer onClick={()=>navigat(`/product/${item._id}` , { state: { product: item } })} key={item._id} id={item._id} name={item.name} discountedPrice={item.discountPrice} originalPrice={item.price} img={item.image} rating={item.averageRating} />
)):<p>Loading</p>

}
      

        </div>
    </section>
  )
}

export default ProductPage 