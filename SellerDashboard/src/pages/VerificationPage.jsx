import React, { useEffect, useState } from 'react'
import {CheckCircleFilled,CloseCircleFilled,ExclamationCircleFilled } from '@ant-design/icons'
import Button from '../components/Button'
import {useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
const VerificationPage = () => {
  const {seller} = useSelector((state) => state.seller);
  const steps=[
    {id:1, status:"pending"},
    {id:2, status:"underReview"},
    {id:3, status:seller?.verification?.status!=="rejected" ?"verified":"rejected"},
   
  ];
  const navigate = useNavigate();



  const verificationConfig = {
  pending: {
    step: 1,
    title: "Complete Your Verification",
    message:
      "To start selling on our platform, please complete your store verification by providing the required business and identity information. Once submitted, our team will review your application.",
    action: "Complete Verification",
  },

  underReview: {
    step: 2,
    title: "Verification Under Review",
    message:
      "Your verification request has been successfully submitted and is currently being reviewed by our team. This process may take some time. You will be notified once a decision has been made.",
    action: null,
  },

  rejected: {
    step: 3,
    title: "Verification Rejected",
    message:
      "Unfortunately, your verification request could not be approved at this time. Please review the feedback provided, update the required information, and submit your application again for review.",
    action: "Resubmit Information",
  },
};

const status = seller?.verification?.status || "pending";

const currentState = verificationConfig[status];
  const totalSteps = steps.length;
const currentStep = currentState?.step;
const sideMargin = 100 / totalSteps / 2;
const progressWidth =(sideMargin+sideMargin)*(currentStep-1);
  useEffect(() => {
    if (seller?.verification?.status === "verified") {
      navigate("/dashboard");
    }
  }, [seller]);
    

  return (
    <section  className='grid items-center min-w-full bg-white  gap-4 py-10 min-h-screen max-w-screen-xl lg:gap-xxl  px-p-md lg:p-p-xxl'>
   <div className='flex flex-col items-center w-full gap-4'>
     {currentState?.step===2 && <CheckCircleFilled className='text-primary-base text-6xl'/>}
     {currentState?.step===1 && <ExclamationCircleFilled className='text-primary-base text-6xl'/>}
     {currentState?.step===3 && <CloseCircleFilled className='text-error-base text-6xl'/>}
        <h3>{currentState?.title}</h3>

      <p className='text-text-secondary text-center'>{currentState?.message}</p>
     {currentState?.action && <Link to="/settings"> <Button children={currentState?.action} className='bg-primary-base w-fit px-p-md py-p-xxs rounded-sm text-white'/></Link> }
</div>

    </section>
  )
}

export default VerificationPage


