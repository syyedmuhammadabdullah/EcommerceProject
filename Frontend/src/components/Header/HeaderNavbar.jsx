import React,{useEffect, useState} from 'react'
import {Button, Input,filterProduct,setSearchProduct} from '../../index';
import { SearchOutlined,ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import DesktopDropdownMenu from './DesktopDropdownMenu';
import ProfileMenu from '../ProfileMenu';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
const HeaderNavbar = () => {
  const [search, setsearch] = useState("")
  const [menuOpend, setMenuOpend] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {isAuthenticated}=useSelector(state=>state.auth);
  const {cartItems}=useSelector(state=>state.cart);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
 
  const handleSearch=()=>{
    if (location.pathname !== "/product-filter") {
      dispatch(setSearchProduct(search))
      navigate("/product-filter")
    }
      
    dispatch(setSearchProduct(search))
   
  }
  
  return (
    <>
    <section className="container mx-auto flex justify-between w-full items-center relative  text-text-default py-p-xs px-p-md sm:px-p-lg sm:py-p-xs">
    <div className="left flex gap-xl">
    <div className="logo">Logo</div>
    <div className="menu flex gap-6">
   
    <div className="menuItems flex gap-x-6">
      <Button children="Products" className="text-text-default" onClick={() => setMenuOpend(!menuOpend)}/>
      <Link to="/" className="text-text-default"><Button children="Home" className="text-text-default" /></Link>
      
      <Link to="/about" className="text-text-default"><Button children="About" className="text-text-default" /></Link>
      
    </div>
 
    </div>
    </div>
    <div className="right flex gap-xl">
      <div className="search">
        <Input placeholder="Search" divClassName=' py-p-xxs px-p-xs' inputClassName="outline-none " value={search} onChange={(e) => setsearch(e.target.value)} icon={<SearchOutlined className="text-icon-default" onClick={handleSearch}/> }/>
      </div>
      <div className="rightmenu flex gap-xl">
        {!isAuthenticated&& <>
          <Link to="/login" ><Button children="Login" className="text-text-default" /></Link>
          <Link to="/register" ><Button children="Register" className="text-white bg-primary-base px-p-md py-p-xxs rounded-md" /></Link>
        </>}
      
        <Link to="/shoping-cart"><Button children={<ShoppingOutlined className="relative" />} className="text-text-default" /> <span>{cartItems?.items?.length}</span></Link>
        
       {isAuthenticated&& <Button children={<UserOutlined />} className="text-text-default" onClick={() => setProfileOpen(!profileOpen)}/>
       }
        
      </div>
    </div>
      </section>
      {menuOpend && <DesktopDropdownMenu/>}
      {profileOpen && <ProfileMenu/>}
      </>
  )
}

export default HeaderNavbar