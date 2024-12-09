import React from 'react'
import Stepper from './Stepper'
const ProductForm = () => {
    const steps=[
        {
            id:1,
            title:"step1",
            content:"content1",
            component:()=><h1>step1</h1>
        },
        {
            id:2,
            title:"step2",
            content:"content2",
            component:()=><h1>step2</h1>
        },
        {
            id:3,
            title:"step3",
            content:"content3",
            component:()=><h1>step3</h1>
        },
        {
            id:4,
            title:"step4",
            content:"content4",
            component:()=><h1>step4</h1>
        },
        {
            id:5,
            title:"step5",
            content:"content5",
            component:()=><h1>step5</h1>
        }
    ]

  return (
    <div className='w-full px-8'>
        <Stepper steps={steps}/>
    </div>
  )
}

export default ProductForm