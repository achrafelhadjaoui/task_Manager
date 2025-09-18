import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import router from './routes'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
    <ToastContainer position="top-center" />
    <main className="h-screen w-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <Outlet />
      </main>
    </>
  );
}

export default App;

