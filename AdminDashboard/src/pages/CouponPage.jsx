import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../index'

const CouponPage = () => {
    return (
        <section className="flex justify-center">
          <div className="container max-w-screen-xl lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">
            <div className="top-menu flex justify-between items-end">
            <div className="title ">
              <h4>Coupons</h4>
              <p>Add edit or manage your Coupons</p>
            </div>
            <div className="createproduct">
              <Link to="/new-coupon">
                <Button children="New Coupon" className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white" />
              </Link>
            </div>
    
            </div>
    
          
            <div className="content w-full overflow-scroll no-scrollbar">
    
           
            <div className="data bg-white w-full border border-border-primary grid overflow-scroll no-scrollbar">
              <div className="head grid grid-cols-[minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(150px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)] h-[54px] items-center ">
               <div className="code border pl-[10px]  flex items-center border-[#0000000f] h-full" >Code</div>
               <div className="type border pl-[10px]  flex items-center border-[#0000000f] h-full" >Coupon Type</div>
               <div className="amount border pl-[10px]  flex items-center border-[#0000000f] h-full" >Coupon Amount</div>
               <div className="limit border pl-[10px]  flex items-center border-[#0000000f] h-full" >Usage/Limit</div>
               <div className="date border pl-[10px]  flex items-center border-[#0000000f] h-full" >Start/End Date</div>
               <div className="action border pl-[10px] flex items-center border-[#0000000f] h-full" >Action</div>
              </div>
              
              {
            
                  <div key={""} className="body  grid grid-cols-[minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(150px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)_minmax(137px,_1fr)] items-center  h-[72px]  ">
                  <div className="id border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{175757}</div>

                  <div className="type border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{"price"}</div>
                  <div className="amount border pl-[10px] min-w-[150px] flex items-center border-[#0000000f] h-full" >{"price"}</div>

                   <div className="limit border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{"price"}</div>

                   <div className="date border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >{"status"}</div>

                   <div className="action border pl-[10px] min-w-[137px] flex items-center border-[#0000000f] h-full" >Action</div>
                     
                  </div>
            
              }
           
            
              
             
            </div>
            {/* Pagination */}
            
            <div className="pagination flex gap-xs">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            
            </div>
          </div>
        </section>
      );
}

export default CouponPage