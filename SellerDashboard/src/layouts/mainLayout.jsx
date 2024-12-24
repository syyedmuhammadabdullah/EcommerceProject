import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
const mainLayout = () => {

  return (
    <>
      <Outlet/>
      <Footer/>
    </>

  )
}

export default mainLayout