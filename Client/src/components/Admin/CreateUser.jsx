import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setPasswordError('');
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are mandatory');
      return;
    }

    const password = formData.password;
    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must have at least 8 characters & must include one number and one special character");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/admin/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials:'include'
      });

      const data = await res.json();
      setLoading(false);

      if (!data.success) {
        setError(data.message || 'An error occurred');
        return;
      }

      navigate('/admin/dashboard');
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-center my-8 text-3xl font-bold">Create User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-2 rounded-lg"
          onChange={handleChange}
        />
        {passwordError && <p className="text-red-600">{passwordError}</p>}
        <button
          className="bg-slate-950 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 mt-4"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create User"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
    </div>
  );
}

export default CreateUser;
