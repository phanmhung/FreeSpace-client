import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'

function ShareLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default ShareLayout