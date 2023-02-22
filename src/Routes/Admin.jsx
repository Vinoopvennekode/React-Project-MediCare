import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Signin from "../Pages/Admin/Signin";
import Table from "../components/admin/Table/usertable";
import Test from '../Pages/Admin/Test'
function Admin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<Table />} />
        <Route path="/test" element={<Test/>} />

      </Routes>
    </>
  );
}

export default Admin;
