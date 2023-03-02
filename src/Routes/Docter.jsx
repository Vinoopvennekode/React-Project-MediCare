import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Docter/Signup";
import Register from "../Pages/Docter/Register";
import Approval from "../Pages/Docter/Approval";
import Home from '../Pages/Docter/DocterHome'
import Signin from '../Pages/Docter/Signin'
import Schedule from '../Pages/Docter/ScheduleTime'
import Calender from '../Pages/Docter/calender'
function Admin() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/calender" element={<Calender/>} />



      </Routes>
    </>
  );
}

export default Admin;
