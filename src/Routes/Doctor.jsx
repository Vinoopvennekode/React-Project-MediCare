import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Doctor/Signup";
import Register from "../Pages/Doctor/Register";
import Approval from "../Pages/Doctor/Approval";
import Reject from "../Pages/Doctor/Reject"
import Home from '../Pages/Doctor/DoctorHome'
import Signin from '../Pages/Doctor/Signin'
import Schedule from '../Pages/Doctor/ScheduleTime'
import Appoinments from "../Pages/Doctor/Appoinments";
import Profile from '../Pages/Doctor/Profile'
import DashBoard from "../Pages/Doctor/DashBoard";
import AppoinmentHistory from "../Pages/Doctor/AppoinmentHistory";
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
        <Route path="/appoinments" element={<Appoinments/>} />
        <Route path="/reject" element={<Reject/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/dashboard" element={<DashBoard/>} />

        <Route path="/history" element={<AppoinmentHistory/>} />



      </Routes>
    </>
  );
}

export default Admin;
