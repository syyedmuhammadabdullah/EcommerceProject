import React from 'react'
import {Button} from '../../index'
import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const PromoSectionOne = () => {
  return (
    <main className='PromoSectionOne flex justify-center'>
       <div className="container grid grid-cols-1 text-white">

       
        <div  
  
  className='main-image-Text rounded-md  bg-cover relative bg-no-repeat px-p-xxs py-p-xxl sm:p-xxl grid place-items-center text-center'>
         <div className="bgwrapper rounded-md w-full h-full absolute top-0 bg-[#000000bf]"></div>
        
         <div className='z-10 text-center  items-center flex flex-col gap-lg max-w-[810px]'>
         <h1>Get 25 % off during the new year Sale</h1>
          <p>Our latest cosmetic arrivals have just landed, and they're sure to dazzle you. Check out the freshest makeup, skincare, beauty products and elevate your beauty routine.</p>
         <Link to="/products"> <Button children='Shop Now' className='bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white'/></Link>
         </div>

        </div>
      
      
        <div className="Incentives px-p-smx grid p-xxl gap-xxl text-black ">
           <div className="itemcontainer container 2xl:place-items-center gap-lg sm:gap-xxl md:grid-cols-2 grid grid-cols-1">

            <div className="item flex flex-col md:flex-row gap-lg ">
                       <div className="icon"><HomeOutlined  className='text-primary-base mt-2'/></div>
                        <div className="textcontainer">
              <h3>Home Delivery Available</h3>
              <p>Get your beauty products delivered straight to your door, saving you time and effort.</p>
                      </div>
            </div>
            <div className="item flex flex-col md:flex-row gap-lg ">
                       <div className="icon"><HomeOutlined className='text-primary-base mt-2'  /></div>
                        <div className="textcontainer">
              <h3>Home Delivery Available</h3>
              <p>Get your beauty products delivered straight to your door, saving you time and effort.</p>
                      </div>
            </div>
            <div className="item flex flex-col md:flex-row gap-lg ">
                       <div className="icon"><HomeOutlined className='text-primary-base mt-2'  /></div>
                        <div className="textcontainer">
              <h3>Home Delivery Available</h3>
              <p>Get your beauty products delivered straight to your door, saving you time and effort.</p>
                      </div>
            </div>
            <div className="item flex flex-col md:flex-row gap-lg ">
                       <div className="icon"><HomeOutlined className='text-primary-base mt-2'  /></div>
                        <div className="textcontainer">
              <h3>Home Delivery Available</h3>
              <p>Get your beauty products delivered straight to your door, saving you time and effort.</p>
                      </div>
            </div>


           </div>
        </div>
        </div>
    </main>
  )
}

export default PromoSectionOne