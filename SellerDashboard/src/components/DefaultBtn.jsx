import React from 'react'

const DefaultBtn = ({children}) => {
  return (
    <div>
    <button className='primary-btn w-[76px] h-[32px] bg-white text-black rounded-md border hover:text-primary-hover'>{children?  children:"Button" }</button>
</div>
  )
}

export default DefaultBtn