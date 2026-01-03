import React from 'react'
import { WarningFilled, } from '@ant-design/icons'

const InputBox = () => {
  return (
    <div className='w-full h-[32px] border border-warning-border px-2 rounded-md'>  
        <input type="text" placeholder='Search' className=' outline-none w-full  h-full bg-transparent'/>
        
    </div>
  )
}

export default InputBox