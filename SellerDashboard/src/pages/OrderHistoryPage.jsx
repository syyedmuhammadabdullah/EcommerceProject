import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button,getSellerOrders,useDebouncedHook } from "../index";
import { useSelector,useDispatch } from "react-redux";

const OrderHistoryPage = () => {
  const { orders,totalOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] =useState("all");
  const filters = ["All", "Delivered", "Rejected", "Returned",, "Failed", "Shipped", "Pending"];
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedHook(search,500);

  useEffect(() => {
    dispatch(getSellerOrders({search:debouncedSearch}));
  }, [debouncedSearch]);

  useEffect(() => {
    if (orders.length==0) {      
      dispatch(getSellerOrders({}));
    }
  }, []);
  const handleFilterChange = (filter) => {
   if (filter!==selectedFilter) {
     dispatch(getSellerOrders({filter}));
   }
    setSelectedFilter(filter);
    
  }

  const handleKeyDown = (e) => {    
    if (e.key === 'Enter') {
      dispatch(getSellerOrders({debouncedSearch}));
    }
  };

  
  return (
    <section className="flex justify-center">
      <div className="container lg:gap-xxl  dark:bg-black grid gap-xl px-p-md lg:p-p-xxl">
        <div className="title">
          <h4>Orders</h4>
          <p>manage your recent orders and invoices</p>
        </div>
        <div className="filter bg-white border border-border-primary rounded-md flex justify-between">
          <div className="options rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex w-fit">
            {filters.map((filter,index) => (
              <Button key={index}
                children={filter}
                onClick={() => handleFilterChange(filter.toLowerCase())}
                className={`option hover:bg-primary-hover hover:text-white ${selectedFilter === filter.toLowerCase() ? "bg-primary-base text-white" : "text-black"}  text-center  border-[#00000026] border px-p-md py-p-xxs`}
              />
            ))}
          </div>
          <div className="search">
            <Input placeholder="Search" onKeyDown={(e)=>handleKeyDown(e)} onChange={(e) => setSearch(e.target.value)} value={search} icon={<SearchOutlined  onClick={() => dispatch(getSellerOrders({search}))}/>} />
          </div>
        </div>
        <div className="content border border-border-primary rounded-md bg-white w-full overflow-scroll no-scrollbar">

        <div className="data  w-full grid overflow-scroll no-scrollbar">
        
            <div className="head h-[54px] grid grid-cols-[48px_minmax(389px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(111px,_1fr)] items-center bg-[#00000005]">
           <div className="id border pl-[10px] w-[48px] flex items-center border-border-primary h-full" >ID</div>
           <div className="name border pl-[10px] min-w-[389px] flex items-center border-border-primary h-full" >Customer Name</div>
           <div className="stock border pl-[10px] min-w-[137px] flex items-center border-border-primary h-full" >No. of Products</div>
           <div className="price border pl-[10px] min-w-[137px] flex items-center border-border-primary h-full" >Total Amount</div>
           <div className="price border pl-[10px] min-w-[137px] flex items-center border-border-primary h-full" >Order Status</div>
           <div className="action border pl-[10px] min-w-[111px] flex items-center border-border-primary h-full" >Action</div>
          </div>
         {orders?.map((order,index)=>(
            <div key={order._id} className="body grid grid-cols-[48px_minmax(389px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(111px,_1fr)] items-center  h-[72px]  ">
            <div className="id border pl-[10px] w-[48px] flex items-center border-border-primary h-full" >{index+1}</div>
             <div className="name border text-text-secondary gap-xs pl-[10px] min-w-[389px] flex items-center border-border-primary h-full" >
              {order?.userId?.fullName}
              </div>
             <div className="stock border pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-border-primary h-full" >{order.totalItems}</div>
             <div className="price border pl-[10px] min-w-[137px] flex items-center border-border-primary h-full" >{order.totalPrice}</div>
             <div className="price border pl-[10px] min-w-[137px] flex items-center border-border-primary h-full" >{order.status}</div>
             <div className="action border pl-[10px] min-w-[111px] flex items-center border-border-primary h-full" >
             <Link to={`/order-details/${order._id}`}>
                <Button
                  children="View Order"
                  className="option  text-black text-center border-border-primary border px-p-md py-p-xxs" />
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
