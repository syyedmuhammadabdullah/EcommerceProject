import React,{useEffect, useRef,useState} from 'react'
import {ProductContainer} from "../index"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const ProductPage = () => {
const [pageNum,setPageNum]=useState(1)
const [data,setData]=useState([])
const [limit,setLimit]=useState(10)
const navigat=useNavigate()


useEffect(()=>{

  axios.get(`http://localhost:3001/api/v1/products/getProducts?page=${pageNum}&limit=${limit}`)
  .then(res=>{
    console.log(res.data.data);
    
    setData(res.data.data)

  })
  .catch(err=>{
    console.log(err)
  })

},[])
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