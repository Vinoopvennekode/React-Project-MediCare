import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Signin from "../Pages/Admin/Signin";
import Table from "../components/admin/Table/usertable";
import Test from '../Pages/Admin/Test'
import Doctors from '../Pages/Admin/Docters'
import DoctorsPending from '../Pages/Admin/DoctorsPending'
import Departments from "../Pages/Admin/Departments";
import SingleDepartment from "../Pages/Admin/SingleDepartment";
import Users from "../Pages/Admin/Users";
import AddDepartment from "../Pages/Admin/AddDepartment";
function Admin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/table" element={<Table />} />
        <Route path="/test" element={<Test/>} />
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/pendingDoctors" element={<DoctorsPending/>} />
        <Route path="/departments" element={<Departments/>} />
        <Route path="/department" element={<SingleDepartment/>} />
        <Route path="/addDepartment" element={<AddDepartment/>} />

      </Routes>
    </>
  );
}

export default Admin;
