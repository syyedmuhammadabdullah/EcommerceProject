import React from 'react'
import {Input} from "../index"
const OTP = () => {
  const [otp, setOtp] = React.useState(Array(4).fill(''))
  const optRef = React.useRef([])
  const optBox=Array.from({length:4})

  const handleChange=(e,index)=>{
 console.log(optRef.current[index].value);

    const newOtp=[...otp]
    if (index < optRef.current.length-1) {
      optRef.current[index+1].focus()
      
    }
    newOtp[index]=e.target.value
    setOtp(newOtp)
 
  }

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      console.log("backspace",index);
    
      
      // optRef.current[index-1].select();
      const newOtp = [...otp];

      if (newOtp[index]) {
        // Clear the current box if it's not empty
      
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move focus to the previous box if it's empty
        const test=index-1
        optRef.current[test].focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };
  

  return (
    <div className='flex gap-xxs'>
        {optBox.map((_,index)=>{
            return(
                <Input type="text" key={index} name="otp" className='w-10 outline-none' ref={(el)=>{optRef.current[index]=el}} value={otp[index]} onChange={(e)=>handleChange(e,index)} maxLength={1}
                onKeyDown={(e)=>handleKeyDown(e,index) }/>
            )
        })
        
        }
    </div>
  )
}

export default OTP