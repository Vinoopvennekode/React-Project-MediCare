import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Docter/Signup";
import Register from "../Pages/Docter/Register";
import Approval from "../Pages/Docter/Approval";
import Home from '../Pages/Docter/DocterHome'
import Signin from '../Pages/Docter/Signin'
function Admin() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signin" element={<Signin/>} />



      </Routes>
    </>
  );
}

export default Admin;
