import React, { useState } from 'react'
import { BarsOutlined,CloseOutlined, DashboardOutlined, UpOutlined  } from '@ant-design/icons'
import { Link } from 'react-router-dom';
const SidebarMenu = () => {



    const [sideBArToggle, setSideBArToggle] = useState(true);
    
    const [isActive, setIsActive] = useState("")
   const links = [
      {name:"Dashboard",icon:<DashboardOutlined/> ,link:"/dashboard"},
      {name:"Orders",icon:<DashboardOutlined/>,link:"/order-history"},
      {name:"Products",icon:<DashboardOutlined/>,link:"/products"},
      {name:"Product questions",icon:<DashboardOutlined/>,link:"/product-questions"},
      {name:"Withdrawals",icon:<DashboardOutlined/>,link:"/withdrawals"},
      {name:"Coupons",icon:<DashboardOutlined/>,link:"/coupons"},
      {name:"Wallet",icon:<DashboardOutlined/>,link:"/wallet"},

      {name:"Shipping",icon:<DashboardOutlined/>,link:"/shipping"},
      {name:"Inventory",icon:<DashboardOutlined/>,link:"/inventory"},
      {name:"Reports",icon:<DashboardOutlined/>,link:"/reports"},
      {name:"Customers",icon:<DashboardOutlined/>,link:"/customers"},
      {name:"Analytics",icon:<DashboardOutlined/>,link:"/analytics"},
      {name:"Settings",icon:<DashboardOutlined/>,link:"/settings"},

   ]


  return (
    <div className={`${sideBArToggle ? "w-[264px]" : "w-[72px]"} no-scrollbar overflow-scroll flex flex-col gap-lg p-p-xxs  h-screen`}>
        <div className="togglesidebar p-p-lg flex gap-sm sticky top-0 bg-white">
            {sideBArToggle? <CloseOutlined onClick={() => setSideBArToggle(false)}/>: <BarsOutlined onClick={() => setSideBArToggle(true)}/>}
                {sideBArToggle&& <h4>Company Name</h4>}
        </div>


            <div className="sidebarItems  flex flex-col gap-md ">
                

            {links.map((link, index) => (
               <Link to={link.link}>
                <div className={`${isActive === index ? "bg-background-controlItemBgActive rounded-lg text-primary-base":""} px-p-lg h-[40px] items-center sidebarItem flex gap-xs cursor-pointer`} key={index} onClick={()=>setIsActive(index)}>
                   <span>{link.icon}</span> {sideBArToggle && <p>{link.name}</p>}
                </div>
               </Link>
            ))}




            <div className="sidebarDropdownItems">

                <div className="sidebarItem ">
                  <div className="btn flex gap-xs">
                     <span><DashboardOutlined/></span> {sideBArToggle && <p>Dashboard</p>}
                    {sideBArToggle &&
                     <span className='block ml-auto mr-lg'><UpOutlined/></span>}
                     </div> 

                     {sideBArToggle && 
                     <div className="childContainer pl-p-lg">
                     <div className="child  h-[40px] flex items-center">
                      <p>Test</p>
                      </div>
                      <div className="child  h-[40px] flex items-center">
                         <p>Test</p>
                      </div>
                      </div>
                     }
                     
                </div>
            </div>
              
            </div>






    </div>
  )
}

export default SidebarMenu