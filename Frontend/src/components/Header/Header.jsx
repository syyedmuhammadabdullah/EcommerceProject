import HeaderTop from "./HeaderTop"
import HeaderNavbar from "./HeaderNavbar"
import HeaderMobileMenu from "./MobileNavbars/HeaderMobileMenu"
import { useMediaQuery } from "react-responsive"
const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <header className="">
      {/* <div className="2xl:max-w-screen-2xl "> */}
    <HeaderTop/>
    {isMobile ? <HeaderMobileMenu/> : <HeaderNavbar/>}

      {/* </div> */}
  
       
    </header>
  )
}

export default Header