import React from 'react'
import { useState } from 'react'
import { Button, Input,SelectMenu } from '../index'
const createCouponPage = () => {
    const [couponForm, setCouponForm] = useState({
        code: '',
        couponType: 'whole store',
        couponAmount: 0,
        MaximumSpend: 0,
        MinimumSpend: 0,
        discount: 0,
        MaximumDiscount: 0,
        discountType: 'percentage',
        discountValue: 0,
        startDate: null,
        endDate: null,
        status: 'inactive',
        Usagelimitperuser: false,
        Usagelimitpercoupon: 0,
      });
      const couponTypes = ['whole store', 'specific product', 'specific category', 'specific seller'];
      const discountTypes = ['percentage', 'price'];
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCouponForm({ ...couponForm, [name]: value });
      };
    
      const handleSelectChange = (name, value) => {
        setCouponForm({ ...couponForm, [name]: value });
      };
    
      const handleDateChange = (name, date) => {
        setCouponForm({ ...couponForm, [name]: date });
      };
    
      const handleSubmit = () => {
        // Handle form submission logic
        console.log('Coupon Form Data:', couponForm);
      };
    
      return (
        <section className="flex justify-center">
          <div className="container max-w-screen-xl lg:gap-xxl grid gap-xl px-p-md lg:p-p-xxl">
            <div className="top-menu">
              <div className="title">
                <h4>Coupon Details</h4>
              </div>
            </div>
    
            <div className="content w-full overflow-scroll no-scrollbar">
              <div className="info grid grid-cols-1  gap-xxl py-p-xl">
                {/* Coupon Information */}
                <div className="couponInfo bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
                  <div className="name col-span-full">
                    <h5>General Coupon Information</h5>
                  </div>
                  <div className="code">
                    <label htmlFor="code">Coupon Code</label>
                    <Input
                      value={couponForm.code}
                      onChange={handleInputChange}
                      name="code"
                      id="code"
                      placeholder="Enter Coupon Code"
                    />
                  </div>
                  <div className="couponType">
                    <label htmlFor="couponType">Coupon Type</label>
                    <SelectMenu
                      value={couponForm.couponType}
                      onChange={(value) => handleSelectChange('couponType', value)}
                      options={couponTypes}
                      className="w-full"
                    />
                  </div>
                  <div className="couponAmount">
                    <label htmlFor="couponAmount">Coupon Amount</label>
                    <Input
                      type="number"
                      value={couponForm.couponAmount}
                      onChange={handleInputChange}
                      name="couponAmount"
                      id="couponAmount"
                      placeholder="Enter Coupon Amount"
                      min={0}
                    />
                  </div>
               
                  <div className="discount">
                    <label htmlFor="discount">Discount</label>
                    <Input
                      type="number"
                      value={couponForm.discount}
                      onChange={handleInputChange}
                      name="discount"
                      id="discount"
                      placeholder="Enter Discount"
                      min={0}
                    />
                  </div>
            
                  <div className="discountType">
                    <label htmlFor="discountType">Discount Type</label>
                    <SelectMenu
                      value={couponForm.discountType}
                      onChange={(value) => handleSelectChange('discountType', value)}
                      options={discountTypes}
                      className="w-full"
                    />
                  </div>
                  <div className="discountValue">
                    <label htmlFor="discountValue">Discount Value</label>
                    <Input
                      type="number"
                      value={couponForm.discountValue}
                      onChange={handleInputChange}
                      name="discountValue"
                      id="discountValue"
                      placeholder="Enter Discount Value"
                      min={0}
                    />
                  </div>
      
                
                </div>
                <div className="couponInfo bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
                  <div className="name col-span-full">
                    <h5>Usage restrictions</h5>
                  </div>
                  <div className="MaximumSpend">
                    <label htmlFor="MaximumSpend">Maximum Spend</label>
                    <Input
                      type="number"
                      value={couponForm.MaximumSpend}
                      onChange={handleInputChange}
                      name="MaximumSpend"
                      id="MaximumSpend"
                      placeholder="Enter Maximum Spend"
                      min={0}
                    />
                  </div>
                  <div className="MinimumSpend">
                    <label htmlFor="MinimumSpend">Minimum Spend</label>
                    <Input
                      type="number"
                      value={couponForm.MinimumSpend}
                      onChange={handleInputChange}
                      name="MinimumSpend"
                      id="MinimumSpend"
                      placeholder="Enter Minimum Spend"
                      min={0}
                    />
                  </div>
                             
                  <div className="startDate">
                    <label htmlFor="startDate">Start Date</label>
                    <input type="date"
                      value={couponForm.startDate}
                      onChange={(date) => handleDateChange('startDate', date)}
                      className="w-full outline-none"
                    />
                  </div>
                  <div className="endDate">
                    <label htmlFor="endDate">End Date</label>
                    <input type="date"
                      value={couponForm.endDate}
                      onChange={(date) => handleDateChange('endDate', date)}
                      className="w-full outline-none"
                    />
                  </div>
                  
                </div>
                <div className="couponInfo bg-white border border-border-primary rounded-md p-p-lg grid grid-cols-1 lg:grid-cols-2 gap-lg">
                  <div className="name col-span-full">
                    <h5>Usage Limits</h5>
                  </div>
                 
            
                  
                  <div className="MaximumDiscount">
                    <label htmlFor="MaximumDiscount">Maximum Discount</label>
                    <Input
                      type="number"
                      value={couponForm.MaximumDiscount}
                      onChange={handleInputChange}
                      name="MaximumDiscount"
                      id="MaximumDiscount"
                      placeholder="Enter Maximum Discount"
                      min={0}
                    />
                  </div>
                  <div className="Usagelimitpercoupon
">
                    <label htmlFor="Usagelimitpercoupon">Usage limit per coupon
                    </label>
                    <Input
                      type="number"
                      value={couponForm.Usagelimitpercoupon}
                      onChange={handleInputChange}
                      name="Usagelimitpercoupon"
                      id="Usagelimitpercoupon"
                      placeholder="Enter Usage limit per coupon"
                      min={0}
                    />
                  </div>
                  
                
                  <div className="multipleTimes">
                    <label htmlFor="Usagelimitperuser">Usage limit per user</label>
                    <select className='w-full outline-none py-xs border border-border-primary' name="Usagelimitperuser" id="" value={couponForm.Usagelimitperuser} onChange={handleInputChange}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                    </select>
                      </div>
                   
                  <div className="status">
                    <label htmlFor="status">Status</label>
                    <select  className='w-full outline-none py-xs border border-border-primary' name="status" id="" value={couponForm.status} onChange={handleInputChange}>
                    <option value="active" >Active</option>
                    <option value="inactive" >inActive</option>
                    </select>
                  </div>
                </div>
              </div>
    
              {/* Submit Button */}
              <div className="update col-span-full ml-auto">
                <Button onClick={handleSubmit} className="w-full bg-primary-base text-white py-p-xs rounded-md px-p-md">
                  Create Coupon
                </Button>
              </div>
            </div>
          </div>
        </section>
      );
  
}

export default createCouponPage