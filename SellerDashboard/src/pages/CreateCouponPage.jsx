import React, { useState } from 'react';
import { Button, Input, SelectMenu } from '../index';

const CreateCouponPage = () => {
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountScope: 'whole store',
    discountType: 'percentage',
    discountValue: 0,

    minimumSpend: 0,
    maximumSpend: 0,
    maximumDiscount: 0,

    startDate: '',
    endDate: '',

    userUsageLimit: 1,
    totalUsageLimit: 0,

    status: 'inactive',
  });

  const couponTypes = [
    'whole store',
    'specific product',
    'specific category',
    'specific seller',
  ];

  const discountTypes = ['percentage', 'price'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCouponForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setCouponForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Coupon Data:', couponForm);
  };

  return (
    <section className="flex justify-center">
      <div className="container max-w-screen-xl grid gap-xl px-p-md lg:p-p-xxl">

        {/* HEADER */}
        <div>
          <h4>Coupon Details</h4>
        </div>

        <div className="grid gap-xxl">

          {/* GENERAL INFO */}
          <div className="bg-white p-p-lg grid lg:grid-cols-2 gap-lg">
            <h5 className="col-span-full">General Information</h5>

            <div>
              <label>Coupon Code</label>
              <Input
                name="code"
                value={couponForm.code}
                onChange={handleInputChange}
                placeholder="Enter code"
              />
            </div>

            <div>
              <label>Coupon Type</label>
              <SelectMenu
                value={couponForm.discountScope}
                options={couponTypes}
                onChange={(value) =>
                  handleSelectChange('discountScope', value)
                }
              />
            </div>

            <div>
              <label>Discount Type</label>
              <SelectMenu
                value={couponForm.discountType}
                options={discountTypes}
                onChange={(value) =>
                  handleSelectChange('discountType', value)
                }
              />
            </div>

            <div>
              <label>Discount Value</label>
              <Input
                type="number"
                name="discountValue"
                value={couponForm.discountValue}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* RESTRICTIONS */}
          <div className="bg-white p-p-lg grid lg:grid-cols-2 gap-lg">
            <h5 className="col-span-full">Restrictions</h5>

            <div>
              <label>Minimum Spend</label>
              <Input
                type="number"
                name="minimumSpend"
                value={couponForm.minimumSpend}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Maximum Spend</label>
              <Input
                type="number"
                name="maximumSpend"
                value={couponForm.maximumSpend}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={couponForm.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>End Date</label>
              <Input
                type="date"
                name="endDate"
                value={couponForm.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* USAGE */}
          <div className="bg-white p-p-lg grid lg:grid-cols-2 gap-lg">
            <h5 className="col-span-full">Usage Limits</h5>

            <div>
              <label>Maximum Discount</label>
              <Input
                type="number"
                name="maximumDiscount"
                value={couponForm.maximumDiscount}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Usage per user</label>
              <Input
                type="number"
                name="userUsageLimit"
                value={couponForm.userUsageLimit}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Total Usage Limit</label>
              <Input
                type="number"
                name="totalUsageLimit"
                value={couponForm.totalUsageLimit}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Status</label>
              <select
                name="status"
                value={couponForm.status}
                onChange={handleInputChange}
                className="w-full border"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

        </div>

       {/* Submit Button */} 
       <div className="update col-span-full ml-auto"> <Button onClick={handleSubmit} className="w-full bg-primary-base text-white py-p-xs rounded-md px-p-md"> Create Coupon </Button> </div>

      </div>
    </section>
  );
};

export default CreateCouponPage;