import React from "react";

const Board = () => {
  return (
    <div className="mx-4 bg-white hover:bg-slate-100 rounded-lg overflow-hidden relative shadow-md p-6 ">
      
      {/* Status bar on the left */}
      <div className="absolute top-0 left-0 h-full w-2 bg-indigo-600 rounded-l-lg"></div>

      {/* Board title */}
      <h1 className="text-lg font-semibold text-gray-800 text-center mb-4">Board Title</h1>
      <p className="text-sm text-gray-600 mb-6 text-center">Board description goes here</p>

      {/* Status selection */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name="status" 
            className="w-5 h-5 accent-indigo-600 rounded-md appearance-none border-2 border-gray-300 checked:bg-indigo-600 checked:border-indigo-600" 
          />
          <span className="text-gray-700">To Do</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name="status" 
            className="w-5 h-5 accent-yellow-400 rounded-md appearance-none border-2 border-gray-300 checked:bg-yellow-400 checked:border-yellow-400" 
          />
          <span className="text-gray-700">In Progress</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name="status" 
            className="w-5 h-5 accent-green-500 rounded-md appearance-none border-2 border-gray-300 checked:bg-green-500 checked:border-green-500" 
          />
          <span className="text-gray-700">Completed</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end text-sm text-indigo-600 font-medium cursor-pointer mt-6 gap-2">
        <span className="hover:underline">View</span>
        <span>|</span>
        <span className="hover:underline">Edit</span>
        <span>|</span>
        <span className="hover:underline text-red-600">Delete</span>
      </div>
    </div>
  );
};

export default Board;
