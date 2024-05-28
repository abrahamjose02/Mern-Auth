import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditUser() {
    const {userId} = useParams()
    console.log(userId)
    const[user, setUser] = useState({})
    const[formData, setFormData] = useState({})
    const navigate = useNavigate()
    

    useEffect(()=>{
        getUser()
    },[])


    const getUser=async()=>{
        const res = await fetch(`http://localhost:3000/api/admin/getUser/${userId}`,{
          method:'GET',
          credentials:'include'
        })
        const data =await res.json()
        
        setUser(data)
    }

    const handleChange = (e)=>{
       setFormData({...formData, [e.target.id]:e.target.value})
    }

    const handleUpdate = async (e)=>{
        e.preventDefault()
        try {
          const res = await fetch(`http://localhost:3000/api/admin/updateUser/${userId}`,{
              method:"POST",
              headers:{
                  "Content-Type": "application/json"
              },
              credentials:'include',
              body:JSON.stringify(formData)
          })
          const data = await res.json()
          console.log(data)
          navigate("/admin/dashboard")
          if(data.success){
              
              navigate("/admin/dashboard")
          }
        } catch (error) {
          console.log(error);
        }
}
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-center my-8 text-3xl font-bold">Edit User</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={user.username}
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg"
          
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={user.email}
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg" 
        />
        
        <button className="bg-slate-950 text-white rounded-lg p-3 uppercase mt-2 hover:opacity-90">
         update
        </button>
      </form>
    </div>
  )
}

export default EditUser
