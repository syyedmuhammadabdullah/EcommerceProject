import { BarsOutlined, CarryOutFilled, DashboardFilled, DashboardOutlined, DownOutlined, HeartOutlined, HistoryOutlined, LayoutOutlined, LogoutOutlined, SettingOutlined, ShoppingCartOutlined, UpOutlined, UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import logoutUser from '../store/slices/userSlice/logoutUser';
import { clearWishlist } from '../store/slices/wishlist/wishlishSlice';
import { clearAddress, clearCart, clearOrders } from '..';

const VerticleNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuExpand,setMenuExpand]=useState(true)
const dispatch=useDispatch()
const navigate=useNavigate()
  const handleLogout=()=>{
    dispatch(logoutUser())
    dispatch(clearWishlist())
    dispatch(clearAddress())
    dispatch(clearCart())
    dispatch(clearOrders())
   navigate("/")
  }

  return (
    <div className={`sidebar w-full transition-all duration-300 ${menuExpand? "lg:w-[230px]":"lg:w-[35px]" } relative lg:sticky border-2 lg:h-screen flex justify-between flex-col`}>

   <nav className='lg:h-full w-full overflow-scroll lg:overflow-hidden flex items-center lg:block '>


  <Link to={"./dashboard"}  className="w-full list-none flex items-center gap-xs p-sm cursor-pointer">
      <DashboardOutlined/>
      <div className="menu flex w-full justify-between">
      <li>Dashboard</li>
      </div>
  </Link>

  <Link to={"./order-history"}  className="w-full list-none flex items-center gap-xs p-sm cursor-pointer">
      <HistoryOutlined/>
      <div className="menu flex w-full justify-between">
      <li>Order history</li>
      
      </div>
  </Link>

  <Link to={"./track-order"}  className=" list-none flex items-center gap-xs p-sm cursor-pointer">
      <LayoutOutlined/>
      <div className="menu flex w-full justify-between">
      <li>Track order</li>
      </div>
  </Link>
  <Link to={"./my-reviews"}  className=" list-none flex items-center gap-xs p-sm cursor-pointer">
      <LayoutOutlined/>
      <div className="menu flex w-full justify-between">
      <li>My reviews</li>
      </div>
  </Link>

  <Link to={"./shoping-cart"}  className=" list-none flex items-center gap-xs p-sm cursor-pointer">
      <ShoppingCartOutlined/>
      <div className="menu flex w-full justify-between">
      <li>Shoping cart</li>
      </div>
  </Link>

  <Link to={"./wishlist"}  className=" list-none flex items-center gap-xs p-sm cursor-pointer">
      <HeartOutlined/>
      <div className="menu flex w-full justify-between">
      <li>WishList</li>
      </div>
  </Link>

  <Link to={"./address-cards-setting"}  className=" list-none flex items-center gap-xs p-sm cursor-pointer">
      <CarryOutFilled/>
      <div className="menu flex w-full justify-between">
      <li>Address Book</li>
      </div>
  </Link>

  <div className="dropdown -order-1">
    
    <div className="navItem list-none flex items-center gap-xs p-sm cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
      <UserOutlined/>
      <div className="menu flex w-full justify-between">
      <li>Account</li>
     {menuOpen ? <UpOutlined/> : <DownOutlined/>} 
      </div>

     </div>
     <div className={`${menuOpen ? "block" : "hidden"} z-20 absolute left-0 lg:static bg-white dropdownItem  list-none`}>
      <li className='block pt-p-xxs pr-p-md pb-p-xs pl-p-xl  lg:h-[52px]'><SettingOutlined/> <Link to={"./basic-settings"} >Basic settings</Link></li>
      <li className='block pt-p-xxs pr-p-md pb-p-xs pl-p-xl overflow-hidden lg:h-[52px]'><SettingOutlined /> <Link to={"./advance-settings"} >Advance settings</Link></li>
      <li className='block pt-p-xxs pr-p-md pb-p-xs pl-p-xl  lg:h-[52px]'><SettingOutlined /> <Link to={"./security-settings"} >Security settings</Link></li>
      <li className='block pt-p-xxs pr-p-md pb-p-xs pl-p-xl lg:h-[52px]'><SettingOutlined /> <Link to={"./notification-settings"} >Notification settings</Link></li>
     </div>
  </div>

  <div onClick={handleLogout} className=" list-none flex items-center gap-xs p-sm cursor-pointer">
      <LogoutOutlined/>
      <div className="menu flex w-full justify-between">
      <li>Logout</li>
      </div>
  </div>

   </nav>

   <div className={` hidden lg:block expandMneu cursor-pointer `} onClick={()=>setMenuExpand(!menuExpand)}>
   <BarsOutlined className='text-xxl'/>
   </div>
    </div>
  )
}

export default VerticleNavbar
