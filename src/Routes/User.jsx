import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/User/HomePage";
import Signup from "../Pages/User/Signup";
import Signin from "../Pages/User/Signin";
import DocterList from "../Pages/User/DocterList";
import Docters from "../Pages/User/Docters";
import Appoinment from "../Pages/User/Appoinment";
import Specialities from "../pages/User/Specialities"
import Notifications from "../Pages/User/Notifications";
import Payment from '../Pages/User/PaymentPage'
function User() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/docterList" element={<DocterList/>}/>
        <Route path="/docters" element={<Docters/>}/>
        <Route path="/specialities" element={<Specialities/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/appoinment" element={<Appoinment/>}/>
        <Route path="/payment" element={<Payment/>}/>
      
      </Routes>
    </>
  );
}
export default User;
