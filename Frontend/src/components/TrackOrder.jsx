import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TrackOrder = () => {
    const {trackedOrder,error}=useSelector(state=>state.order)
    const [formattedDate,setFormattedDate]=useState("loading...")

    useEffect(() => {
        if (trackedOrder?.createdAt) { // Check if createdAt exists
          const createdAt = new Date(trackedOrder.createdAt);
          if (!isNaN(createdAt)) { // Ensure the date is valid
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }).format(createdAt);
            setFormattedDate(formattedDate);
          }
        }
      }, [trackedOrder]);
    return (
        <section className='flex justify-center'>
        <div className="container flex flex-col gap-xxl py-p-xxl px-p-xl sm:p-xxl">
            <div className="content">
                <h3>Order Detail</h3>
            </div>

        <div className="item grid gap-lg">

        <div className="payment flex md:gap-xxl flex-col md:flex-row gap-xs md:items-center">

            <div className="paymentTitle">
                <h4>Payment</h4>
            </div>

                <div className="orderStatus flex gap-xs ">
                    <p>Fullfillment Status:</p>
                    <p>{trackedOrder?.status}</p>
                </div>

            <div className="paymentStatus flex gap-xs">
                <p>Payment status:</p>
                <p>{trackedOrder?.paymentStatus}</p>
            </div>
        </div>

        <div className="paymentOptions grid md:grid-cols-2 gap-4">

        <div className="paymentMethod flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Payment method</h5>
            </div>

            <div className="method flex gap-xs">
                <p className='text-[#000000a6]'>Payment By:</p>
                <p>{trackedOrder?.paymentMethod}</p>
            </div>

            {
                trackedOrder?.paymentMethod!=="cod"&&
                <div className="transcationId flex gap-xs">
                <p className='text-[#000000a6]'>Transcaion id:</p>
                <p>#67575755</p>
            </div>
            }
           
            <div className="price flex gap-xs">
                <p className='text-[#000000a6]'>Amount:</p>
                <p>RS {trackedOrder?.totalPrice}</p>
            </div>
        </div>

        <div className="shippingtMethod flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Shipping method</h5>
            </div>

            <div className="method flex gap-xs">
                <p className='text-[#000000a6]'>Order Placed:</p>
                <p>{formattedDate}</p>
            </div>

            <div className="transcationId flex gap-xs">
                <p className='text-[#000000a6]'>Transcaion id:</p>
                <p>#67575755</p>
            </div>
            <div className="price flex gap-xs">
                <p className='text-[#000000a6]'>Amount:</p>
                <p>RS 2300</p>
            </div>
        </div>

        </div>
        <div className="shippingOptions grid md:grid-cols-2 gap-4">

        <div className="shippingAddress flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Shipping Address</h5>
            </div>

            <div className="f-name flex gap-xs">
                <p className='text-[#000000a6]'>First Name:</p>
                <p>{trackedOrder?.shippingAddress?.fullName}</p>
            </div>

            <div className="l-name flex gap-xs">
                <p className='text-[#000000a6]'>Last Name:</p>
                <p>{trackedOrder?.shippingAddress?.lastName}</p>
            </div>
            
            <div className="Country flex gap-xs">
                <p className='text-[#000000a6]'>Country:</p>
                <p>{trackedOrder?.shippingAddress?.country}</p>
            </div>

            <div className="state flex gap-xs">
                <p className='text-[#000000a6]'>State:</p>
                <p>{trackedOrder?.shippingAddress?.state}</p>
            </div>

            <div className="city flex gap-xs">
                <p className='text-[#000000a6]'>City:</p>
                <p>{trackedOrder?.shippingAddress?.city}</p>
            </div>

            <div className="address flex gap-xs">
                <p className='text-[#000000a6]'>Address:</p>
                <div>

                <p>{trackedOrder?.shippingAddress?.addressOne}</p>
                <p>{trackedOrder?.shippingAddress?.addressTwo}</p>
                </div>
            </div>

            <div className="email flex gap-xs">
                <p className='text-[#000000a6]'>Postal code:</p>
                <p>{trackedOrder?.shippingAddress?.postalCode}</p>
            </div>

            <div className="phone flex gap-xs">
                <p className='text-[#000000a6]'>Phone:</p>
                <p>{trackedOrder?.shippingAddress?.phone}</p>
            </div>

        </div>
        <div className="billingAddress flex flex-col w-full gap-xs">

            <div className="title">
                <h5>Billing Address</h5>
            </div>

            <div className="f-name flex gap-xs">
                <p className='text-[#000000a6]'>First Name:</p>
                <p>{trackedOrder?.billingAddress?.fullName}</p>
            </div>

            <div className="l-name flex gap-xs">
                <p className='text-[#000000a6]'>Last Name:</p>
                <p>{trackedOrder?.billingAddress?.lastName}</p>
            </div>
            
            <div className="Country flex gap-xs">
                <p className='text-[#000000a6]'>Country:</p>
                <p>{trackedOrder?.billingAddress?.country}</p>
            </div>

            <div className="state flex gap-xs">
                <p className='text-[#000000a6]'>State:</p>
                <p>{trackedOrder?.billingAddress?.state}</p>
            </div>

            <div className="city flex gap-xs">
                <p className='text-[#000000a6]'>City:</p>
                <p>{trackedOrder?.billingAddress?.city}</p>
            </div>

            <div className="address flex gap-xs">
                <p className='text-[#000000a6]'>Address:</p>
                <div>

                <p>{trackedOrder?.billingAddress?.addressOne}</p>
                <p>{trackedOrder?.billingAddress?.addressTwo}</p>
                </div>
            </div>

            <div className="email flex gap-xs">
                <p className='text-[#000000a6]'>Postal code:</p>
                <p>{trackedOrder?.billingAddress?.postalCode}</p>
            </div>

            <div className="phone flex gap-xs">
                <p className='text-[#000000a6]'>Phone:</p>
                <p>{trackedOrder?.billingAddress?.phone}</p>
            </div>

        </div>
        </div>

        <div className="title grid gap-xs overflow-scroll no-scrollbar grid-cols-[40px,1fr,132px,132px,132px]  py-p-sm">

<div className="name py-sm px-xs bg-[#00000005]"></div>
<div className="name py-sm px-xs bg-[#00000005]">Product</div>
<div className="name py-sm px-xs bg-[#00000005]">Price</div>
<div className="name py-sm px-xs bg-[#00000005]">Amount</div>
<div className="name py-sm px-xs bg-[#00000005]">Detail</div>

        {/* </div> */}


        {/* <div className="itemcontainer grid gap-lg"> */}
        {trackedOrder && trackedOrder?.products?.map((product,i)=>(
        // <div className="product border-b-2 items-center grid gap-xs overflow-scroll no-scrollbar grid-cols-[40px,1fr,132px,132px,132px,105px] py-p-xs">
            <React.Fragment key={product._id}>

        <div className="price py-sm px-xs">{i+1}</div>
        <div className="btm mt-sm">
        <div className="name text-base w-full">{product.name?.slice(0, 75)}{product.name?.length > 75 && "..."} </div>
        <div className="sub-Cat text-primary-base text-sm">in Category</div>
   
        </div>
        
         <div className="price py-sm px-xs">$ <span>{product.price}</span></div>
        <div className="amount  py-sm px-xs">{product.quantity}</div>
    
        <div className="details py-sm px-xs text-primary-base"><Link to={`/user-account/order-detail/${product.tracking.trackingNumber}`}>Track Product</Link></div>    
            </React.Fragment>
        // </div>
       ))}
        </div>
        <div className="price ml-auto flex flex-col gap-sm w-[250px]">
          <div className="subtotal flex justify-between"><span>Total</span><span>{trackedOrder?.totalPrice}</span></div>
        </div>

        </div>
        </div>
       </section>
      )
}

export default TrackOrder
