import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";

const UserChecked = () => {
  const { user, authChecked } = useSelector((state) => state.user);

  if (!authChecked) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ImSpinner2 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default UserChecked;