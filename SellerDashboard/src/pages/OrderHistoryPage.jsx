import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "../index";

const OrderHistoryPage = () => {
  return (
    <section className="flex justify-center">
      <div className="container lg:gap-xxl bg-white grid gap-xl px-p-md lg:p-p-xxl">
        <div className="title">
          <h4>Orders</h4>
          <p>manage your recent orders and invoices</p>
        </div>
        <div className="filter flex justify-between">
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
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
            <Button
              children="All"
              className="option w-[76px] text-black text-center border-[#00000026] border px-p-md py-p-xxs"
            />
          </div>
          <div className="search">
            <Input placeholder="Search" icon={<SearchOutlined />} />
          </div>
        </div>
        <div className="content w-full overflow-scroll no-scrollbar">

       
        <div className="data w-full grid gap-lg overflow-scroll no-scrollbar">
          <table className="w-[1200px] xl:w-full border-collapse  border-spacing-4 overflow-x-scroll xl:overflow-visible no-scrollbar">
            {/* Table Header */}
            <thead className="heading bg-gray-200">
              <tr className="h-[60px] ">
                <th>Order ID</th>
                <th>Date</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Customer</th>
                <th>Details</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="ProductContainer text-center">
              <tr className="Product h-[60px] border-b-2">
                <td>1</td>
                <td>2023-06-01</td>
                <td>$100</td>
                <td>1</td>
                <td>Shipped</td>
                <td>John Doe</td>
                <td>
                  <Link to="#">Track Order</Link>
                </td>
              </tr>
              <tr className="Product h-[60px] border-b-2">
                <td>1</td>
                <td>2023-06-01</td>
                <td>$100</td>
                <td>1</td>
                <td>Shipped</td>
                <td>John Doe</td>
                <td>
                  <Link to="#">Track Order</Link>
                </td>
              </tr>
              <tr className="Product h-[60px] border-b-2">
                <td>1</td>
                <td>2023-06-01</td>
                <td>$100</td>
                <td>1</td>
                <td>Shipped</td>
                <td>John Doe</td>
                <td>
                  <Link to="#">Track Order</Link>
                </td>
              </tr>
              <tr className="Product h-[60px] border-b-2">
                <td>1</td>
                <td>2023-06-01</td>
                <td>$100</td>
                <td>1</td>
                <td>Shipped</td>
                <td>John Doe</td>
                <td>
                  <Link to="#">Track Order</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
};

export default OrderHistoryPage;
