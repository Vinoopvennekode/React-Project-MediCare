import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/User/HomePage";
import Signup from "../Pages/User/Signup";
import Signin from "../Pages/User/Signin";
import DocterList from "../Pages/User/DocterList";
import Docters from "../Pages/User/Docters";
import Appoinment from "../Pages/User/Appoinment";

import publicRouter from "../utils/publicRouter";  
import protectRouter from "../utils/protectRouter";

function User() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/docterList" element={<DocterList/>}/>
        <Route path="/docters" element={<Docters/>}/>
        <Route path="/appoinment" element={<Appoinment/>}/>
      
      </Routes>
    </>
  );
}
export default User;
