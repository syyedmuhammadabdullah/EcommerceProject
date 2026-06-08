import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import {Button,CopyToClipboard,Input, Pagnination,getOrders } from "../index";
import { useDispatch, useSelector } from 'react-redux';

const OrderHistoryPage = () => {
 const { orders, loading, error, totalOrders } = useSelector((state) => state.order);
const [currentPage, setCurrentPage] = useState(1);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getOrders({ page: currentPage, limit: 5 }));
  }, [dispatch, currentPage]);

const handlePageChange=(page)=>{
    if (currentPage===page)return;
    setCurrentPage(page);
    dispatch(getOrders({page,limit:5}))
}
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
                            <div className="logo h-[50px] w-[50px] rounded-full border border-border-primary"><img className='rounded-full w-full h-full' src={order?.sellerId?.storeDetails?.storeLogo} alt="" /></div>
                            <div className="name">{order?.sellerId?.storeDetails?.storeName}</div>
                        </div>

                        <div key={order._id} className="order-details mt-md">

                            <div className="order-info flex-col lg:flex-row gap-md flex justify-between items-center border-b py-p-md border-border-primary">
                                <div className="date">
                               <CopyToClipboard text={order.trackingNumber}>
                                <div className="trackingNumber flex items-center gap-xs">
                                    <span className='text-text-secondary'>Tracking Number: </span> <span className='relative'>{order.trackingNumber}</span> </div>
                               </CopyToClipboard>
                                <p className='text-text-secondary '>Order Date: {new Date(order?.orderDate).toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })} </p>
                                </div>
                                <div className="manage">
                                <Link to={`/user-account/order-detail/${order._id}`}>
                                    <Button children="Manage Order" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" />
                                </Link>
                                </div>
                            </div>
                            {order?.products?.map((product) => (
                                 <div key={product.productId} className="product flex-col lg:flex-row items-center lg:items-start flex gap-md border border-border-primary bg-white  py-p-md">
                                 <div className="basic flex-col lg:flex-row flex gap-md">
         
                                 <div className="img h-[150px] w-[150px] bg-red-100"><img className='w-full h-full' src={product?.image} alt="" /></div>
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

              <Pagnination totalItems={totalOrders} currentPage={currentPage} limit={5} onPageChange={handlePageChange} />
             


                </div>

            </div>
                
        </div>

    </section>
  )
}

export default OrderHistoryPage
