import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { adminSignOut } from '../../redux/admin/adminSlice';


function HeaderAdmin() {
  const { adminUser } = useSelector((state) => state.admin);
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  useEffect(()=>{
    if(!adminUser){
      navigate("/admin/signin")
    }
  },[adminUser,navigate])

 const handleSignout = async ()=>{
  await fetch("/api/admin/signout")
  dispatch(adminSignOut())
  navigate("/admin/signin")
 }
  return (
    <div className="bg-slate-300">
      <div className="flex justify-between items-center max max-w-7xl mx-auto p-3">
        <h1 className="font-bold">Admin DashBoard</h1>
        <ul className="flex gap-4">
          <li className="cursor-pointer" onClick={handleSignout}>{adminUser ? "SignOut" : "SignIn"}</li>

          <img
            className="w-7 h-7 rounded-full object-cover"
            src={adminUser && adminUser.profilePicture}
            alt="image"
          />
        </ul>
      </div>
    </div>
  )
}

export default HeaderAdmin
