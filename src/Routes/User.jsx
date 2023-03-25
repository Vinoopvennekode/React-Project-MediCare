import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/User/HomePage";
import Signup from "../Pages/User/Signup";
import Signin from "../Pages/User/Signin";
import Doctors from "../Pages/User/Doctors";
import Appoinment from "../Pages/User/Appoinment";
import Specialities from "../Pages/User/Specialities";
import Notifications from "../Pages/User/Notifications";
import Payment from "../Pages/User/PaymentPage";
import { UserProtectRouters } from "../utils/ProtectRouters";
import { UserBlock } from "../utils/ProtectRouters";
function User() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<UserBlock />}>
          <Route element={<UserProtectRouters />}>
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/appoinment" element={<Appoinment />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default User;
