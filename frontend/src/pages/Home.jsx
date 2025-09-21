import React, { use } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {
  
  const user = useSelector((state) => state.user);


  return (
    <div className="h-screen w-screen flex flex-col md:flex-row justify-center items-center px-6">
      
      {/* Left section: Text */}
      <div className="text-center md:text-left md:mr-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Manage Your Tasks
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          The best place where you can organize and manage your tasks efficiently.
        </p>
        <Link to="/signin"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
          Get Started
        </Link>
      </div>

      {/* Right section: Illustration (optional) */}
      <div className="mt-8 md:mt-0">
        <img 
          src="https://media.istockphoto.com/id/1354770625/vector/assignment-target-icon-clipboard-checklist-symbol-3d-vector-illustration-project-task.jpg?s=612x612&w=0&k=20&c=gVBSjb_4zD7TRNvg1U9hA6ybX5RvuluFpkpm5b-Z9Co=" 
          alt="Tasks Illustration" 
          className="w-72 mix-blend-multiply md:w-96"
        />
      </div>
    </div>
  );
};

export default Home;
