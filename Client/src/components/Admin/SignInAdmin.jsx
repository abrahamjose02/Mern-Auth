import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminSignInFailure, adminSignInStart, adminSignInSuccess } from "../../redux/admin/adminSlice";


function SignInAdmin() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const {loading,error} = useSelector((state)=>state.user)
  const handleChange = (e) => {
    setErrorMessage("")
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  console.log(formData);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill out the feilds");
      return;
    }
    try {
        dispatch(adminSignInStart())
    
      const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    console.log(data)
    dispatch(adminSignInSuccess(data))
      if(data.success === false){
        dispatch(adminSignInFailure(data))
        return
      }
      navigate('/admin/dashboard');
    } catch (error) {
    
    dispatch(adminSignInFailure(error))
    }
  };

  return (
    
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading" : "Sign In"}
        </button>
      </form>
      <p className="text-red-600 mt-3 text-center">
          {error ? error.message || "Something went wrong" : ""}
        </p>
        <p className="text-red-600 mt-3 text-center">
          {errorMessage ? errorMessage : ""}
        </p>
    </div>
  );
}

export default SignInAdmin;
