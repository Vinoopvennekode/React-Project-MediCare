import React, { useState,useEffect } from "react";
import Home from "../../components/Docter/Home/Home";
import Header from '../../components/Docter/Header2'
import Footer from "../../components/user/Footer/footer";
import axios from '../../axios/axios'
import { useNavigate } from "react-router-dom";

function DocterHome() {
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("docToken"));
    console.log(doctor.docterId);
    axios
      .get(`/docter/statusChecking?id=${doctor.docterId}`)
      .then((response) => {
        const result = response.data;
        
        if (result.doctorStatus === "register") {
          navigate("/doctor/register");
          setReload(!reload);
        }
        if (result.doctorStatus === "pending") {
          navigate("/docter/approval");
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

export default DocterHome;
