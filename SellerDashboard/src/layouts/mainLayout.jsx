import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
const mainLayout = () => {

  return (
    <>
        <div className='layout max-w-screen-2xl lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row'>
      <div className="navbar hidden lg:block lg:sticky  top-0 left-0">
    <SidebarMenu/>
      </div>
      <div className="content w-full min-h-screen bg-background-layout overflow-y-auto">
    <Outlet/>

      </div>

    </div>
    </>

  )
}

export default mainLayout