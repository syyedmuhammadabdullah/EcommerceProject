import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button,getSellerOrders } from "../index";
import { useSelector,useDispatch } from "react-redux";

const OrderHistoryPage = () => {
  const { orders,totalOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("orders", orders);
    dispatch(getSellerOrders());
  }, []);
  return (
    <section className="flex justify-center">
      <div className="container lg:gap-xxl bg-white grid gap-xl px-p-md lg:p-p-xxl">
        <div className="title">
          <h4>Orders</h4>
          <p>manage your recent orders and invoices</p>
        </div>
        <div className="filter flex justify-between">
          <div className="options rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex w-fit">
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
          </div>
          <div className="search">
            <Input placeholder="Search" icon={<SearchOutlined />} />
          </div>
        </div>
        <div className="content w-full overflow-scroll no-scrollbar">

        <div className="data w-full grid overflow-scroll no-scrollbar">
        <div className="head grid grid-cols-[48px_389px_137px_137px_137px_137px] h-[54px] items-center bg-[#00000005]">
           <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >No.</div>
           <div className="name border pl-[10px] w-[389px] flex items-center border-[#0000000f] h-full" >Customer Name</div>
           <div className="stock border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >No. of products</div>
           <div className="price border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >Total Amount</div>
           <div className="price border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >Order Status</div>
           <div className="action border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >Action</div>
          </div>
          {orders?.length && orders?.map((order,index) => (
    
              <div key={order.productId} className="body grid grid-cols-[48px_389px_137px_137px_137px_137px] items-center  h-[72px]  ">
              <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >{index+1}.</div>
               <div className="name border text-text-secondary gap-xs pl-[10px] w-[389px] flex items-center border-[#0000000f] h-full" >
                {order?.userId?.fullName}
                </div>
               <div className="stock border pl-[10px] w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >
               <p>{order.totalItems}</p>
               </div>
               <div className="price border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >{order?.totalPrice}</div>
               <div className="price border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >{order?.status}</div>
               <div className="action border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >
               <Link to={`/order-details/${order._id}`}>
                <Button
                  children="View Order"
                  className="option  text-black text-center border-[#00000026] border px-p-md py-p-xxs" />
                </Link>
               </div>
                 
              </div>
               
          ))}
          
        </div>
        <div className="pagination flex gap-xs">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
        </div>
      </div>
    </section>
  );
};

export default OrderHistoryPage;
