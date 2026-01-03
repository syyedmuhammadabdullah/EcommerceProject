import React from 'react'
import {Button, Input} from "../index"
import { InstagramOutlined, TwitterOutlined,FacebookOutlined } from '@ant-design/icons'
const Footer = () => {
  return (
   <footer className=' grid place-items-center'>
   <div className="container justify-around gap-xl py-xxl px-xl place-items-center sm:place-items-stretch sm:gap-xxl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid w-full sm:p-xxl ">

   
    <div className="category flex flex-col gap-xl">
<div className="mainCategory">Shop</div>
<div className="subCategory  flex flex-col gap-sm">  
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
</div>

</div>
    <div className="category flex flex-col gap-xl">
<div className="mainCategory">Shop</div>
<div className="subCategory  flex flex-col gap-sm">  
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
</div>

</div>
    <div className="category flex flex-col gap-xl">
<div className="mainCategory">Shop</div>
<div className="subCategory  flex flex-col gap-sm">  
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
<Button children="Item 1"  className='text-left self-start w-auto text-text-secondary'/>
</div>

</div>
    <div className="category flex flex-col gap-xl col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
<div className="mainCategory">Sign up for our news letter</div>
<div className="subCategory  flex flex-col gap-sm">  
    <p>Get notifications about products discounts and much more</p>
    <div className='flex items-center flex-col gap-xxs '>
    <Input placeholder="Email" divClassName='w-full'/>
    
<Button children="Sign UP"  className='text-center bg-primary-base w-full px-md py-p-xs rounded-lg text-white'/>
    </div>
    <p>you can unsubscribe at any time</p>
    <p>By signing up you agree to our <span className='text-primary-base'>Terms & Conditions</span></p>
</div>

</div>
<div className="copyright flex-col items-center gap-md sm:flex-row col-span-2  md:col-span-3 lg:col-span-4 flex justify-between">
<div className="text">

<p className="text-center">Copyright &copy; 2024. Every PC Solution All Rights Reserved.</p>
</div>
<div className="socialIcons flex gap-base">
    <Button children={<FacebookOutlined className='text-xl'/>} />
    <Button children={<InstagramOutlined className='text-xl'/>} />
    <Button children={<TwitterOutlined className='text-xl'/>} />
</div>
</div>
</div>
   </footer>
  )
}

export default Footer