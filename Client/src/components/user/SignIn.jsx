import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSucess, signInFailure, setErrorToNull } from "../../redux/user/userSlice"; // Corrected import path
import OAuth from "./OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorToNull());
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate, dispatch]);

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("All Fields are mandatory");
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSucess(data));
      navigate("/profile");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-bold mb-8">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email" className="text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-gray-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="password" className="text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-gray-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <OAuth/>
      </form>

      <div className="flex justify-center mt-5">
        <p className="text-gray-600">Don't have an Account?</p>
        <Link to="/sign-up" className="text-blue-500 ml-1">Sign Up</Link>
      </div>

      <p className="text-red-600 mt-3 text-center">{error ? error.message || "Something went wrong" : ""}</p>
      <p className="text-red-600 mt-3 text-center">{errorMessage && errorMessage}</p>
    </div>
  );
};

export default SignIn;
