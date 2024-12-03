import { Outlet } from "react-router-dom"
import {Header,Footer} from "../index"


  
  const MainLayout = () => {
    return (
      <>
       <Header/>
  <Outlet/>
  <Footer/>
      </>
    )
  }
  
  export default MainLayout