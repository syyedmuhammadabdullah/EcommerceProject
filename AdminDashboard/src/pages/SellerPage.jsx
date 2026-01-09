import React, { useEffect,useState } from 'react'
import { MailOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input,getAllCustomers,useDebouncedHook,getAllSellers, SelectMenu,updateSellerStatus } from '../index'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SellerPage = () => {
  const dispatch=useDispatch()
  const {loading, error, sellers } = useSelector((state) => state.seller);
  const navigate=useNavigate()
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedHook(search,500);
  const [editId, setEditId] = useState(null);
    const [status, setStatus] = useState("");
  
  
  useEffect(() => {
    
     if (!sellers || sellers.length === 0 || debouncedSearch !== search) {
       dispatch(getAllSellers({search:debouncedSearch,page:1,limit:10}))
     }
  },[debouncedSearch,search]);

  const handleKeyDown = (e) => {    
    if (e.key === 'Enter') {
      dispatch(getAllSellers({debouncedSearch}));
    }
  };


const handleEdit=(id)=>{
setEditId(id)
}

const handleSave=(id)=>{
  // dispatch update product action
  dispatch(updateSellerStatus({sellerId:id,status}));
  setEditId(null);
}

const handleCancel=()=>{
  setEditId(null);
}

  return (
    <section className="flex justify-center">
    <div className="container max-w-screen-xl bg-background-layout min-h-screen p-sm">
      <div className="top-menu mb-lg">
      <div className="title ">
        <h4>Sellers</h4>
      </div>
     

      </div>
      <div className="content w-full min-h-[90%] bg-white p-sm flex flex-col">
<div className="searchCustomers mb-lg">
  <Input value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder='Search Customer' icon={<SearchOutlined onKeyDown={handleKeyDown}  className='cursor-pointer'/>} />
</div>
<div className="data bg-white w-full border border-border-primary grid overflow-scroll no-scrollbar ">
      <div className="head h-[54px] grid grid-cols-[48px_minmax(389px,1fr)_minmax(150px,1fr)_minmax(137px,1fr)_minmax(137px,1fr)_minmax(137px,1fr)_minmax(170px,1fr)]  items-center bg-[#00000005]">

    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >No:</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >Seller Name</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >View Products</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >View Orders</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >View Details</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >Status</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >Actions</div>

</div>

 {sellers?.map((seller,index)=>(
  <div key={seller?._id} className="body h-[54px] grid grid-cols-[48px_minmax(389px,1fr)_minmax(150px,1fr)_minmax(137px,1fr)_minmax(137px,1fr)_minmax(137px,1fr)_minmax(170px,1fr)] items-center bg-[#00000005]">
    
     <div className="border pl-[10px] flex items-center border-border-primary h-full"  >{index+1}</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  > {seller?.storeDetails?.storeName}</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >  <Button onClick={()=>navigate(`/products/seller/?sellerId=${seller?._id}&storeName=${seller?.storeDetails?.storeName}`)} children="View Products" className='text-left  rounded-sm px-p-md py-p-xxs hover:bg-primary-hover   bg-primary-base text-white text-text-secondary'/>
</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >  <Button onClick={()=>navigate(`/orders/seller/?sellerId=${seller?._id}&storeName=${seller?.storeDetails?.storeName}`)} children="View Orders" className='text-left px-p-md py-p-xxs rounded-sm hover:bg-primary-hover  bg-primary-base text-white text-text-secondary'/>
</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >  <Button onClick={()=>navigate(`/orders/seller/?sellerId=${seller?._id}&storeName=${seller?.storeDetails?.storeName}`)} children="View Details" className='text-left px-p-md py-p-xxs rounded-sm hover:bg-primary-hover  bg-primary-base text-white text-text-secondary'/>
</div>
    <div className="border pl-[10px] flex items-center border-border-primary h-full"  >{editId===seller._id? <SelectMenu defaultValue={seller.accountStatus.status} options={["active", "inactive", "suspended"]} onClick={(value)=>setStatus(value)}/>:  seller.accountStatus.status}</div>
               <div className="action border pl-[10px] min-w-[170px] flex gap-sm items-center border-border-primary h-full" >{editId===seller._id? <Button children="Save" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleSave(seller._id)} />: <Button children="Edit" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleEdit(seller._id)} />} {editId===seller._id? <Button children="Cancel" className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleCancel(seller._id)} />:<Button children="Delete" className="bg-warning-base w-fit px-p-md py-p-xxs rounded-sm text-white" onClick={()=>handleDelete(seller._id)} />}</div>
 
  </div>

))}

</div>


      </div>
    </div>
  </section>
  )
}

export default SellerPage