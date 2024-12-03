import React, { useEffect, useState } from 'react'
import {Button,getUserCart,removeItemFromCart, updateCartItem} from "../index"
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const ShopingCartPage = () => {
const {cartItems,loading,error}=useSelector((state)=>state.cart)
const {user} =useSelector(state=>state.auth)

const dispatch=useDispatch()
useEffect(()=>{
 loading && dispatch(getUserCart({userId:user._id}))
},[])

const handleRemove=(id)=>{  
  dispatch(removeItemFromCart({userId:user._id,productId:id}))
}


// useEffect(()=>{
  
// },[quantity])

const handleIncreaseQuantity=(item)=>{
  if (item.quantity<10) {
    
    dispatch(updateCartItem({productId:item.productId,quantity:item.quantity+1,discountPrice:item.discountPrice,unitPrice:item.unitPrice}))
  }
}

const handleDecreaseQuantity=(item)=>{
  if (item.quantity>1) {
    
    dispatch(updateCartItem({productId:item.productId,quantity:item.quantity-1,discountPrice:item.discountPrice,unitPrice:item.unitPrice}))
  }
}




  return (
   <section className='grid place-items-center'>

    <div className="container place-items-center lg:place-items-stretch  grid lg:grid-cols-[2fr_1fr] md:gap-xxl md:p-xxl gap-md py-p-xxl px-p-md">
    
      <div className="title lg:col-span-2">
        <h2>Shopping Cart</h2>
        <p className='text-text-secondary text-md font-semibold'>{cartItems?.items?.length} item(s)</p>
      </div>
    {cartItems?.items?.length==0 && <p className='text-text-secondary text-lg'>Your cart is empty</p>}

    {cartItems?.items?.length>0 && <div className="cartItems w-full grid place-items-center sm:place-items-stretch   gap-xxl">
      <div className="sm:grid hidden px-xl grid-cols-5 place-items-center">
        <div className="product">Product Image</div>
        <div className="P-name">Product Name</div>
        <div className="quantity">Quantity</div>
        <div className="price">Price</div>
        <div className="remove">Remove</div>
      </div>
    
  {loading?<div>Loading...</div>:cartItems?.items?.map((item)=>(
      <div key={item._id} className="productItem shadow-secondary place-items-center max-w-[300px] sm:max-w-full gap-xs px-p-sm py-p-lg sm:p-p-lg md:px-p-lg md:py-p-sm rounded-md  grid sm:grid-cols-5">
   
      <div className="img w-full bg-red-300 aspect-square"><img src={item.image?item.image: "https://help.rangeme.com/hc/article_attachments/360006928633/what_makes_a_good_product_image.jpg"} alt="img" className='w-full h-full'/></div>
      
      
      
      <div className="name"><p>{item.name}</p></div>
      <div className="quantity flex">
        <div className="increment" onClick={()=>handleIncreaseQuantity(item)}><PlusOutlined /></div>
        <div className="quantity">{item.quantity}</div>
        <div className="decrement" onClick={()=>handleDecreaseQuantity(item)}><MinusOutlined /></div>
      </div>
  
      <div className="price">Rs. {item.price}</div>
      <div className="remove ml-xs" onClick={() => {handleRemove(item.productId)}}><CloseOutlined /></div>
  
      </div>
  ))}
  
  

    </div>}
    
    {cartItems?.items?.length>0 && <div className="summary w-full p-xxl flex flex-col max-w-[440px] h-fit rounded-md gap-xl bg-background-layout">
      <div className="heading"><h3 className='text-lg'>Order Summary</h3></div>
      <div className="price flex flex-col gap-sm">
          <div className="subtotal flex justify-between"><span>Subtotal</span><span>{cartItems?.totalPrice}</span></div>
          <Link to={'/checkout'}>
          <Button className="w-full bg-primary-base rounded-md py-xxs text-white" children='Checkout'/>
          </Link>
        </div>
    </div>}
    


    </div>

   </section>
  )
}

export default ShopingCartPage
