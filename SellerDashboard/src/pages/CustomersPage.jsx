import React, { useEffect } from 'react'
import { PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input,getAllSellerCustomers } from '../index'
import { useSelector, useDispatch } from 'react-redux'
const CustomersPage = () => {
  const dispatch=useDispatch()
  const {loading, error, customers, totalCustomers } = useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(getAllSellerCustomers())
  },[])
  useEffect(() => {
    console.log("customers",customers);
    
  },[customers]);
  return (
    <section className="flex justify-center">
    <div className="container max-w-screen-xl bg-background-layout min-h-screen p-sm">
      <div className="top-menu mb-lg">
      <div className="title ">
        <h4>Customers</h4>
      </div>
     

      </div>
      <div className="content w-full min-h-[90%] bg-white p-sm">
<div className="searchCustomers mb-lg">
  <Input placeholder='Search Customer' icon={<SearchOutlined  onClick={""}  className='cursor-pointer'/>} />
</div>

<div className="mainCutomerContainer min-h-[80%]  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-sm px-sm ">

{customers?.map((customer)=>(
  <div className="cutomer rounded-md border-border-primary border h-[161px] sm:h-[139px] min-w-[332px] " key={customer._id}>
  <div className="details flex gap-lg p-lg">
    <div className="profile rounded-full w-[32px] h-[32px]">
      <img src={customer.customerDetails.avatar} alt=""  className='w-full h-full rounded-full'/>
    </div>
    <div className="data ">
      <h4>{customer.customerDetails.fullName}</h4>
      <p className='text-text-secondary mt-xs '>Customer</p>
    </div>

  </div>
<div className="contact flex justify-evenly">
<div className="message ">
  <p><span className='mr-xs'><PhoneOutlined/></span> Message</p>
</div>
<div className="call ">

  <p><span className='mr-xs'><PhoneOutlined/></span> Call</p>
</div>
</div>

</div>
))}
{customers?.map((customer)=>(
  <div className="cutomer rounded-md border-border-primary border h-[161px] sm:h-[139px] min-w-[332px] " key={customer._id}>
  <div className="details flex gap-lg p-lg">
    <div className="profile rounded-full w-[32px] h-[32px]">
      <img src={customer.customerDetails.avatar} alt=""  className='w-full h-full rounded-full'/>
    </div>
    <div className="data ">
      <h4>{customer.customerDetails.fullName}</h4>
      <p className='text-text-secondary mt-xs '>Customer</p>
    </div>

  </div>
<div className="contact flex justify-evenly">
<div className="message ">
  <p><span className='mr-xs'><PhoneOutlined/></span> Message</p>
</div>
<div className="call ">

  <p><span className='mr-xs'><PhoneOutlined/></span> Call</p>
</div>
</div>

</div>
))}
{customers?.map((customer)=>(
  <div className="cutomer rounded-md border-border-primary border h-[161px] sm:h-[139px] min-w-[332px] " key={customer._id}>
  <div className="details flex gap-lg p-lg">
    <div className="profile rounded-full w-[32px] h-[32px]">
      <img src={customer.customerDetails.avatar} alt=""  className='w-full h-full rounded-full'/>
    </div>
    <div className="data ">
      <h4>{customer.customerDetails.fullName}</h4>
      <p className='text-text-secondary mt-xs '>Customer</p>
    </div>

  </div>
<div className="contact flex justify-evenly">
<div className="message ">
  <p><span className='mr-xs'><PhoneOutlined/></span> Message</p>
</div>
<div className="call ">

  <p><span className='mr-xs'><PhoneOutlined/></span> Call</p>
</div>
</div>

</div>
))}
<div className="cutomer rounded-md border-border-primary border h-[139px] min-w-[332px] ">
    <div className="details flex gap-lg p-lg">
      <div className="profile rounded-full w-[32px] h-[32px]">
        <img src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt=""  className='w-full h-full rounded-full'/>
      </div>
      <div className="data ">
        <h4>John Doe</h4>
        <p className='text-text-secondary mt-xs '>Customer</p>
      </div>

    </div>
<div className="contact flex justify-evenly">
  <div className="message ">
    <p><span className='mr-xs'><PhoneOutlined/></span> Message</p>
  </div>
  <div className="call ">

    <p><span className='mr-xs'><PhoneOutlined/></span> Call</p>
  </div>
</div>

</div>

</div>
<div className="pagination h-[40px] col-span-full mt-sm">
<p>1 - 10 of {totalCustomers}</p>
</div>

      </div>
    </div>
  </section>
  )
}

export default CustomersPage