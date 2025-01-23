import { MoneyCollectOutlined ,BankOutlined,WalletOutlined} from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from '../index'

const WalletPage = () => {
  return (
    <section className="flex justify-center">
        <div className="container">

            <div className="title gap-lg grid p-p-lg xl:p-p-xxl">
                <h3>Wallet</h3>
            </div>

            <div className="content  p-p-lg xl:p-p-xl">
            
            <div className="payment-details gap-lg grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 ">
            
            <div className="withdrawAmount bg-white border border-border-primary rounded-md h-[160px] flex justify-around items-center ">
                <div className="price  ">
                    <p className='text-lg'>Withdrawal Amount</p>
                    <p className='text-lg'>Rs. 0</p>
                </div>

                <div className="icon">
                    <BankOutlined className='text-xxxl' />
                </div>
            </div>
            <div className="totalAmount bg-white border border-border-primary rounded-md h-[160px] flex justify-around items-center ">
                <div className="price  ">
                    <p className='text-lg'>Total Amount</p>
                    <p className='text-lg'>Rs. 0</p>
                </div>

                <div className="icon">
                    <MoneyCollectOutlined className='text-xxxl' />
                </div>
            </div>
            <div className="refundedAmount bg-white border border-border-primary rounded-md h-[160px] flex justify-around items-center ">
                <div className="price  ">
                    <p className='text-lg'>Refunded Amount</p>
                    <p className='text-lg'>Rs. 0</p>
                </div>

                <div className="icon">
                    <WalletOutlined className='text-xxxl' />
                </div>
            </div>
           
            </div>
           
           <div className="history grid grid-cols-1 gap-xl lg:grid-cols-2 py-p-lg xl:py-p-xxl">

           <div className="withdrawalHistory border border-border-primary rounded-md bg-white ">

            <div className="withdraw border-b border-border-primary py-p-md px-p-lg">
            <p className='text-lg'>Withdrawal History</p>
            </div>
            <div className="withdraw-list py-p-md px-p-md">

            <div className="data w-full grid overflow-scroll no-scrollbar">
        
        <div className="head h-[54px] grid grid-cols-[137px_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center bg-[#00000005]">
       <div className="id border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >Transaction ID</div>
       <div className="name border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Amount</div>
       <div className="stock border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Date</div>
      </div>
     {
        <div key={""} className="body grid grid-cols-[137px_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center  h-[72px]  ">
        <div className="id border text-text-secondary pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >{34867}</div>
         <div className="Amount border text-text-secondary gap-xs pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >
          {"RS 100"}
          </div>
         <div className="date border text-text-secondary pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >{"11/11/2022"}</div>
           
        </div>
     }

            </div>
            
            </div>
           
           </div>

           <div className="refundedHistory border border-border-primary rounded-md bg-white">
           <div className="refund border-b border-border-primary py-p-md px-p-lg">
            <p className='text-lg'>Refund History</p>
            </div>
            <div className="refund-list py-p-md px-p-md">

<div className="data w-full grid overflow-scroll no-scrollbar">

<div className="head h-[54px] grid grid-cols-[137px_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center bg-[#00000005]">
<div className="id border pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >Transaction ID</div>
<div className="name border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Amount</div>
<div className="stock border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Date</div>
</div>
{
<div key={""} className="body grid grid-cols-[137px_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center  h-[72px]  ">
<div className="id border text-text-secondary pl-[10px] w-[137px] flex items-center border-[#0000000f] h-full" >{34867}</div>
<div className="Amount border text-text-secondary gap-xs pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >
{"RS 100"}
</div>
<div className="date border text-text-secondary pl-[10px] min-w-[137px] flex flex-col gap-xs justify-center border-[#0000000f] h-full" >{"11/11/2022"}</div>

</div>
}

</div>

</div>
           </div>
           </div>
           
           
           
           
            </div>

        </div>
    </section>
  )
}

export default WalletPage