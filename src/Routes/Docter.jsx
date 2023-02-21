import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Docter/Signup";

function Admin() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default Admin;
