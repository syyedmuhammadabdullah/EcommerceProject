import React, { useEffect, useState } from 'react'
import {
    BarsOutlined,
    CloseOutlined,

  DashboardOutlined,
  ShoppingCartOutlined,
  ProductOutlined,
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  DollarOutlined,
  GiftOutlined,
  WalletOutlined,
  SettingOutlined,
  LogoutOutlined,
  UpOutlined,
} from "@ant-design/icons";

import { Link, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { logoutAdmin } from '../index';
const SidebarMenu = () => {
const location=useLocation();
const dispatch = useDispatch();


const handleLogout = () => {   
    dispatch(logoutAdmin());
}

    const [sideBArToggle, setSideBArToggle] = useState(true);
    
    const [isActive, setIsActive] = useState(location.pathname==="/"?"/dashboard":location.pathname);
   const links = [
      {name:"Dashboard",icon:<DashboardOutlined/> ,link:"/dashboard"},
      {name:"Orders",icon:<ShoppingCartOutlined/>,link:"/order-history"},
      {name:"Products",icon:<ProductOutlined/>,link:"/products"},
      {name:"Customers",icon:<UserOutlined/>,link:"/customers"},
      {name:"Sellers",icon:<TeamOutlined/>,link:"/sellers"},
      {name:"Main Categories",icon:<AppstoreOutlined/>,link:"/categories/main"},
      {name:"Sub Categories",icon:<ApartmentOutlined/>,link:"/categories/submain"},
      {name:"Seller Withdrawals",icon:<DollarOutlined/>,link:"/seller-withdraw-requests"},
      {name:"Withdrawals",icon:<DollarOutlined/>,link:"/withdrawals"},
      {name:"Coupons",icon:<GiftOutlined/>,link:"/coupons"},
      {name:"Wallet",icon:<WalletOutlined/>,link:"/wallet"},
      {name:"Settings",icon:<SettingOutlined/>,link:"/settings"},
      {name:"Logout",icon:<LogoutOutlined/>,link:"", btn:handleLogout},

   ]


  return (
    <div className={`${sideBArToggle ? "lg:w-[264px]" : "lg:w-[72px]"} transition-all duration-300 no-scrollbar w-full overflow-scroll flex flex-col gap-lg p-p-xxs  lg:h-screen`}>
        <div className="togglesidebar hidden  p-p-lg lg:flex gap-sm sticky top-0 bg-white">
            {sideBArToggle? <CloseOutlined onClick={() => setSideBArToggle(false)}/>: <BarsOutlined onClick={() => setSideBArToggle(true)}/>}
                {sideBArToggle&& <h4>Company Name</h4>}
        </div>


            <div className="sidebarItems lg:items-start  items-center flex lg:flex-col gap-md ">
                

            {links.map((link, index) => (
               link.btn ?  <div className={`${isActive === link.link  ? "bg-background-controlItemBgActive rounded-lg text-primary-base":""} px-p-lg h-[40px] items-center sidebarItem flex gap-xs cursor-pointer  whitespace-nowrap`} key={index} onClick={()=>link.btn()}>
                   <span className='hidden lg:block'>{link.icon}</span> {sideBArToggle && <p>{link.name}</p>}
                </div>:
               < Link  to={link.link} key={index}>
                <div className={`${isActive === link.link ? "bg-background-controlItemBgActive rounded-lg text-primary-base":""} px-p-lg h-[40px] items-center sidebarItem flex gap-xs cursor-pointer  whitespace-nowrap`} key={index} onClick={() => setIsActive(link.link)}>
                   <span className='hidden lg:block'>{link.icon}</span> {sideBArToggle && <p>{link.name}</p>}
                </div>
               </Link>
            ))}
              
            </div>

    </div>
  )
}

export default SidebarMenu