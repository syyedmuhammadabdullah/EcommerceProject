import React, { useEffect,useState } from 'react'
import { MailOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input,getAllCustomers,useDebouncedHook } from '../index'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const CustomersPage = () => {
  const dispatch=useDispatch()
  const {loading, error, customers, totalCustomers } = useSelector((state) => state.customer);
  const navigate=useNavigate()
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedHook(search,500);
  useEffect(() => {
    
     if (!customers || customers.length === 0 || debouncedSearch !== search) {
    dispatch(getAllCustomers({ search: debouncedSearch, page: 1, limit: 10 }));
  }
  },[debouncedSearch,search]);

  const handleKeyDown = (e) => {    
    if (e.key === 'Enter') {
      dispatch(getAllCustomers({debouncedSearch}));
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
  <div className="cutomer rounded-md border-border-primary flex flex-col justify-around items-center border h-[161px] sm:h-[180px] max-w-[332px] " key={customer?._id}>
  <div className="details flex gap-lg p-lg">
    <div className="profile rounded-full w-[32px] h-[32px]">
      <img src={customer?.avatar} alt=""  className='w-full h-full rounded-full'/>
    </div>
    <div className="data ">
      <h4>{customer?.fullName}</h4>
      <p className='text-text-secondary mt-xs '>{customer?.email}</p>
    </div>
  </div>
  <Button onClick={()=>navigate(`/orders/customer?customerName=${customer?.fullName}&userId=${customer?._id}`)} children="View Orders" className='text-left mx-auto self-start rounded-md hover:bg-primary-hover px-p-md py-p-xs  bg-primary-base text-white text-text-secondary'/>

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