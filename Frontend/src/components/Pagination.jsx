import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {LeftOutlined, RightOutlined} from '@ant-design/icons'

const Pagination = ({
    totalItems=5,
    currentPage=1,
    limit=10,
    onPageChange=() => {},
}) => { 
    const totalPages = Math.ceil(totalItems / limit);
    
   const visiblePages = (() => {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );
  }

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );
})();

    const handlePageChange = (page) => {
        if (page < 1) return;
        if (page > totalPages) return;
        if (page === currentPage) return;
        onPageChange(page);
       
    };
  return (
    <div className='flex my-sm slect-none justify-center gap-m-sm items-center h-[32px] '>
        <span onClick={() => handlePageChange(currentPage - 1)} className='mx-2 select-none cursor-pointer'>
            <LeftOutlined />
        </span>
      {visiblePages.map((item) => (
        <span onClick={() => handlePageChange(item)} key={item} className={`py-p-xxs px-p-sm select-none cursor-pointer  ${item === currentPage ? 'text-primary-base border-2 rounded-md border-primary-base' : ''}`} >
          {item}
        </span>
      ))}
        <span onClick={() => handlePageChange(currentPage + 1)} className='mx-2 select-none cursor-pointer'>
            <RightOutlined />
        </span>
    </div>
  )
}

export default Pagination