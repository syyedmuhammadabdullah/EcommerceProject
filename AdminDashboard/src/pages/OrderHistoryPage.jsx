import React, { useEffect, useState } from "react";
import { Link,useLocation,useParams } from "react-router-dom";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button,getCustomerOrders,getAllOrders,useDebouncedHook, getSellerOrders } from "../index";
import { useSelector,useDispatch } from "react-redux";

const OrderHistoryPage = () => {
  const { orders,totalOrders,customerOrders,sellerOrders, }= useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] =useState("all");
  const filters = ["All", "Delivered", "Rejected", "Refunded", "Failed", "Shipped", "Pending"];
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedHook(search,500);
  const location = useLocation();
  const currentPath = location.pathname;
  const params =new URLSearchParams(location.search);
  const userId = params?.get("userId");
  const sellerId = params?.get("sellerId");
  const customerName=params?.get("customerName")
  const storeName=params?.get("storeName")
    const mode =
  currentPath === "/order-history"
    ? "all"
    : currentPath.startsWith("/orders/customer")
    ? "customer"
    : "seller";


useEffect(() => {
  const payload = { search: debouncedSearch, filter: selectedFilter };  
  switch(mode) {
    case "all": (orders?.length === 0 ||search===debouncedSearch )&& dispatch(getAllOrders(payload)); break;
    case "customer": (customerOrders?.length === 0 ||search===debouncedSearch || userId!==customerOrders.userId)&& dispatch(getCustomerOrders({ ...payload, userId })); break;
    case "seller": (sellerOrders?.length === 0 ||search===debouncedSearch || sellerId!==sellerOrders.sellerId) && dispatch(getSellerOrders({ ...payload, sellerId })); break;
  }
}, [mode, debouncedSearch,search, selectedFilter, userId, sellerId, dispatch]);


const dataSource = (() => {
  switch (mode) {
    case "all":      
      return orders;
   
    case "customer":
      return customerOrders?.orders; // Redux slice for customer
  
    case "seller":    
      return sellerOrders?.orders; // Redux slice for seller
  }
})();
  const handleFilterChange = (filter) => {
   if (filter!==selectedFilter) {
     switch (mode) {
      case "all":
        dispatch(getAllOrders({search:debouncedSearch,filter}));
        break;
        case "customer":
        dispatch(getCustomerOrders({userId,filter}));
        break;
        case "seller":
        dispatch(getSellerOrders({filter,sellerId}));
        break;
    }
   }
    setSelectedFilter(filter);
    
  }

  const handleKeyDown = (e) => {    
    if (e.key === 'Enter') {
       switch (mode) {
      case "all":
        dispatch(getAllOrders({search:debouncedSearch}));
        break;
        case "customer":
        dispatch(getCustomerOrders({customer:debouncedSearch,userId }));
        break;
        case "seller":
        dispatch(getSellerOrders({search:debouncedSearch,sellerId}));
        break;
    }
    }
  };




const columns = {
  all: [
    { key: "id", label: "ID", width: "48px" },
    { key: "customer", label: "Customer Name", width: "minmax(389px,1fr)" },
    { key: "seller", label: "Store Name", width: "minmax(389px,1fr)" },
    { key: "items", label: "No. of Products", width: "minmax(137px,1fr)" },
    { key: "amount", label: "Total Amount", width: "minmax(137px,1fr)" },
    { key: "status", label: "Order Status", width: "minmax(137px,1fr)" },
    { key: "action", label: "Action", width: "minmax(150px,1fr)" },
  ],

  customer: [
    { key: "id", label: "ID", width: "48px" },
    { key: "seller", label: "Store Name", width: "minmax(389px,1fr)" },
    { key: "items", label: "No. of Products", width: "minmax(137px,1fr)" },
    { key: "amount", label: "Total Amount", width: "minmax(137px,1fr)" },
    { key: "status", label: "Order Status", width: "minmax(137px,1fr)" },
    { key: "action", label: "Action", width: "minmax(150px,1fr)" },
  ],

  seller: [
    { key: "id", label: "ID", width: "48px" },
    { key: "customer", label: "Customer Name", width: "minmax(389px,1fr)" },
    { key: "items", label: "No. of Products", width: "minmax(137px,1fr)" },
    { key: "amount", label: "Total Amount", width: "minmax(137px,1fr)" },
    { key: "status", label: "Order Status", width: "minmax(137px,1fr)" },
    { key: "action", label: "Action", width: "minmax(150px,1fr)" },
  ],
};
const gridTemplate = columns[mode]
  .map(col => col.width)
  .join(" ").trim();
const Cell = ({ children }) => (
  <div className="border pl-[10px] flex items-center border-border-primary h-full">
    {children}
  </div>
);






  
  return (
    <section className="flex justify-center">
      <div className="container lg:gap-xxl  dark:bg-black grid gap-xl px-p-md lg:p-p-xxl">
        <div className="title">
          <h4>{mode==="all"?"All":mode==="seller"? storeName : customerName} Orders</h4>
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
            <Input placeholder="Search" onKeyDown={(e)=>handleKeyDown(e)} onChange={(e) => setSearch(e.target.value)} value={search} icon={<SearchOutlined  onClick={() => dispatch(getAllOrders({search}))}/>} />
          </div>
        </div>
        <div className="content border border-border-primary rounded-md bg-white w-full overflow-scroll no-scrollbar">

        <div className="data  w-full grid overflow-scroll no-scrollbar">
        
            <div
  className={`head h-[54px] grid  items-center bg-[#00000005]`}
   style={{ gridTemplateColumns: gridTemplate }}
>
  {columns[mode].map(col => (
    <div
      key={col.key}
      className="border pl-[10px] flex items-center border-border-primary h-full"
    >
      {col.label}
    </div>
  ))}
</div>

     
         { dataSource?.map((order, index) => (
  <div
    key={order._id}
    className={`body h-[54px] grid  items-center bg-[#00000005]`}
  style={{ gridTemplateColumns: gridTemplate }}
 >
    
    {columns[mode].map(col => {
      switch (col.key) {
        case "id":
          return <Cell key={col.key}>{index + 1}</Cell>;

        case "customer":
          return <Cell key={col.key}>{order?.userId?.fullName}</Cell>;

        case "seller":
          return <Cell key={col.key}>{order?.sellerId?.storeDetails?.storeName}</Cell>;

        case "items":
          return <Cell key={col.key}>{order.totalItems}</Cell>;

        case "amount":
          return <Cell key={col.key}>{order.totalPrice}</Cell>;

        case "status":
          return <Cell key={col.key}>{order.status}</Cell>;

        case "action":
          return (
            <Cell key={col.key}>
              <Link to={`/order-details/${order._id}`}>
                <Button className="border px-p-md py-p-xxs bg-primary-base text-white hover:bg-primary-hover">View Order</Button>
              </Link>
            </Cell>
          );

        default:
          return null;
      }
    })}
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
