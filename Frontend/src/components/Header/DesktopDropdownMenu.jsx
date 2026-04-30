import React, { useState,useEffect } from 'react'
import {Button} from "../../index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const DesktopDropdownMenu = () => {
  const {categories}=useSelector(state=>state.product)
  const navigate=useNavigate()

  return (
    <div className="dropdowncContainer absolute bg-white z-20 justify-around gap-xxl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid w-full p-xxl">
        {categories?.map((category)=>(
            <div className="category flex flex-col gap-xl"key={category._id}>

            <div onClick={()=>navigate(`/products/${category.name}`)} className="mainCategory">{category.name}</div>
            <div className="subCategory  flex flex-col gap-sm">
                {category?.subcategories?.map((subcategories)=>(
                  <Button onClick={()=>navigate(`/products/subCategory/${subcategories.name}`)} children={subcategories.name} key={subcategories._id} className='text-left self-start w-auto text-text-secondary'/>
                ))}
                
            </div>
        </div>

        ))}
        

    </div>
  )
}

export default DesktopDropdownMenu