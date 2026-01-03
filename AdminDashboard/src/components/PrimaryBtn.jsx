import React from 'react'

const PrimaryBtn = ({children}) => {
  return (
    <div>
        <button className='primary-btn w-[76px] h-[32px] bg-primary-base text-white rounded-md border hover:bg-primary-hover'>{children?  children:"Button" }</button>
    </div>
  )
}
export default PrimaryBtn
