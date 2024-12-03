import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
const SearchBtn = ({OnClick}) => {
  return (
    <div>
        <button OnClick={OnClick} className='primary-btn w-[32px] h-[32px] bg-primary-base text-white rounded-md border hover:bg-primary-hover' onClick={OnClick}><SearchOutlined/></button>
    </div>
  )
}

export default SearchBtn