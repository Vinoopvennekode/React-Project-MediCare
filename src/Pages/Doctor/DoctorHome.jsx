import React, { useState,useEffect } from "react";
import Home from "../../components/Docter/Home/Home";
import Header from '../../components/Docter/Header2'
import Footer from "../../components/user/Footer/footer";
import axios from '../../axios/axios'
import { useNavigate } from "react-router-dom";

function DoctorHome() {
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("docToken"));
 
    axios
      .get(`/doctor/statusChecking?id=${doctor}`)
      .then((response) => {
        const result = response.data;
        
        const reason=result.doctor.rejectReason
      
        if (result.doctorStatus === "register") {
          navigate("/doctor/register");
          setReload(!reload);
        }
        if (result.doctorStatus === "pending") {
          navigate("/doctor/approval");
          setReload(!reload);
        }
        if(result.doctorStatus=== "reject"){
          navigate(`/doctor/reject`,{state:{reason:reason}});
          setReload(!reload);

        }
      });
  }, [reload]);
  return (
    <>
    <Header/>
      <Home />;
      <Footer />
    </>
  );
}

export default DoctorHome;
