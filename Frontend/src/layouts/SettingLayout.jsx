
import { Outlet } from 'react-router-dom'
import {VerticleNavbar} from "../index"

const SettingLayout = () => {
  return (
    <div className='layout lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row'>
      <div className="navbar lg:sticky top-0 left-0">
    <VerticleNavbar/>
      </div>
      <div className="content bg-background-layout min-h-screen w-full overflow-y-auto">
    <Outlet/>

      </div>

    </div>
  )
}

export default SettingLayout
