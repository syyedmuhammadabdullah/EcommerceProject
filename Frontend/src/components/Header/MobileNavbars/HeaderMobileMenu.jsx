import React, { useState } from "react";

import {Button} from "../../../index";

import {
  MenuOutlined,
  CloseOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import TopLevelMenu from "../MobileNavbars/TopLevelMenu";
import ProfileMenu from "../../ProfileMenu";
const HeaderMobileMenu = () => {
  const [menuOpend, setMenuOpend] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
    <section className=" flex justify-center w-full  text-text-default py-p-xs px-p-md sm:px-p-lg sm:py-p-xs">
      <div className="container flex justify-between">
        <div className="left">
          <Button
            children={menuOpend ? <CloseOutlined />: <MenuOutlined />}
            onClick={() => setMenuOpend(!menuOpend)}
            className={` w-xl h-xl text-md rounded-md ${menuOpend && "bg-border-secondary"}`}
          />
        </div>
          
        <div className="center">
          <Button children={<ShoppingOutlined className="text-[20px]" />} />
        </div>
        <div className="right flex gap-xs">
          <Button
            children={<ShoppingOutlined className="text-md" />}
            className=" w-xl h-xl"
          />
          <Button
            children={<UserOutlined className="text-md" onClick={() => setProfileOpen(!profileOpen)}/>}
            className=" w-xl h-xl"
          />
        </div>
      </div>
    </section>
    {menuOpend && <TopLevelMenu/>}
    {profileOpen && <ProfileMenu/>}
    </>
  );
};

export default HeaderMobileMenu;
