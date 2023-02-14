import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/User/HomePage";
import Signup from "../Pages/User/Signup";
import Signin from "../Pages/User/Signin"

function User(){

    return(
        <>
        <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        </Routes>
        
        </>
    )
}
export default User