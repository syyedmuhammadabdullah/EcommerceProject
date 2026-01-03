import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import {Input, Button, useDebouncedHook,getPendingWithdrawRequest,updateWithdrawRequest, SelectMenu} from '../index'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
const SellerWithdrawRequests = () => {
    const dispatch = useDispatch();
    const {pendingTransactions} = useSelector(state => state.transaction)
    const [editId,setEditId] = useState(null)
    const [status,setStatus] = useState(null)
    const filters = ["All", "Replied", "Unreplied"];
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const debouncedSearch = useDebouncedHook(search,500);
    const handleFilterChange = (filter) => {
        if (filter!==selectedFilter) {
           
        }
        setSelectedFilter(filter);
    };
    useEffect(() => {
       if (search===debouncedSearch) {
        dispatch(getPendingWithdrawRequest({search:debouncedSearch}));
       }
        
        
    },[debouncedSearch,search]);
useEffect(() => {
  console.log(pendingTransactions);
},[pendingTransactions]);

    const handleKeyDown = (e) => {    
        if (e.key === 'Enter') {
          dispatch(getPendingWithdrawRequest({search:debouncedSearch}));
        }
      };
      

const handleEdit=(id)=>{
setEditId(id)
}

const handleSave=(id)=>{
  // dispatch update product action
  dispatch(updateWithdrawRequest({id,status}));
  setEditId(null);
}

const handleCancel=()=>{
  setEditId(null);
}
      
  return (
    <section className="flex justify-center">
    <div className="container lg:gap-xxl grid gap-xl px-p-md lg:p-p-xxl">
      <div className="top-menu">
      <div className="title ">
        <h4>Seller Withdraw Requests</h4>
        <p>Add or manage your withdraw requests</p>
      </div>
     

      </div>

      <div className="filter flex justify-between bg-white border-border-primary border p-p-sm rounded-md">
                <div className="options rounded-md flex-wrap border-border-primary overflow-scroll no-scrollbar flex w-fit">
                  {filters.map((filter,index) => (
                    <Button key={index}
                      children={filter}
                      onClick={() => handleFilterChange(filter.toLowerCase())}
                      className={`option hover:bg-primary-hover hover:text-white ${selectedFilter === filter.toLowerCase() ? "bg-primary-base text-white" : "text-black"}  text-center  border-border-primary border px-p-md py-p-xxs`}
                    />
                  ))}
                </div>
                <div className="search">
                  <Input placeholder="Search"  onChange={(e) => setSearch(e.target.value)} value={search} icon={<SearchOutlined onKeyDown={handleKeyDown} className='cursor-pointer' />} />
                </div>
      </div>
      <div className="content border border-border-primary rounded-md w-full overflow-scroll no-scrollbar">

     
       <div className="data w-full grid overflow-scroll no-scrollbar">
        
        <div className="head h-[54px] grid grid-cols-[200px_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(179px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center bg-[#00000005]">
       <div className="id border pl-[10px] min-w-[200px] flex items-center border-[#0000000f] h-full" >Transaction ID</div>
       <div className="name border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Store Name</div>
       <div className="amount border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Amount</div>
       <div className="status border pl-[10px] min-w-[179px] flex items-center border-[#0000000f] h-full" >Status</div>
       <div className="date border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Date</div>
       <div className="action border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Action</div>
      </div>
     {
       pendingTransactions?.map((item)=>(
         <div key={item._id} className="body grid grid-cols-[200px_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(179px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center  h-[72px]  ">
        <div className="id border text-text-secondary pl-[10px] w-[200px] flex items-center border-[#0000000f] h-full" >{item._id.slice(0,8)}</div>
         <div className="name border text-text-secondary gap-xs pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >
            {item.sellerId.storeDetails.storeName}
          </div>
         <div className="Amount border text-text-secondary gap-xs pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >
          RS  {item.amount}
          </div>
                      <div className="status border pl-[10px] min-w-[179px] flex items-center border-border-primary h-full" >{editId===item._id? <SelectMenu defaultValue={item.status} options={["completed", "pending", "rejected"]} onClick={(value)=>setStatus(value)}/>:  item.status}</div>

         <div className="date border text-text-secondary pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >{<p>
  {new Date(item.createdAt)?.toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}
</p>
}</div>
               <div className="action border pl-[10px] min-w-[170px] flex gap-sm items-center border-border-primary h-full" >{editId===item._id? <Button children="Save" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleSave(item._id)} />: <Button children="Edit" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleEdit(item._id)} />} {editId===item._id&& <Button children="Cancel" className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleCancel(item._id)} />}</div>


        </div>
       ))
     }

            </div>
      {/* Pagination */}
      
      {/* <div className="pagination flex gap-xs">
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
      </div> */}

      </div>
    </div>
  </section>
  )
}

export default SellerWithdrawRequests