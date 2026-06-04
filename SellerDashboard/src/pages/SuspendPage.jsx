import React,{useEffect, useState} from 'react'
import {Button, Input,appealSellerSuspension} from "../index"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
const SuspendPage = () => {

  const [text,setText] = useState("")
  const {seller,loading}=useSelector(state=>state.seller)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(appealSellerSuspension({text}))
  }
useEffect(()=>{
  if(seller?.accountStatus?.status==="active"){
    navigate("/dashboard")
  }
},[navigate,seller?.accountStatus?.status])

  return (
    <section className=' min-w-full  bg-background-layout grid  gap-4 py-10 min-h-screen max-w-screen-xl lg:gap-xxl  px-p-md lg:p-p-xxl'>
      <div className="content flex flex-col  text-center items-center">
        <h3 className='text-error-base'>Account Suspended</h3>
       {seller?.accountStatus?.status==="suspended"&& <p className='text-text-default text-md mt-2'>"Your account has been suspended. If you believe this is a mistake, Please contact support for further assistance."</p>}
       {seller?.accountStatus?.status==="reviewing"&& <p className='text-text-default text-md mt-2'>"Your account is currently under review. Please wait for further notification."</p>}
      </div>
      {seller?.accountStatus?.status==="suspended"&& <div className="appeal flex flex-col items-center">
        <label htmlFor="textArea">Write a message</label>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} className='w-1/2 h-52 resize-none border outline-none border-border-primary' name="textArea" id="textArea"></textarea>
        <Button disabled={loading} onClick={handleSubmit} children='Submit Appeal' className='mt-4 w-1/2 py-2 px-4 bg-error-base rounded-md text-white' />
      </div>}
     
    </section>
  )
}

export default SuspendPage