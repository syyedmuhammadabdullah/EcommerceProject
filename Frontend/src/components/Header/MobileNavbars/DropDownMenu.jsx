import React, { useEffect, useState } from 'react'
import { LeftOutlined } from "@ant-design/icons";
import {Button} from "../../../index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const DropDownMenu = ({
  mainCategoryName,
  setCategoryClick,
  categoryClick,
}) => {
  const {categories}=useSelector(state=>state.product)
  const navigate=useNavigate()
const [selectedCategory,setSelectedCategory]=useState([...categories[0].subcategories])
const [activeCategory,setActiveCategory]=useState(categories[0]._id)

  return (
    <div className="DropDoownMenu  h-full bg-white z-10 top-0 absolute left-0">
    
    <div className="mainCategoryName">
    <div onClick={() => setCategoryClick(!categoryClick)} className="menubtn w-full px-p-md items-center text-text-secondary gap-xs flex h-control-xl">
      <LeftOutlined/>
    <span>{mainCategoryName}</span>
    </div>
    </div>

    <div className="subCategory  px-p-md border w-screen flex gap-base h-[48px] overflow-x-scroll no-scrollbar">
    {categories.map((category) => (

      <Button
       className={`w-full px-p-md text-text-default ${activeCategory===category._id && "border-b-2 border-b-primary-base"}`}
        key={category._id}
        onClick={() => {setSelectedCategory(category.subcategories); setActiveCategory(category._id)}}>
          {category.name}22
        </Button>
    ))}
    </div>

    
    <div className="Sub-SubCategory mt-m-md  flex flex-col gap-xs px-p-xs">
    {selectedCategory.map((subcategory) => (
      <div className="meuItem h-control-lg flex gap-xs px-p-xs" key={subcategory._id}>
        <Button
         className="w-full px-p-md text-left text-text-default"
          >
            {subcategory.name}
          </Button>
          </div>
      ))}
</div>

   </div>
  )
}

export default DropDownMenu