import React from 'react'
import {ProductContainer} from "../../index"
const ProductWithCategory = ({
    category
}) => {
  return (
    <section className='flex justify-center'>

        <div className="container   flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">
            <div className="content">
                <h3>SmartPhones</h3>
            </div>


            <div className="itemcontainer mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
               
               <ProductContainer/>
               <ProductContainer/>
               <ProductContainer/>
               <ProductContainer/>
               
                </div>

        </div>
    </section>
  )
}

export default ProductWithCategory