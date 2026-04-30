import React,{useEffect, useState} from 'react'
import {Button, Input,} from '../index';
import { SearchOutlined,ShoppingOutlined, UserOutlined,BellOutlined } from '@ant-design/icons';
// import DesktopDropdownMenu from './DesktopDropdownMenu';
import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
const HeaderNavbar = () => {
  const [search, setsearch] = useState("")
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {unreadCount} = useSelector((state) => state.notifications);

 
  const handleSearch=()=>{

   
  }
  
  return (
    <>
    <section className="container bg-white sticky top-0 z-50 h-[50px] mx-auto flex justify-between w-full items-center   text-text-default py-p-xs px-p-md sm:px-p-lg sm:py-p-xs">
    <div className="left flex gap-xl">
    <div className="logo">Logo</div>
    <div className="menu flex gap-6">
   
   
 
    </div>
    </div>
    <div className="right flex gap-xl">
      
      <div className="rightmenu flex gap-xl">
   
      
       <Button children={<BellOutlined className='text-lg'/>} className='relative' onClick={() => setNotificationOpen(!notificationOpen)}/>
    {unreadCount !== null && unreadCount > 0 &&  <div className='count absolute top-0 right-[80px] text-white h-3 w-3'><span className='bg-red-400 text-md  px-sm  flex items-center justify-center rounded-lg'>{ unreadCount }</span></div>}
      <Button children={<UserOutlined className='text-lg' />} className="text-text-default" onClick={() => setProfileOpen(!profileOpen)}/>
       
        
      </div>
    </div>
      </section>
      {notificationOpen && <Notification/>}
      {profileOpen && <ProfileMenu/>}
      </>
  )
}

export default HeaderNavbar