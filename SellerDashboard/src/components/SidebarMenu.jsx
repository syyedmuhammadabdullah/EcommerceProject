import React, { useState } from 'react'
import { BarsOutlined,CloseOutlined, DashboardOutlined, UpOutlined  } from '@ant-design/icons'
const SidebarMenu = () => {



    const [sideBArToggle, setSideBArToggle] = useState(true);
    
    const [isActive, setIsActive] = useState("")



  return (
    <div className={`${sideBArToggle ? "w-[264px]" : "w-[72px]"} no-scrollbar overflow-scroll flex flex-col gap-lg p-p-xxs bg-red-200 h-screen`}>
        <div className="togglesidebar p-p-lg flex gap-sm sticky top-0">
            {sideBArToggle? <CloseOutlined onClick={() => setSideBArToggle(false)}/>: <BarsOutlined onClick={() => setSideBArToggle(true)}/>}
                {sideBArToggle&& <h4>Company Name</h4>}
        </div>


            <div className="sidebarItems  flex flex-col gap-md ">
                

            {Array.from({length: 3}).map((_, index) => (
                <div className={`${isActive === index ? "bg-background-controlItemBgActive rounded-lg text-primary-base":""} px-p-lg h-[40px] items-center sidebarItem flex gap-xs cursor-pointer`} key={index} onClick={()=>setIsActive(index)}>
                   <span><DashboardOutlined/></span> {sideBArToggle && <p>Dashboard</p>}
                </div>
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

                <div className="sidebarItem flex gap-xs">
                   <span><DashboardOutlined/></span> {sideBArToggle && <p>Dashboard</p>}
                </div>
                <div className="sidebarItem flex gap-xs">
                   <span><DashboardOutlined/></span> {sideBArToggle && <p>Dashboard</p>}
                </div>
                <div className="sidebarItem flex gap-xs">
                   <span><DashboardOutlined/></span> {sideBArToggle && <p>Dashboard</p>}
                </div>
                <div className="sidebarItem flex gap-xs">
                   <span><DashboardOutlined/></span> {sideBArToggle && <p>Dashboard</p>}
                </div>
                <div className="sidebarItem flex gap-xs">
                   <span><DashboardOutlined/></span> {sideBArToggle && <p>Dashboard</p>}
                </div>
              
            </div>






    </div>
  )
}

export default SidebarMenu