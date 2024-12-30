import { StarFilled } from '@ant-design/icons'
import React,{forwardRef} from 'react'
import {StarRating} from "../index"

const ProductContainer = forwardRef(({
id,
name,
rating,
discountedPrice,
originalPrice,
img,
onClick=()=>{}
},ref) => {

  return (
   <div className="ProductItem  p-p-md shadow-secondary w-[234px] grid gap-sm h-[320px]  cursor-pointer"key={id} id={id} ref={ref} onClick={(e)=>onClick(e)}>
    <div className="productImg w-[200px]  h-[170px]">
       
            <img className='w-full h-full' src={img ? img:"https://via.placeholder.com/200x170"} alt="img" />
     
    </div>

    <div className="productContent  max-w-[200px]">
       <div className="rating flex gap-xxs">
        <div className="stars ">
          <StarRating rating={rating}/>
{/* 
        <StarFilled className='text-yellow-300'/>
        <StarFilled className='text-yellow-300'/>
        <StarFilled className='text-yellow-300'/>
        <StarFilled className='text-yellow-300'/>
        <StarFilled className='text-yellow-300'/> */}
        </div>
        <div className="total">{rating?rating:0}</div>
       </div>
       <div className="p-Name"><p>{name? name?.length> 70 ? name.slice(0,70)+"...":name:"Product Name tuyt hfhjfyj hjfyjr hjrfuyjruy hjfdyjreyu yhjdty"} </p></div>

       <div className="p-Price flex mt-xs gap-xxs">
        <div className="discounted-Price">Rs {discountedPrice?discountedPrice:100}</div>
        <div className="Original-Price line-through text-icon-default">Rs {originalPrice?originalPrice:120}</div>
       
       </div>

    </div>

   </div>
  )
})

export default ProductContainer