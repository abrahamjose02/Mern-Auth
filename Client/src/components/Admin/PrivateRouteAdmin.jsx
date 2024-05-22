import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function PrivateRouteAdmin() {
   const adminUser =  useSelector(state=>state.admin)  
   
  return (
    adminUser ? <Outlet/> : <Navigate to={'/admin/signin'}/>
  )
}

export default PrivateRouteAdmin

