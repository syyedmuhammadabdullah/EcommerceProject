import React, { useEffect,useState } from 'react'
import { CloseOutlined,ProductFilled,MoneyCollectFilled,StarFilled,CheckOutlined, PhoneOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input,getAllCustomers,useDebouncedHook,getAllSellers, SelectMenu,updateSellerStatus, Pagination } from '../index'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate,Link, } from 'react-router-dom'
const SellerPage = () => {
  const dispatch=useDispatch()
  const {loading, error, sellers, totalSellers } = useSelector((state) => state.seller);
  const navigate=useNavigate()
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebouncedHook(search,500);
  const [editId, setEditId] = useState(null);
    const [status, setStatus] = useState("");
  
  
  useEffect(() => {
    
     if (!sellers || sellers.length === 0 || debouncedSearch !== search) {
       dispatch(getAllSellers({search:debouncedSearch,page:1,limit:10}))
     }
     console.log(sellers);
     
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
const handlePageChange = (page) => {
  setCurrentPage(page);
  dispatch(getAllSellers({search:debouncedSearch,page,limit:10}))
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
<div className="data w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-lg">




 {sellers?.map((seller,index)=>(
     <div className="totalSales border min-w-[300px] w-[350px] min-h-[500px] border-border-primary rounded-md  bg-white ">
                    <div className="con  flex items-center flex-col gap-md p-lg">
                    <div className="t-sale  flex justify-center items-center gap-lg">
                      <img className='h-[100px] w-[100px] rounded-full' src={seller?.storeDetails?.storeLogo} alt="" />
                      </div>
                      <div className="details gap-xxs  flex flex-col items-center">

                     <p className='text-md font-bold'>{seller?.storeDetails?.storeName}</p>
                     <p className='text-md text-text-secondary'>{seller?.verification?.isVerified?"Verified":"Not Verified"}</p>
                     <p className='text-md text-text-secondary'>Join Date: {new Date(seller?.accountStatus?.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="card grid h-[100px] items-center justify-between w-full bg-primary-base text-white p-p-md grid-cols-3 gap-xl mt-lg">
                        <div className="products">
                        <p className='text-md'><ProductFilled /></p>
                        <p className='text-md'>{seller.performanceMetrics.totalProducts}</p>

                        </div>
                        <div className="sales">
                        <p className='text-md'><MoneyCollectFilled /></p>
                        <p className='text-md '>{seller.performanceMetrics.totalSales}</p>

                        </div>
                        <div className="reviews">
                        <p className='text-md '><StarFilled /></p>
                        <p className='text-md '>{seller.performanceMetrics.reviewCount}</p>

                        </div>
                     </div>
                      <div className="des">
                        <p className='text-md text-text-secondary'>{seller?.storeDetails?.storeDescription?.slice(0,75)}{seller?.storeDetails?.storeDescription?.length > 75 ? '...' : '.'}</p>
                      </div>
                    </div>
                    <div className="date h-[40px]  mt-xl flex px-lg items-center justify-center  border-t border-border-primary"><Link to={`/sellers/${seller._id}`}><p className='text-md'>View Details</p></Link></div>
                </div>

))}

</div>

      </div>
<div className="pagination h-[40px] col-span-full ml-auto mr-sm">
<Pagination totalItems={totalSellers} limit={10} currentPage={currentPage} onPageChange={handlePageChange} />
</div>
    </div>
  </section>
  )
}

export default SellerPage