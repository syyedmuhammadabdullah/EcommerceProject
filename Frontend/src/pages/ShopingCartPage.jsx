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
   

    <div className="cartItems w-full grid place-items-center sm:place-items-stretch   gap-xxl">
      

               {cartItems?.items?.map((order) => (
                 <div key={order._id} className="order  bg-white border border-border-primary p-p-lg rounded-md">

                 <div className="seller border-b py-p-md border-border-primary flex items-center gap-xs ">
                     <div className="logo h-[50px] w-[50px] rounded-full border border-border-primary"><img src={order?.sellerId?.storeDetails?.storeLogo} alt="store logo" /></div>
                     <div className="name">{order?.sellerId?.storeDetails?.storeName}</div>
                 </div>
 
                {order?.items?.map((product) => (
                  <div className="order-details mt-md" key={product?._id}>
 
                  
                     
                  <div className="product flex-col lg:flex-row items-center lg:items-start flex gap-md border border-border-primary bg-white  py-p-md">
                  <div className="basic flex-col lg:flex-row flex gap-md">

                  <div className="img h-[150px] w-[150px] bg-red-100"><img src={product?.image} alt="" /></div>
                  <div className="name  sm:w-[200px] h-[150px] overflow-hidden">{product?.name} </div>
                  </div>
                  <div className="additional items-center lg:items-start flex-col lg:flex-row flex gap-md lg:justify-between px-md w-full">
                  <div className="quantity"><span className='text-text-secondary'>Quantity:</span> {product?.quantity}</div>
                  <div className="price"><span className='text-text-secondary'>Price:</span> {product?.unitPrice}</div>
                  <div className="remove"><CloseOutlined onClick={()=>handleRemove(product?.productId)}/></div>
                  </div>
              </div>
             </div>
                ))}
                 
                 </div>
               ))}
                       
                 
            
  
  

    </div>
    
     <div className="summary w-full p-xxl flex flex-col max-w-[440px] h-fit rounded-md gap-xl bg-background-layout">
      <div className="heading"><h3 className='text-lg'>Order Summary</h3></div>
      <div className="price flex flex-col gap-sm">
          <div className="subtotal flex justify-between"><span>Subtotal</span><span>{cartItems?.totalPrice}</span></div>
          <Link to={'/checkout'}>
          <Button className="w-full bg-primary-base rounded-md py-xxs text-white" children='Checkout'/>
          </Link>
        </div>
    </div>
    


    </div>

   </section>
  )
}

export default ShopingCartPage
