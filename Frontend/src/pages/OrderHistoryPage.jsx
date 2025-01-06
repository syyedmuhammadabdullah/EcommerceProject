import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import { SearchOutlined } from '@ant-design/icons'
import {Button } from "../index";
import { useSelector } from 'react-redux';

const OrderHistoryPage = () => {
 const { orders } = useSelector((state) => state.order);
  return (
    <section className='flex justify-center'>

        <div className="container lg:gap-xxl bg-white grid gap-xl px-p-md lg:p-p-xxl">

            <div className="title">
                <h4>Order history</h4>
            <p>manage your recent orders and invoices</p>
            </div>
        {orders?.length>0 ? <div className="content grid gap-lg">
                        <div className="filter flex justify-between">

                        <div className="options rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex w-fit">
           
               <Button children='All' className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs" />
               <Button children='All' className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs" />
               <Button children='All' className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs" />
               <Button children='All' className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs" />
               <Button children='All' className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs" />
         
                           </div>
                           <div className="search">
                            <Input placeholder="Search" icon={<SearchOutlined/>}/>
                           </div>
                        </div>
            {orders?.map((order) => (
                        <div className="content">
                
                <div className="date mb-xxs mt-lg">Date placed: {order?._id.date}</div>
                                <div className="title grid grid-cols-4 lg:grid-cols-5 border-black border-b bg-[#07010128] py-p-sm">

                                <div className="name py-sm px-xs">Product</div>
                                <div className="name py-sm px-xs">Price</div>
                                <div className="name py-sm px-xs">Amount</div>
                                <div className="name py-sm px-xs">Status</div>
                                <div className="name py-sm px-xs">Detail</div>

                                </div>
                        <div className="productContainer ">

                                {
                                order?.orders?.map((product) =>(
                                        <div className="product border-b-2 grid gap-xs grid-cols-4 lg:grid-cols-5 py-p-xs">
                                    <div className="name py-sm px-xs">{product?.products.name.length>37?product?.products.name.slice(0,37)+"...":product?.products.name}</div>
                                <div className="price py-sm px-xs">$ <span>{product?.products.price}</span></div>
                                <div className="amount py-sm px-xs">{product?.products.quantity}</div>
                                <div className="status py-sm px-xs" >{product?.products?.tracking?.status}</div>
                                <div className="details py-sm px-xs text-primary-base"><Link to={`/user-account/order-detail/${product?.trackingNumber}`} >Track Order</Link></div>    
                                </div>
                                 ))
                                }
                                 </div>

                                
          

                       

                        </div>
                    ))}
                </div> : <div className="empty">No orders found</div>}
                
        </div>

    </section>
  )
}

export default OrderHistoryPage
