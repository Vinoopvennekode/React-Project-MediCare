import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


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

  return block==='true'? <Navigate to='/signin'/>:<Outlet/>
}












export function DoctorStatusProtectRouters() {
  const doctor = JSON.parse(localStorage.getItem("docToken"));
 
  const navigate = useNavigate();
  axios.get(`/doctor/statusChecking?id=${doctor}`).then((response) => {
    const result = response.data;

    const reason = result.doctor.rejectReason;

    if (result.doctorStatus === "register") {
     
      return navigate("/doctor/register" ,{state:{id:result}}) ;
    }
    if (result.doctorStatus === "pending") {
    
     return navigate('/doctor/approval');
    }
    if (result.doctorStatus === "reject") {
     return navigate(`/doctor/reject`, { state: { reason: reason } });
    }
    <Outlet />;
  });
}
