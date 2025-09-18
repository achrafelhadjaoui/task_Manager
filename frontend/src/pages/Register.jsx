import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiEndpoints } from '../common';
import { toast } from 'react-toastify';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {

      const dataResponse = await fetch(apiEndpoints.signUp.url, {
        method: apiEndpoints.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/signin");
      }

      if (!dataApi.success) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check the password and confirm it");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  return (
    <div className="h-screen w-screen flex justify-center items-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={data.name} 
              onChange={handleChange} 
              required 
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={data.email} 
              onChange={handleChange} 
              required 
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={data.password} 
              onChange={handleChange} 
              required 
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={data.confirmPassword} 
              onChange={handleChange} 
              required 
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link 
            to="/signin" 
            className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
