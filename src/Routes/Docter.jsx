import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Docter/Signup";
import Register from "../Pages/Docter/Register";
import Approval from "../Pages/Docter/Approval";

function Admin() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/approval" element={<Approval />} />


      </Routes>
    </>
  );
}

export default Admin;
