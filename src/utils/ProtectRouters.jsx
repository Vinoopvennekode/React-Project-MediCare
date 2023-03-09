import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AdminProtectRouters() {
  const { token } = useSelector((state) => state.adminLogin);
  return token ? <Outlet /> : <Navigate to="/admin" />;
}

export function DoctorProtectRouters() {
  const { token } = useSelector((state) => state.docterLogin);
  return token ? <Outlet /> : <Navigate to="/docter/signin" />;
}


export function UserProtectRouters(){
  const {token}=useSelector((state)=>state.userLogin)
  return token? <Outlet/>:<Navigate to="/signin"/>
}