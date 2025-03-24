import { ArrowDownOutlined, ArrowUpOutlined, } from '@ant-design/icons'
import React,{useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import {Button, Input,getSellerOrdersDetail,} from "../index"
import Chart from "chart.js/auto"
import { useSelector,useDispatch } from 'react-redux'

const DashboardPage = () => {
    const dispatch=useDispatch()
    const {orderstats,loading}=useSelector(state=>state.order)
    const chartRef=useRef(null)


  useEffect(()=>{
    dispatch(getSellerOrdersDetail())

    
  },[])
  useEffect(()=>{
  console.log(orderstats);
  
},[orderstats])
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];
      
      useEffect(()=>{
       

          const ctx = chartRef?.current?.getContext('2d');
        new Chart(ctx,{
            type: 'bar',
            data: {
              labels: orderstats?.recentOrders?.map(item => item.orderDate),
              datasets: [
                {
                  label: 'Acquisitions by year',
                  data: orderstats?.recentOrders?.map(item => item.totalPrice),
                  borderWidth:1,
                  barThickness:30
                },
                {
                  label: 'Acquisitions by month',
                  data: data.map(row => row.count),
                  borderWidth:1,
                  barThickness:30
                }
              ]
            },
            options: {
                responsive: true, // Enable responsiveness
                maintainAspectRatio: true, // Allow full container size adjustment
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
          })
          return () => {
            if (chartRef.current) {
              const chartInstance = Chart.getChart(chartRef.current);
              if (chartInstance) {
                chartInstance.destroy();
              }
            }
          };
      },[orderstats]);
  return (
    <section className='flex justify-center'>
       <div className="container dark:bg-black grid  px-p-md lg:p-p-xxl">

        <div className="title">
            <h4>Dashboard</h4>
        </div>
        
        {loading?<div className="loader"> loading</div>:
          <div className="content w-full">

            <div className="stats  items-center grid pt-lg gap-lg grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

                <div className="totalSales border border-border-primary rounded-md  h-[187px] bg-white ">
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-sale text-text-description"><p>Total Sales</p></div>
                    <div className="sale "><p className='text-xl font-bold'>Rs {orderstats?.totalSales}</p></div>
                    <div className="res"><p>per month <ArrowUpOutlined/> 12% per year  <ArrowDownOutlined/> 2%</p></div>
                    </div>
                    <div className="date h-[36px] mt-auto flex px-lg items-center   border-t border-border-primary"><p>date for the year 2025</p></div>
                </div>
                <div className="totalSales border border-border-primary rounded-md  h-[187px] bg-white ">
                    <div className="con h-[150px] flex justify-between gap-sm p-lg">
                      <div className="t-order">
                    <div className="t-orders text-text-description"><p>Total Orders</p></div>
                    <div className="percent "><p className='text-xl font-bold'>{orderstats?.totalOrders}</p></div>
                      </div>
                      <div className="p-order">
                    <div className="t-orders text-text-description"><p>Pending Orders</p></div>
                    <div className="percent "><p className='text-xl font-bold'>{orderstats?.totalPendingOrders}</p></div>

                      </div>
                    
                    </div>
                    <div className="date h-[36px] mt-auto flex px-lg items-center   border-t border-border-primary"><p>per month <ArrowUpOutlined/> 12% per year  <ArrowDownOutlined/> 2%</p></div>
                </div>
                <div className="totalSales border border-border-primary rounded-md  h-[187px] bg-white ">
                    <div className="con h-[150px] flex flex-col gap-sm p-lg">
                    <div className="t-order text-text-description"><p>Total Sucessfull Orders</p></div>
                    <div className="percent "><p className='text-xl font-bold'>{orderstats?.totalSuccessfulOrders/orderstats?.totalOrders*100}%</p></div>
                    <div className="res">
                    <div className="bar max-w-[250px] h-[20px] bg-border-secondary relative ">
                      <div className={`range absolute left-0 top-0 bg-primary-base h-full `} style={{width:`${orderstats?.totalSuccessfulOrders/orderstats?.totalOrders*100}%`}}></div>
                    </div>
                    </div>
                    </div>
                    <div className="date h-[36px] mt-auto flex px-lg items-center   border-t border-border-primary"><p>per month <ArrowUpOutlined/> 12% per year  <ArrowDownOutlined/> 2%</p></div>
                </div>

            </div>
            <div className="chart w-screen sm:w-full h-content p-lg my-lg rounded-md border border-border-primary bg-white">
                <div className="title flex justify-between  w-full">
                    <div className="heading">
                        <h4>Chart</h4>
                    </div>
                    <div className="filter flex flex-wrap justify-between">
          <div className="options rounded-md flex-wrap border-[#00000026] overflow-scroll no-scrollbar flex w-fit">
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
           
          </div>
          
        </div>
                </div>
                <canvas className='h-[300px] w-[99%]' ref={chartRef} />
                    
            
            </div>
            <div className="recentOrders w-screen sm:w-full  py-lg">

            <div className="data bg-white border border-border-primary w-full rounded-md px-lg pb-lg  grid overflow-scroll no-scrollbar">
                <div className="title my-lg">
                    <h4>Recent Orders</h4>
                </div>
            <div className="head h-[54px] grid grid-cols-[48px_minmax(389px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(111px,_1fr)] items-center bg-[#00000005]">
           <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >ID</div>
           <div className="name border pl-[10px] min-w-[389px] flex items-center border-[#0000000f] h-full" >Customer Name</div>
           <div className="stock border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >No. of Products</div>
           <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Total Amount</div>
           <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Order Status</div>
           <div className="action border pl-[10px] min-w-[111px] flex items-center border-[#0000000f] h-full" >Action</div>
          </div>
         {orderstats?.recentOrders?.map((order,index)=>(
            <div key={order._id} className="body grid grid-cols-[48px_minmax(389px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(111px,_1fr)] items-center  h-[72px]  ">
            <div className="id border pl-[10px] w-[48px] flex items-center border-[#0000000f] h-full" >{index+1}</div>
             <div className="name border text-text-secondary gap-xs pl-[10px] min-w-[389px] flex items-center border-[#0000000f] h-full" >
              {order?.userName}
              </div>
             <div className="stock border pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >{order?.totalItems}</div>
             <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{order?.totalPrice}</div>
             <div className="price border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{order?.status}</div>
             <div className="action border pl-[10px] min-w-[111px] flex items-center border-[#0000000f] h-full" >
             <Link to={`/order-details/${order._id}`}>
                <Button
                  children="View Order"
                  className="option  text-black text-center border-[#00000026] border px-p-md py-p-xxs" />
                </Link>
             </div>
               
            </div>
         ))}

        </div>


            </div>

        </div>}

       </div>
    </section>
  )
}

export default DashboardPage