import React from 'react'
import {Button,addItemToCart,removeItemFromWishlist} from "../index";
import {useSelector,useDispatch} from "react-redux"
import {CloseOutlined, ShoppingCartOutlined} from "@ant-design/icons"


const WishlistPage = () => {
  
  const dispatch = useDispatch()
  const {wishlist,loading} = useSelector(state=>state.wishlist)
  const {user} = useSelector(state=>state.auth)
const handleAddToCart=(item)=>{
  console.log(item);
  
  dispatch(addItemToCart({productId:item?._id,quantity:1,unitPrice: item?.discountPrice ? item?.discountPrice : item.unitPrice,userId:user._id}))
}

const handleRemoveItem=(id)=>{
  dispatch(removeItemFromWishlist({productId:id,userId:user._id}))
}


  return (
    <section className='grid place-items-center '>

    <div className="container place-items-center lg:place-items-stretch  grid md:gap-xxl md:p-xxl gap-md py-p-xxl px-p-md">
    

      <div className="title">
        <h2>WhishList</h2>
      </div>


    <div className="cartItems w-full grid place-items-center sm:place-items-stretch   gap-xxl">
      <div className="sm:grid hidden px-xl grid-cols-5 place-items-center">
        <div className="product">Product Image</div>
        <div className="P-name">Product Name</div>
        <div className="price">Price</div>
        <div className="quantity">Add</div>
        <div className="remove">Remove</div>
      </div>
    
  {loading ? <p>Loading</p>: wishlist?.item?.map((item)=>(
 <div key={item._id} className="productItem  shadow-secondary place-items-center max-w-[300px] sm:max-w-full gap-xs px-p-sm py-p-lg sm:p-p-lg md:px-p-lg md:py-p-sm rounded-md  grid sm:grid-cols-5">
   
 <div className="img w-full  aspect-square"><figure><img src={item.productId.img} alt="img" className='w-full h-full'/></figure></div>
 
 
 
 <div className="name"><p>{item.productId.name}</p></div>


 <div className="price">Rs. {item?.productId?.discountPrice ? item?.productId?.discountPrice : item?.productId?.unitPrice}</div>
 <div className="addToCart cursor-pointer" onClick={()=>handleAddToCart(item.productId)}><ShoppingCartOutlined /></div>
 <div className="remove ml-xs cursor-pointer" onClick={()=>handleRemoveItem(item.productId._id)}><CloseOutlined /></div>

 </div>
  ))}   
    </div>


    </div>

   </section>
  )
}

export default WishlistPage