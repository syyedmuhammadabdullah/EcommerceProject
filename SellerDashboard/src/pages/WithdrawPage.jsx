import React from 'react'
import { Button } from '../index'
import { BankOutlined } from '@ant-design/icons'

const WithdrawPage = () => {
  return (
    <section className='flex justify-center'>
        <div className="container">

        <div className="title gap-lg grid p-p-lg xl:p-p-xxl">
            <h3>Withdraw</h3>
        </div>

        <div className="content">

            <div className="balance-div  py-sm px-p-lg xl:px-xxl">
                <div className="title mb-lg">
                    <h5>Total Balance</h5>
                </div>
         
            <div className="balance flex justify-between items-center bg-white border border-border-primary rounded-md p-p-md">
                <div className="data flex flex-col gap-xxs">
                   <div className="currentBalance">
                    <p className='text-md'>Current Balance Rs. 0</p>
                   </div>
                   <div className="minBalance">
                    <p className='text-md'>Minimum Balance Rs. 5000</p>
                   </div>
                </div>
                <div className="btn">
                    <Button children="Request Withdraw" className='bg-primary-base p-p-sm text-white rounded-md'/>
                </div>
            </div>


            </div>

            <div className="withdraw-list py-p-md px-p-lg xl:px-xxl">
                <div className="title mb-lg">
                    <h5>Withdraw History</h5>
                </div>

            <div className="data bg-white border border-border-primary rounded-md w-full grid overflow-scroll no-scrollbar">
        
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

            <div className="balance-div  py-sm px-p-lg xl:px-xxl">
                <div className="title mb-lg">
                    <h5>Payment Method</h5>
                </div>
         
            <div className="balance flex justify-between items-center bg-white border border-border-primary rounded-md p-p-md">
                <div className="data flex items-center gap-md">
                   <div className="method flex gap-xxs items-center">
                    <div className="icon"><BankOutlined className='text-xl' /></div>
                    <p className='text-md font-bold'>Bank Transfer</p>
                   </div>
                   <div className="details">
                    <p className='text-[13px] text-text-secondary'>Account Holder Name</p>
                   </div>
                   
                   </div>
                
                <div className="btn">
                    <Button children={`${ ' "Setup": "Change" '}`} className='bg-primary-base p-p-sm text-white rounded-md'/>
                </div>
            </div>


            </div>

        </div>




        </div>
    </section>
  )
}

export default WithdrawPage