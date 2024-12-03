import React, { useState } from 'react'
import { Input ,Button} from '../../../index'
import { SearchOutlined,RightOutlined } from '@ant-design/icons'
import DropDownMenu from './DropDownMenu'
import { useSelector } from 'react-redux'
const TopLevelMenu = () => {
  const [categoryClick, setCategoryClick] = useState(false)
  const [mainCategoryName, setMainCategoryName] = useState('')
  const {user,loading} =useSelector(state=>state.auth)
  const handleToggle = (e) => {
    setCategoryClick(!categoryClick)
    setMainCategoryName(e.target.innerText)
  }
  return (
<>
    <div className="TopLevelMenu w-screen relative min-h-screen flex flex-col gap-lg bg-white px-p-md">
    <div className="searchContainer">
    <div className="searchbox ">
  
  <Input type='text' placeholder="Search" name='search' icon={<SearchOutlined className='text-icon-default'/>}/>
    </div>
    </div>
<div className="menuContainer text-text-default text-base flex flex-col gap-xxs">

  <div className="menuitem h-control-lg flex items-center">
    <div className="menubtn w-full flex justify-between" onClick={(e) => handleToggle(e)}>
      <span>Product</span>
      <RightOutlined/>
    </div>
  </div>
  <div className="menuitem h-control-lg flex items-center ">
    <div className="menubtn w-full flex justify-between" onClick={(e) => handleToggle(e)}>
      <span>Brands</span>
      <RightOutlined/>
    </div>
  </div>
  <div className="menuitem h-control-lg flex items-center ">
    <div className="menubtn w-full flex justify-between">
      <span>Sales</span>
      <RightOutlined/>
    </div>
  </div>

</div>

<div className="infobutton  ">

<Button children='Sign In' className=' w-full py-p-xs rounded-md  text-text-default text-left' />
<Button children='Sign In' className=' w-full py-p-xs rounded-md text-text-default text-left' />
</div>
{
  user? <p>{user.fullName} user</p>:<div className="formButton flex flex-col gap-xs">
  <Button children='Sign Up' className='bg-primary-base w-full py-p-xs rounded-md' />
  <Button children='Sign In' className=' w-full py-p-xs rounded-md text-text-default' />
  
  </div>
}




    {categoryClick && <DropDownMenu setCategoryClick={setCategoryClick} categoryClick={categoryClick} mainCategoryName={mainCategoryName}/>}
    </div>
  </>
  )
}

export default TopLevelMenu