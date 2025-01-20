import { MoneyCollectOutlined } from '@ant-design/icons'
import React from 'react'

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
                    <MoneyCollectOutlined className='text-xxxl' />
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
                    <MoneyCollectOutlined className='text-xxxl' />
                </div>
            </div>
           
            </div>
           
           <div className="history grid grid-cols-1 lg:grid-cols-2 ">

           <div className="withdrawalHistory">

           </div>

           <div className="refundedHistory">

           </div>
           </div>
           
           
           
           
            </div>

        </div>
    </section>
  )
}

export default WalletPage