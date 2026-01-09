import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
const MainLayout = () => {
  return (
    <div className="xl:min-w-screen-2xl lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row">

      {/* Sidebar */}
      <div className="navbar max-w-full shrink-0   overflow-y-auto no-scrollbar">
        <SidebarMenu />
      </div>

      {/* Content */}
      <div className="content flex-1 min-h-screen bg-background-layout overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
