import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Admin/Dashboard";
import Signin from "../Pages/Admin/Signin";
import Table from "../components/admin/Table/usertable";
import Test from "../Pages/Admin/Test";
import Doctors from "../Pages/Admin/Doctors";
import Appoinments from "../Pages/Admin/Appoinments";
import DoctorsPending from "../Pages/Admin/DoctorsPending";
import Departments from "../Pages/Admin/Departments";
import SingleDepartment from "../Pages/Admin/SingleDepartment";
import Users from "../Pages/Admin/Users";
import AddDepartment from "../Pages/Admin/AddDepartment";
import DoctorProfile from "../Pages/Admin/DoctorsProfile";
import EditDepartment from "../Pages/Admin/EditDept";
import {AdminProtectRouters} from "../utils/ProtectRouters";
function Admin() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route element={<AdminProtectRouters/>}>
        <Route path="/users" element={<Users />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appoinments" element={<Appoinments />} />
        <Route path="/table" element={<Table />} />
        <Route path="/test" element={<Test />} />
        <Route path="/pendingDoctors" element={<DoctorsPending />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/department" element={<SingleDepartment />} />
        <Route path="/addDepartment" element={<AddDepartment />} />
        <Route path="/DoctorProfile" element={<DoctorProfile />} />
        <Route path="/editDept" element={<EditDepartment />} />
        </Route>
      </Routes>
    </>
  );
}

export default Admin;
