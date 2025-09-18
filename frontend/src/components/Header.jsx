import React from "react";
import { IoMdMenu } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { useSelector } from "react-redux";

const Header = () => {

  const user = useSelector((state) => state.user);
  console.log("User from Redux:", user);

  return (
    <header className="w-screen bg-slate-100 shadow-sm flex flex-col gap-4 p-4 rounded-b-2xl">
      {/* Top row: Profile + Actions */}
      <div className="flex justify-between items-center">
        {/* Profile */}
        <div className="flex gap-3 items-center">
          <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            N
          </div>
          <div>
            <p className="text-gray-800 font-semibold">{ user.user.name }</p>
            <p className="text-sm text-gray-500">{ user.user.role}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative">
            <IoNotificationsOutline
              size={24}
              className="text-gray-700 hover:text-indigo-600 transition"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              3
            </span>
          </button>
          <button className="p-2 rounded-lg hover:bg-indigo-100 transition">
            <IoMdMenu size={26} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search boards..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:outline-none shadow-sm"
          />
          <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Add button */}
        <button className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition">
          <GrAdd size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
