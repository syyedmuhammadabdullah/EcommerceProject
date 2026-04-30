import { ArrowDownOutlined, ArrowUpOutlined, } from '@ant-design/icons'
import {useEffect, useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import {Button,getSellerDetailForAdmin,getSellerOrdersDetail,} from "../index"
import { useSelector,useDispatch } from 'react-redux'
import MyChart from '../components/MyChart'

const DashboardPage = () => {
    const dispatch=useDispatch()
    const {orderstats,loading,orders,sellerWallet}=useSelector(state=>state.order)
    const {seller}=useSelector(state=>state.seller)
    const [range,setRange]=useState("daily")


    useEffect(() => {
      dispatch(getSellerDetailForAdmin({sellerId:"694ff41845e3d9faf94b9ef3",range}));
    }, []);
  useEffect(() => {
    
    
      console.log("getsellerOrderdetails rruns",seller);
  
       
      
  }, [seller]);
 
    const filter = ["Daily", "Weekly", "Monthly","6 Months" ];
    const handleFilterClick = (filter) => {
      if (filter!==range) {
        dispatch(getSellerDetailForAdmin({ range:filter.toLowerCase(),sellerId:"694ff41845e3d9faf94b9ef3" }));
      }
      setRange(filter);
    };

  return (
    <section className='flex justify-center'>
       <div className="container dark:bg-black grid  px-p-md lg:p-p-xxl">

        <div className="title">
            <h4>Dashboard</h4>
        </div>
        
          <div className="content w-full">

            <div className="stats  items-center grid pt-lg gap-lg grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
               <div className="totalSales grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border-primary rounded-md  bg-white col-span-full">
                   
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-sale text-text-description"><p>Store Name</p></div>
                    <div className="sale "><p className=' font-bold'>{seller?.seller?.storeDetails?.storeName}</p></div>
                    </div>
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-sale text-text-description"><p>Bussiness Email</p></div>
                    <div className="sale "><p className=' font-bold'>{seller?.seller?.businessEmail}</p></div>
                    </div>
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-sale text-text-description"><p>Status</p></div>
                    <div className="sale "><p className=' font-bold'>{seller?.seller?.accountStatus?.status}</p></div>
                    </div>
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-sale text-text-description"><p>Joined Date</p></div>
                    <div className="sale "><p className=' font-bold'>{seller?.seller?.accountStatus?.createdAt}</p></div>
                    </div>
                    


                </div>
                <div className="totalSales border border-border-primary rounded-md  h-[187px] bg-white ">
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-sale text-text-description"><p>Total Sales</p></div>
                    <div className="sale "><p className='text-xl font-bold'>Rs {seller?.chart?.delivered.reduce((a, b) => a + b, 0) || 0}</p></div>
                    <div className="res"><p>per month <ArrowUpOutlined/> 12% per year  <ArrowDownOutlined/> 2%</p></div>
                    </div>
                    <div className="date h-[36px] mt-auto flex px-lg items-center   border-t border-border-primary"><p>date for the year 2025</p></div>
                </div>
                <div className="totalSales border border-border-primary rounded-md  min-h-[187px] bg-white ">
                    <div className="con grid grid-cols-2 justify-between gap-md p-lg">
                      <div className="t-order">
                    <div className="t-orders text-text-description"><p>Total Orders</p></div>
                    <div className="percent "><p className='text-xl font-bold'>{seller?.chart?.totalItems || 0}</p></div>
                      </div>
                      <div className="p-order">
                    <div className="t-orders text-text-description"><p>Delivered Orders</p></div>
                    <div className="percent "><p className='text-xl font-bold'>{seller?.chart?.totalDeliveredOrders || 0}</p></div>
                      </div>
                      <div className="t-order">
                    <div className="t-orders text-text-description"><p>Refunded Orders</p></div>
                    <div className="percent "><p className='text-xl font-bold'>{seller?.chart?.totalRefundedOrders || 0}</p></div>
                      </div>
                      <div className="p-order">
                    <div className="t-orders text-text-description"><p>cancelled Orders</p></div>
                    <div className="percent "><p className='text-xl font-bold'>{seller?.chart?.totalCancelledOrders || 0}</p></div>
                      </div>
                    
                    </div>
                </div>
                <div className="totalSales border border-border-primary rounded-md  h-[187px] bg-white ">
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-order text-text-description"><p>Wallet Balance</p></div>
                    <div className="sale "><p className='text-xl font-bold'>Rs {seller &&seller?.wallet?.balance|| 0}</p></div>
                   
                    </div>
                    <div className="date h-[36px] mt-auto flex px-lg items-center   border-t border-border-primary"><p>per month <ArrowUpOutlined/> 12% per year  <ArrowDownOutlined/> 2%</p></div>
                </div>

            </div>
            <div className="chart max-w-full  min-h-content p-lg my-lg rounded-md border border-border-primary bg-white">
                <div className="title flex justify-between  w-full">
                    <div className="heading">
                        <h4>Chart</h4>
                    </div>
                    <div className="filter flex flex-wrap justify-between">
          <div className="options rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex w-fit">
         {
          filter.map((item,index)=><Button
              key={index}
              children={item}
              className={`option ${range?.toLowerCase()===item?.toLowerCase() && "bg-primary-base text-white"} -[80px] text-black text-center border-[#00000026] border px-p-md py-p-xxs hover:bg-primary-hover hover:text-white`}
              onClick={()=>handleFilterClick(item)}
            />)
         }
        
           
          </div>
          
        </div>
                </div>
                    <MyChart orderstats={seller?.chart} />
            
            </div>
       

        </div>

       </div>
    </section>
  )
}

export default DashboardPage