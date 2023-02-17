import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from '../Pages/Admin/Dashboard';
import Signin from '../Pages/Admin/Signin';


function Admin() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signin/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      
    </Routes>
  </>
  )
}

export default Admin