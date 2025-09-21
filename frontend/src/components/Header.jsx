import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector} from "react-redux";
import AddTaskModal from "./AddTaskModal";
import Filter from "./Filter";
import { apiEndpoints } from "../common";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { clearUser } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    const fetchData = await fetch(apiEndpoints.logout_user.url,{
      method : apiEndpoints.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(clearUser())
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-100 shadow-sm flex flex-col gap-4 p-4 rounded-b-2xl">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-gray-800 font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative">
              <IoNotificationsOutline size={24} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                3
              </span>
            </button>
            <button className="p-2 rounded-full hover:cursor-pointer hover:border hover:border-red-600 hover:bg-white text-gray-700 hover:text-red-600 transition"
            onClick={handleLogout}>
              <MdLogout size={26} className="" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search boards..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm"
            />
            <GoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition"
            onClick={() => setOpenAddTaskModal(true)}
          >
            <GrAdd size={20} />
          </button>
        </div>
        <Filter/>
      </header>

      {openAddTaskModal && (
        <AddTaskModal onClose={() => setOpenAddTaskModal(false)} />
      )}

      {/* Spacer for header height */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
