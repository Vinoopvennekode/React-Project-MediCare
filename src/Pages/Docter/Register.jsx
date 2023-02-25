import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Registerform from '../../components/Docter/Register/Register'
import Header from '../../components/Docter/Header'
import axios from '../../axios/axios'
function Register() {

  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("docToken"));
    console.log(doctor.docterId);
    axios
      .get(`/docter/statusChecking?id=${doctor.docterId}`)
      .then((response) => {
        const result = response.data;
        if (result.doctorStatus === "pending") {
          navigate("/docter/approval");
          setReload(!reload);
        }
      });
  }, [reload]);
  return (
    <>
    <Header/>
    <Registerform/>
    </>
  )
}

export default Register