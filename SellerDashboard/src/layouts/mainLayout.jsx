import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
const mainLayout = () => {

  return (
    <>
        <div className='layout xl:min-w-screen-2xl lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row'>
      <div className="navbar max-w-full overflow-scroll no-scrollbar block lg:sticky  top-0 left-0">
    <SidebarMenu/>
      </div>
      <div className="content w-screen min-h-screen bg-background-layout overflow-y-auto">
    <Outlet/>

      </div>

    </div>
    </>

  )
}

export default mainLayout