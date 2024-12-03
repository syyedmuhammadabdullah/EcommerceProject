import React, { useState } from 'react'
import {Button} from "../../index"

const DesktopDropdownMenu = () => {
    const categories = [
        {
          _id: '1',
          name: 'Electronics',
          description: 'Devices and gadgets',
          subcategories: [
            { _id: '1-1', name: 'Mobile Phones' },
            { _id: '1-2', name: 'Laptops' },
            { _id: '1-3', name: 'Cameras' },
          ],
        },
        {
          _id: '2',
          name: 'Fashion',
          description: 'Clothing and accessories',
          subcategories: [
            { _id: '2-1', name: 'Men' },
            { _id: '2-2', name: 'Women' },
            { _id: '2-3', name: 'Kids' },
          ],
        },
        {
          _id: '3',
          name: 'Home & Garden',
          description: 'Furniture and appliances',
          subcategories: [
            { _id: '3-1', name: 'Furniture' },
            { _id: '3-2', name: 'Kitchen' },
            { _id: '3-3', name: 'Outdoor' },
          ],
        },
        {
          _id: '4',
          name: 'Books',
          description: 'Literature and educational materials',
          subcategories: [
            { _id: '4-1', name: 'Fiction' },
            { _id: '4-2', name: 'Non-Fiction' },
            { _id: '4-3', name: 'Educational' },
          ],
        },
        {
          _id: '5',
          name: 'Sports',
          description: 'Sporting goods and fitness equipment',
          subcategories: [
            { _id: '5-1', name: 'Fitness' },
            { _id: '5-2', name: 'Outdoor' },
            { _id: '5-3', name: 'Team Sports' },
          ],
        },
        {
          _id: '6',
          name: 'Toys & Games',
          description: 'Toys, games, and hobbies',
          subcategories: [
            { _id: '6-1', name: 'Action Figures' },
            { _id: '6-2', name: 'Board Games' },
            { _id: '6-3', name: 'Educational Toys' },
          ],
        },
        {
          _id: '7',
          name: 'Health & Beauty',
          description: 'Personal care and beauty products',
          subcategories: [
            { _id: '7-1', name: 'Skincare' },
            { _id: '7-2', name: 'Haircare' },
            { _id: '7-3', name: 'Makeup' },
          ],
        },
        {
          _id: '8',
          name: 'Automotive',
          description: 'Vehicle parts and accessories',
          subcategories: [
            { _id: '8-1', name: 'Car Accessories' },
            { _id: '8-2', name: 'Motorcycle Parts' },
            { _id: '8-3', name: 'Tools & Equipment' },
          ],
        },
        {
          _id: '9',
          name: 'Grocery',
          description: 'Food and beverages',
          subcategories: [
            { _id: '9-1', name: 'Beverages' },
            { _id: '9-2', name: 'Snacks' },
            { _id: '9-3', name: 'Fresh Produce' },
          ],
        },
        {
          _id: '10',
          name: 'Music',
          description: 'Musical instruments and accessories',
          subcategories: [
            { _id: '10-1', name: 'Guitars' },
            { _id: '10-2', name: 'Keyboards' },
            { _id: '10-3', name: 'Percussion' },
          ],
        },
      ];
      
  return (
    <div className="dropdowncContainer absolute bg-white z-20 justify-around gap-xxl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid w-full p-xxl">
        {categories.map((category)=>(
            <div className="category flex flex-col gap-xl"key={category._id}>

            <div className="mainCategory">{category.name}</div>
            <div className="subCategory  flex flex-col gap-sm">
                {category.subcategories.map((subcategories)=>(
                  <Button children={subcategories.name} key={subcategories._id} className='text-left self-start w-auto text-text-secondary'/>
                ))}
                
            </div>
        </div>

        ))}
        

    </div>
  )
}

export default DesktopDropdownMenu