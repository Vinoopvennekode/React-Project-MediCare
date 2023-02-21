import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Signin from "../Pages/Admin/Signin";
import Table from "../components/admin/Table/table";

function Admin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </>
  );
}

export default Admin;
