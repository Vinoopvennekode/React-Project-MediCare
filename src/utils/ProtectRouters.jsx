import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios/axios";

export function AdminProtectRouters() {
  const { token } = useSelector((state) => state.adminLogin);
  return token ? <Outlet /> : <Navigate to="/admin" />;
}

export function DoctorProtectRouters() {
  const { token } = useSelector((state) => state.doctorLogin);
  return token ? <Outlet /> : <Navigate to="/doctor/signin" />;
}

export function UserProtectRouters() {
  const { token } = useSelector((state) => state.userLogin);
  return token ? <Outlet /> : <Navigate to="/signin" />;
}


export function UserBlock(){
  const{block}=useSelector((state)=>state.userLogin)
  console.log(block,'blocccckkkkkk');
  return block==='true'? <Navigate to='/signin'/>:<Outlet/>
}












export function DoctorStatusProtectRouters() {
  const doctor = JSON.parse(localStorage.getItem("docToken"));
  console.log(doctor);
  const navigate = useNavigate();
  axios.get(`/doctor/statusChecking?id=${doctor}`).then((response) => {
    const result = response.data;
    console.log(result);
    const reason = result.doctor.rejectReason;

    if (result.doctorStatus === "register") {
      console.log('heeolllo');
      return navigate("/doctor/register" ,{state:{id:result}}) ;
    }
    if (result.doctorStatus === "pending") {
      console.log('22222');
     return navigate('/doctor/approval');
    }
    if (result.doctorStatus === "reject") {
     return navigate(`/doctor/reject`, { state: { reason: reason } });
    }
    <Outlet />;
  });
}
