import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import { SearchOutlined } from '@ant-design/icons'
import {Button } from "../index";
import { useSelector } from 'react-redux';

const OrderHistoryPage = () => {
 const { orders } = useSelector((state) => state.order);
 useEffect(() => {
    console.log(orders);
  }, [orders]);
    
  return (
    <section className='flex justify-center '>

        <div className="container lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">

            <div className="title">
                <h4>Order history</h4>
            <p>manage your recent orders and invoices</p>
            </div>

            <div className="data ">
                <div className="title mb-md">
                    <h5>Orders</h5>
                </div>
                <div className="orders flex flex-col gap-xl">

                {
                    orders?.map((order) => (
                        <div key={order._id} className="order  bg-white border border-border-primary p-p-lg rounded-md">

                        <div className="seller border-b py-p-md border-border-primary flex items-center gap-xs ">
                            <div className="logo h-[50px] w-[50px] rounded-full border border-border-primary">{order?.sellerId?.storeDetails?.storeLogo}</div>
                            <div className="name">{order?.sellerId?.storeDetails?.storeName}</div>
                        </div>
        
                        <div className="order-details mt-md">
        
                            <div className="order-info flex-col lg:flex-row gap-md flex justify-between items-center border-b py-p-md border-border-primary"> 
                                <div className="date">
                                <p className='text-md'>Order Id: #{order._id}</p>
                                <p className='text-text-secondary '>Order Date: {order?.orderDate} </p>
                                </div>
                                <div className="manage">
                                <Link to="/order-details">
                                    <Button children="Manage Order" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" />
                                </Link>
                                </div>
                            </div>
                            {order?.products?.map((product) => (
                                 <div className="product flex-col lg:flex-row items-center lg:items-start flex gap-md border border-border-primary bg-white  py-p-md">
                                 <div className="basic flex-col lg:flex-row flex gap-md">
         
                                 <div className="img h-[150px] w-[150px] bg-red-100"><img src={product?.image} alt="" /></div>
                                 <div className="name  sm:w-[200px] h-[150px] overflow-hidden">{product?.name} </div>
                                 </div>
                                 <div className="additional items-center lg:items-start flex-col lg:flex-row flex gap-md lg:justify-between px-md w-full">
                                 <div className="quantity"><span className='text-text-secondary'>Quantity:</span> {product?.quantity}</div>
                                 <div className="status">{order?.status}</div>
                                 <div className="deliveryDate"><span className='text-text-secondary'>Delivery Date:</span></div>
                                 </div>
         
         
                             </div>
                            ))}
                           
        
        
        
                            </div>
                        </div>
                    ))
                }

             


                </div>

            </div>
                
        </div>

    </section>
  )
}

export default OrderHistoryPage
