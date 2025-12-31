import React, { useEffect,useState } from 'react'
import { MailOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input,getAllSellerCustomers,useDebouncedHook } from '../index'
import { useSelector, useDispatch } from 'react-redux'
const CustomersPage = () => {
  const dispatch=useDispatch()
  const {loading, error, customers, totalCustomers } = useSelector((state) => state.customer);
  
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedHook(search,500);
  useEffect(() => {
    dispatch(getAllSellerCustomers({search:debouncedSearch,page:1,limit:10}))
  },[debouncedSearch]);

  const handleKeyDown = (e) => {    
    if (e.key === 'Enter') {
      dispatch(getAllSellerCustomers({debouncedSearch}));
    }
  };

  return (
    <section className="flex justify-center">
    <div className="container max-w-screen-xl bg-background-layout min-h-screen p-sm">
      <div className="top-menu mb-lg">
      <div className="title ">
        <h4>Customers</h4>
      </div>
     

      </div>
      <div className="content w-full min-h-[90%] bg-white p-sm flex flex-col">
<div className="searchCustomers mb-lg">
  <Input value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder='Search Customer' icon={<SearchOutlined onKeyDown={handleKeyDown}  className='cursor-pointer'/>} />
</div>

<div className="mainCutomerContainer  min-h-[85%] flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-sm sm:px-sm"> 

{customers?.map((customer)=>(
  <div className="cutomer rounded-md border-border-primary border h-[161px] sm:h-[139px] min-w-[332px] " key={customer.customerInfo._id}>
  <div className="details flex gap-lg p-lg">
    <div className="profile rounded-full w-[32px] h-[32px]">
      <img src={customer.customerInfo?.avatar} alt=""  className='w-full h-full rounded-full'/>
    </div>
    <div className="data ">
      <h4>{customer.customerInfo.fullName}</h4>
      <p className='text-text-secondary mt-xs '>Customer</p>
    </div>

  </div>
<div className="contact flex justify-evenly">
<div className="message ">
  <p><span className='mr-xs'><MailOutlined/></span> Message</p>
</div>
<div className="call ">

  <p><span className='mr-xs'><PhoneOutlined/></span> Call</p>
</div>
</div>

</div>
))}
</div>

<div className="pagination h-[40px] col-span-full ml-auto mr-sm">
<p>1 - 10 of {totalCustomers}</p>
</div>

      </div>
    </div>
  </section>
  )
}

export default CustomersPage