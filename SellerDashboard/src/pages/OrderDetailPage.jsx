import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Button,getOneSellerOrder,SelectMenu,updateOrderStatus,updateItemStatus, Input, CheckBox,packProduct, reviewProducts } from '../index.js';
import { CloseCircleOutlined } from '@ant-design/icons';
const OrderDetailPage = () => {
    const dispatch = useDispatch();
    const {loading,error,order}=useSelector(state=>state.order)
    const {orderId}=useParams();
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus);
    const [editMode, setEditMode] = useState(false);
   const [selectedItems, setSelectedItems] = useState([]);
    const [itemId, setItemId] = useState("");
    const [refundStatus, setRefundStatus] = useState(order?.refundStatus);
    
    const grid=order.status==="pending"?"48px minmax(389px, 1fr) minmax(137px, 1fr) minmax(137px, 1fr) minmax(137px, 1fr) minmax(111px, 1fr) minmax(111px, 1fr)":"48px minmax(389px, 1fr) minmax(137px, 1fr) minmax(137px, 1fr) minmax(137px, 1fr) minmax(111px, 1fr)";

    useEffect(() => {
        console.log(selectedItems);
        
    },[selectedItems,setSelectedItems])
    useEffect(() => {
        dispatch(getOneSellerOrder(orderId))
    }, [orderId,dispatch]);

    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    }
    
    const handleAcceptItems= () => {
        if(selectedItems.length===0) return;
        dispatch(reviewProducts({orderId,items:selectedItems,action:"accepted"}))
        setSelectedItems([]);
    }
    const handleDeclineItems= () => {
        if(selectedItems.length===0) return;
        dispatch(reviewProducts({orderId,items:selectedItems,action:"rejected"}))
        setSelectedItems([]);
    }
    const handlePackOrder=()=>{
        dispatch(packProduct({orderId}))
    }


  return (
    <section className='flex justify-center'>
    <div className="container flex flex-col gap-xxl py-p-xxl px-p-xl sm:p-xxl">
        <div className="content flex justify-between items-center">
         <div className="heading"><h3>Order Detail</h3> </div>

         <div className="btns">
             {order.status==="pending"&&<><Button onClick={handleAcceptItems} children={`Accept ${selectedItems?.length}`} className="bg-primary-base mr-xs w-fit px-p-md py-p-xxs rounded-sm text-white" /> <Button onClick={handleDeclineItems} children={`Decline ${selectedItems?.length}`} className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" /></> }
            {order.status==="processing"&& <Button children='Mark As Pack' className='bg-primary-base px-xxl py-xs rounded-md text-white' onClick={handlePackOrder}/>}
            </div>            
        </div>

    <div className="item grid gap-lg">
    <div className="cutomer ">
    <div className="customerTitle h-[56px] items-center flex justify-between border-b border-[#0000000F]">
        <h4>Customer</h4>
        <p>Order placed: {new Date(order.orderDate).toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}</p>
    </div>
    <div className="Contact-details flex gap-lg h-[62px] items-center ">
    <p>Name: <span className='ml-xs'>{order?.userId?.fullName}</span></p>
    <p>Phone: <span className='ml-xs'>{order?.userId?.phone}</span></p>
    <p>Email: <span className='ml-xs'>{order?.userId?.email}</span></p>
    </div>
    </div>

    <div className="payment flex md:gap-xxl flex-col md:flex-row gap-xs md:items-center">

        <div className="paymentTitle">
            <h4>Payment</h4>
        </div>

            <div className="orderStatus flex gap-xs ">
                <p>Order Status:</p>
                <p>{order?.status}</p>
            </div>
            <div className="orderStatus flex gap-xs ">
                <p>Fullfillment Status:</p>
                <p>{order?.shipmentStatus}</p>
            </div>

        <div className="paymentStatus flex gap-xs">
            <p>Payment status:</p>
            <p>{order?.paymentStatus}</p>
        </div>
    </div>

    <div className="paymentOptions grid md:grid-cols-2 gap-4">

    <div className="paymentMethod flex flex-col w-full gap-xs">

        <div className="title">
            <h5>Payment method</h5>
        </div>

        <div className="method flex gap-xs">
            <p className='text-[#000000a6]'>Payment By:</p>
            <p>{order?.paymentMethod}</p>
        </div>

        {order?.paymentMethod!=="cod" &&
            
            <div className="transcationId flex gap-xs">
            <p className='text-[#000000a6]'>Transcaion id:</p>
            <p>{order?.paymentId}</p>
        </div>
        }
       
        <div className="price flex gap-xs">
            <p className='text-[#000000a6]'>Amount:</p>
            <p>RS {order?.totalPrice}</p>
        </div>
    </div>

    <div className="shippingtMethod flex flex-col w-full gap-xs">

        <div className="title">
            <h5>Shipping method</h5>
        </div>

        <div className="method flex gap-xs">
            <p className='text-[#000000a6]'>Courier:</p>
            <p>{order?.courier}</p>
        </div>

        <div className="transcationId flex gap-xs">
            <p className='text-[#000000a6]'>Tracking Number:</p>
            <p>{order?.trackingNumber}</p>
        </div>
        <div className="price flex gap-xs">
            <p className='text-[#000000a6]'>Date:</p>
            <p>{new Date(order.orderDate).toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}</p>
        </div>
    </div>

    </div>
    <div className="shippingOptions grid md:grid-cols-2 gap-4">

    <div className="shippingAddress flex flex-col w-full gap-xs">

        <div className="title">
            <h5>Shipping Address</h5>
        </div>

        <div className="full-name flex gap-xs">
            <p className='text-[#000000a6]'>First Name:</p>
            <p>{order.shippingAddress?.fullName}</p>
        </div>
        
        <div className="Country flex gap-xs">
            <p className='text-[#000000a6]'>Country:</p>
            <p>{order?.shippingAddress?.country}</p>
        </div>

        <div className="state flex gap-xs">
            <p className='text-[#000000a6]'>State:</p>
            <p>{order?.shippingAddress?.state}</p>
        </div>

        <div className="city flex gap-xs">
            <p className='text-[#000000a6]'>City:</p>
            <p>{order?.shippingAddress?.city}</p>
        </div>

        <div className="address flex gap-xs">
            <p className='text-[#000000a6]'>Address:</p>
            <div>

            <p>{order?.shippingAddress?.addressOne}</p>
            <p>{order?.shippingAddress?.addressTwo}</p>
            </div>
        </div>

        <div className="postalCode flex gap-xs">
            <p className='text-[#000000a6]'>Postal code:</p>
            <p>{order?.shippingAddress?.postalCode}</p>
        </div>

        <div className="phone flex gap-xs">
            <p className='text-[#000000a6]'>Phone:</p>
            <p>{order?.shippingAddress?.phone}</p>
        </div>

    </div>
    <div className="billingAddress flex flex-col w-full gap-xs">

        <div className="title">
            <h5>Billing Address</h5>
        </div>

        <div className="f-name flex gap-xs">
            <p className='text-[#000000a6]'>First Name:</p>
            <p>{order?.billingAddress?.fullName}</p>
        </div>
        
        <div className="Country flex gap-xs">
            <p className='text-[#000000a6]'>Country:</p>
            <p>{order?.billingAddress?.country}</p>
        </div>

        <div className="state flex gap-xs">
            <p className='text-[#000000a6]'>State:</p>
            <p>{order?.billingAddress?.state}</p>
        </div>

        <div className="city flex gap-xs">
            <p className='text-[#000000a6]'>City:</p>
            <p>{order?.billingAddress?.city}</p>
        </div>

        <div className="address flex gap-xs">
            <p className='text-[#000000a6]'>Address:</p>
            <div>

            <p>{order?.billingAddress?.addressOne}</p>
            <p>{order?.billingAddress?.addressTwo}</p>
            </div>
        </div>

        <div className="email flex gap-xs">
            <p className='text-[#000000a6]'>Postal code:</p>
            <p>{order?.billingAddress?.postalCode}</p>
        </div>

        <div className="phone flex gap-xs">
            <p className='text-[#000000a6]'>Phone:</p>
            <p>{order?.billingAddress?.phone}</p>
        </div>

    </div>
    </div>



    {/* </div> */}


    <div  className="data w-full grid overflow-scroll no-scrollbar">
    <div style={{
  gridTemplateColumns:grid
    
}}
     className="head h-[54px] grid  items-center bg-[#00000005]">
           <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >ID</div>
           <div className="name border pl-[10px] min-w-[389px] flex items-center border-[#0000000f] h-full" >Product Name</div>
           <div className="stock border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Quantity</div>
           <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Price</div>
           <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Total</div>
           <div className="action relative border pl-[10px] min-w-[111px] flex items-center border-[#0000000f]  h-full" >Status</div>
         {order.status==="pending"&&  <div className="action relative border pl-[10px] min-w-[111px] flex items-center border-[#0000000f]  h-full" >Select</div> }
          
          </div>
         {order?.products?.map((product,index)=>(
            <div key={product.productId} style={{gridTemplateColumns:grid}} className="body grid  items-center  h-[72px]  ">
            <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >{index+1}</div>
             <div className="name border text-text-secondary gap-xs text-sm pl-[10px] min-w-[389px] flex items-center border-[#0000000f] h-full" >
             <div className="img w-[40px] h-[40px]">
             <img src={product?.image} alt=""  className="w-full h-full"/>
             </div>
             <div className="name">
              <p>{product?.name?.length>40?product?.name?.slice(0,40)+"...":product?.name}</p>
             <p>in {product?.category}</p>
             </div>
              </div>
             <div className="stock border pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >{product.quantity}</div>
             <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{product.priceAtPurchase}</div>
             <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{product.priceAtPurchase*product.quantity}</div>
             <div className="action relative border pl-[10px] min-w-[111px] flex items-center border-[#0000000f] h-full" >{product.status}</div>
             {product.status==="pending" &&<div className="action relative border pl-[10px] min-w-[111px] flex items-center border-[#0000000f] h-full" ><CheckBox className='outline-none' id={product.productId} isChecked={selectedItems?.includes(product.productId)} onChange={()=>handleSelectItem(product.productId)} /></div>}
               
            </div>
         ))}
              
           
         
       
    
       
    </div>
    <div className="price ml-auto flex flex-col gap-sm w-[250px]">
      <div className="subtotal flex justify-between"><span>Total</span><span>{order?.totalPrice}</span></div>
    </div>

    </div>
    </div>
   </section>
  )
}

export default OrderDetailPage