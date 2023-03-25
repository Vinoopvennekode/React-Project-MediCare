import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../Store/Slice/DoctorLogin";
import ForgotPassword from "./ForgotPassword";
import OtpForgotpage from '../Signin/OtpForgot'
import NewPassword from "./NewPassword";

function SigninForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");
  const [forgot, setForgot] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpForgot, setOtpForgot] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (data.email && data.password) {
      const regEmail =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      setTotalRequired("");

      if (regEmail.test(data.email)) {
        setEmail(false);
        setEmailError("");
        if (data.password.length >= 6) {
          setPassword(false);
          setPasswordError("");

          axios
            .post("/doctor/login", data)
            .then((response) => {
              const doctor = response.data.doctorLogin;
              if (response.data.doctorLogin.Status) {
                dispatch(
                  setLogin({
                    user: "doctor",
                    name: doctor.name,
                    id: doctor.id,
                    token: doctor.token,
                  })
                );
                localStorage.setItem(
                  "doctorToken",
                  JSON.stringify(response.data.doctorLogin)
                );
                localStorage.setItem(
                  "docToken",
                  JSON.stringify(response.data.doctorLogin.id)
                );

                navigate("/doctor/home");
              } else {
                // message.error(response.data.doctorLogin.message);
              }
            })
            .catch();
        } else {
          setPassword(true);
          setPasswordError("Minimum 6 character");
        }
      } else {
        setEmail(true);
        setEmailError("Please enter valid Email");
      }
    } else {
      setTotalRequired("Please enter your Details");
    }
  };

  const modalOn = () => {
    setForgot(true);
  };

  return (
    <>
      {<ToastContainer />}
      <div class="min-h-screen py-40">
        <div class="container mx-auto">
          <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-[#80ED99] bg-no-repeat bg-cover bg-center ">
              <h1 class=" text-3xl mb-3">Welcome</h1>
              <div>
                <p class="">
                  <a href="#" class=" font-semibold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div class="w-full lg:w-1/2 py-16 px-12">
              <h2 class="text-3xl mb-4">Signin</h2>
              <p class="mb-4">Sign in your account.</p>

              <p class="text-red-500 text-xs italic"> {totalRequired}</p>

              <form action="#" onSubmit={handleSubmit}>
                <div class="mt-5">
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    name="email"
                    class="border border-gray-400 py-1 px-2 w-full"
                  />
                  <p class="text-red-500 text-xs italic">{emailError}</p>
                </div>
                <div class="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    class="border border-gray-400 py-1 px-2 w-full"
                  />
                  <p class="text-red-500 text-xs italic">{passwordError}</p>
                </div>

                <div class="mt-5">
                  <button
                    type="submit"
                    class="w-full bg-[#80ED99] py-3 text-center text-white"
                  >
                    Sign in
                  </button>
                  <div className=" mt-3 flex justify-between">
                    <Link
                      onClick={() => navigate("/doctor/signup")}
                      variant="body2"
                      component="button"
                    >
                      "Don't have an account? Sign Up"
                    </Link>
                    <Link onClick={modalOn} variant="body2" component="button">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </form>
              {forgot && (
                <ForgotPassword
                  setForgot={setForgot}
                  setPhone={setPhone}
                  setOtpForgot={setOtpForgot}
                />
              )}
              {otpForgot && (
                <OtpForgotpage
                  phone={phone}
                  setOtpForgot={setOtpForgot}
                  setNewPassword={setNewPassword}
                />
              )}
              {newPassword && (
                <NewPassword phone={phone} setNewPassword={setNewPassword} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SigninForm;
