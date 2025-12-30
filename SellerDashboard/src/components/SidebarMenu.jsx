import React, { useState } from 'react'
import { BarsOutlined,CloseOutlined, DashboardOutlined, UpOutlined  } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { logoutSeller } from '../index';
const SidebarMenu = () => {

const dispatch = useDispatch();

const handleLogout = () => {   
    dispatch(logoutSeller());
}

    const [sideBArToggle, setSideBArToggle] = useState(true);
    
    const [isActive, setIsActive] = useState("")
   const links = [
      {name:"Dashboard",icon:<DashboardOutlined/> ,link:"/dashboard"},
      {name:"Orders",icon:<DashboardOutlined/>,link:"/order-history"},
      {name:"Products",icon:<DashboardOutlined/>,link:"/products"},
      {name:"Customers",icon:<DashboardOutlined/>,link:"/customers"},
      {name:"Product questions",icon:<DashboardOutlined/>,link:"/product-questions"},
      {name:"Withdrawals",icon:<DashboardOutlined/>,link:"/withdrawals"},
      {name:"Coupons",icon:<DashboardOutlined/>,link:"/coupons"},
      {name:"Wallet",icon:<DashboardOutlined/>,link:"/wallet"},
      {name:"Settings",icon:<DashboardOutlined/>,link:"/settings"},
      {name:"Logout",icon:<UpOutlined/>,link:"", btn:handleLogout},

   ]


  return (
    <div className={`${sideBArToggle ? "lg:w-[264px]" : "lg:w-[72px]"} transition-all duration-300 no-scrollbar w-full overflow-scroll flex flex-col gap-lg p-p-xxs  lg:h-screen`}>
        <div className="togglesidebar hidden  p-p-lg lg:flex gap-sm sticky top-0 bg-white">
            {sideBArToggle? <CloseOutlined onClick={() => setSideBArToggle(false)}/>: <BarsOutlined onClick={() => setSideBArToggle(true)}/>}
                {sideBArToggle&& <h4>Company Name</h4>}
        </div>


            <div className="sidebarItems lg:items-start  items-center flex lg:flex-col gap-md ">
                

            {links.map((link, index) => (
               link.btn ?  <div className={`${isActive === index ? "bg-background-controlItemBgActive rounded-lg text-primary-base":""} px-p-lg h-[40px] items-center sidebarItem flex gap-xs cursor-pointer  whitespace-nowrap`} key={index} onClick={()=>link.btn()}>
                   <span className='hidden lg:block'>{link.icon}</span> {sideBArToggle && <p>{link.name}</p>}
                </div>:
               < Link  to={link.link} key={index}>
                <div className={`${isActive === index ? "bg-background-controlItemBgActive rounded-lg text-primary-base":""} px-p-lg h-[40px] items-center sidebarItem flex gap-xs cursor-pointer  whitespace-nowrap`} key={index} onClick={()=>setIsActive(index)}>
                   <span className='hidden lg:block'>{link.icon}</span> {sideBArToggle && <p>{link.name}</p>}
                </div>
               </Link>
            ))}
              
            </div>

    </div>
  )
}

export default SidebarMenu