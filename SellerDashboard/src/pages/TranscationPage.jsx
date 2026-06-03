import {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {Button, getAllTransactions, Pagination,} from "../index.js";

const TranscationPage = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const { allTransactions, allTransactionsTotal } = useSelector((state) => state.transaction);
  const [currentPage, setCurrentPage] = useState(1);
   const [selectedFilter, setSelectedFilter] =useState("all");
    const filters = ["All", "Pending", "Completed", "Cancelled"];
  useEffect(() => {
    dispatch(getAllTransactions({ type, page: currentPage }));
  }, [dispatch, type, currentPage]);
  useEffect(() => {
  }, [allTransactions, allTransactionsTotal]);
  const name=type==="withdrawal"?"Withdraw":type==="refund"?"Refund":"Sales"

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(getAllTransactions({ type, page,filter }));
  };
    const handleFilterChange = (filter) => {
     if (filter!==selectedFilter) {
       dispatch(getAllTransactions({ type, page: currentPage, filter }));
     }
      setSelectedFilter(filter);
      
    }

  return (
       <section className='flex justify-center'>
        <div className="container gap-lg grid p-p-lg xl:p-p-xxl">

        <div className="title">
            <h3>{name} History</h3>
        </div>
      {type==="withdrawal"&&    <div className="filter  h-[40px] rounded-md flex justify-between">
                  <div className="options  rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex">
                    {filters.map((filter,index) => (
                      <Button key={index}
                        children={filter}
                        onClick={() => handleFilterChange(filter.toLowerCase())}
                        className={`option  hover:bg-primary-hover hover:text-white ${selectedFilter === filter.toLowerCase() ? "bg-primary-base text-white" : "text-black"}  text-center  border-[#00000026] border px-p-md py-p-xxs`}
                      />
                    ))}
                  </div>
               
                </div>}
        <div className="data bg-white border border-border-primary rounded-md w-full grid overflow-scroll no-scrollbar">
        
        <div className="head h-[54px] grid grid-cols-[137px_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center bg-[#00000005]">
       <div className="id border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >Transaction ID</div>
       <div className="name border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Amount</div>
       <div className="stock border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Date</div>
       <div className="stock border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Status</div>
      </div>
   {
       allTransactions?.map((item)=>(
         <div key={item._id} className="body grid grid-cols-[137px_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center  h-[72px]  ">
        <div className="id border text-text-secondary pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >{item._id.slice(0,8)}</div>
         <div className="Amount border text-text-secondary gap-xs pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >
          RS  {item.amount}
          </div>
         <div className="date border text-text-secondary pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >{new Date(item.createdAt).toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}</div>
         <div className="date border text-text-secondary pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >{item.status}</div>
        </div>
       ))
     }

            </div>
     <div className="pagination flex gap-xs mt-md justify-center items-center py-p-md border-t border-border-primary">
          <Pagination currentPage={currentPage} totalItems={allTransactionsTotal} limit={20} onPageChange={handlePageChange} />
        </div>
        </div>
       </section>
  )
}

export default TranscationPage