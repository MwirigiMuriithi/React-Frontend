import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/global/navbar/Navbar'

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet allows nested UI ie.. main = /dashboard then nested = /dashboard/settings  ...etc */}
      <Outlet />
    </>
  )
}

export default BaseLayout
