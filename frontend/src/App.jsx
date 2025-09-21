import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import { apiEndpoints } from "./common";
import { useDispatch } from "react-redux";
import { setUserDetails, clearUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [reloadFlag, setReloadFlag] = useState(false); // 🔑

  const triggerReload = () => {
    setReloadFlag((prev) => !prev); // toggle value to notify children
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(apiEndpoints.current_user.url, {
        method: apiEndpoints.current_user.method,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.data));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails, reloadFlag, triggerReload }}>
      <ToastContainer position="top-center" />
      <main className="h-full w-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <Outlet />
      </main>
    </Context.Provider>
  );
}

export default App;
