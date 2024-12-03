import React from 'react'
import { Button,SelectMenu } from '../../index';
const HeaderTop = () => {


  return (
    <section className='bg-primary-base max-w-screen-2xl mx-auto z-10 flex justify-center w-full text-white py-p-xxs px-p-md sm:px-p-lg sm:py-p-xs'>

    <div className="container  flex justify-center md:justify-between">
     <div className="leftpart hidden md:flex gap-2">
      <div className="currency">
          <SelectMenu options={["USD","PKR","YEN","INR"]} defaultValue={"USD"}/>
      </div>
      <div className="language">
          <SelectMenu options={["English","Urdu","French","Bangla"]} defaultValue={"Urdu"}/>
          
      </div>
     </div>
     <div className="centerpart"><p>Free delivery for orders above Rs.500</p></div>
     <div className="rightpart hidden md:flex gap-4">
      <Button children="Return Policy" className='text-white'/>
      <Button children="Help Center"  className='text-white'/>
     </div>


    </div>
    </section>
  )
}

export default HeaderTop