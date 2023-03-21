import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "@mui/material/Link";

function SignupForm() {
  const [firstName, setfirstName] = useState(false);
  const [firstNameError, setfirstNameError] = useState("");
  const [lastName, setlastName] = useState(false);
  const [lastNameError, setlastNameError] = useState("");
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confPassword, setConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      confPassword: data.get("confPassword"),
    };
    console.log(data);
    if (
      data.firstName &&
      data.lastName &&
      data.email &&
      data.password &&
      data.confPassword
    ) {
      const regName = /^[a-zA-Z]+$/;
      const regEmail =
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      const regPhone = /^[0-9]+$/;
      const password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      setTotalRequired("");
      if (regName.test(data.firstName)) {
        setfirstName(false);
        setfirstNameError("");
        if (regName.test(data.lastName)) {
          setlastName(false);
          setlastNameError("");
          if (regEmail.test(data.email)) {
            setEmail(false);
            setEmailError("");
            if (password.test(data.password)) {
              setPassword(false);
              setPasswordError("");
              if (data.password === data.confPassword) {
                setPassword(false);
                setConfPassword(false);
                setPasswordError("");
                setConfPasswordError("");
                axios.post("/doctor/signup", data).then((response) => {
                 
                  if (response.data.status === "success") {
                    console.log(response.data)
                    localStorage.setItem('docToken',JSON.stringify(response.data))
                    navigate("/doctor/register");
                  } else {
                    toast(response.data.message);
                  }
                });
              } else {
                setPassword(true);
                setConfPassword(true);
                setPasswordError("Password is not match");
                setConfPasswordError("Password is not match");
              }
            } else {
              setPassword(true);
              setPasswordError("Minimum eight characters, at least one letter, one number and one special character");
            }
          } else {
            setEmail(true);
            setEmailError("Please enter valid Email");
          }
        } else {
          setlastName(true);
          setlastNameError("Please enter valid Name");
        }
      } else {
        setfirstName(true);
        setfirstNameError("Please enter valid Name");
      }
    } else {
      setTotalRequired("Please enter your Details");
    }
    
  };

  return (
    <>
    <ToastContainer/>
      <div className="min-h-screen py-40">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-[#80ED99] bg-no-repeat bg-cover bg-center ">
              <h1 className=" text-3xl mb-3">Welcome Doctor</h1>
              <div>
                <p className="">
                 
                  <a href="#" className="">
                    Learn more about Medicare
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4">Signup</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p>

              <p className="text-red-500 text-xs italic"> {totalRequired}</p>
             
              <form action="#" onSubmit={handleSubmit}>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Firstname"
                      id="firstName"
                      name="firstName"
                      className="border border-gray-400 py-1 px-2 w-full"
                    />
                    <p className="text-red-500 text-xs italic">{firstNameError}</p>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Lastname"
                      id="lastName"
                      name="lastName"
                      className="border border-gray-400 py-1 px-2 w-full"
                    />
                    <p className="text-red-500 text-xs italic">{lastNameError}</p>
                  </div>
                
                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    name="email"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                  <p className="text-red-500 text-xs italic">{emailError}</p>
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                  <p className="text-red-500 text-xs italic">{passwordError}</p>
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confPassword"
                    name="confPassword"
                    className="border border-gray-400 py-1 px-2 w-full"
                  />
                  <p className="text-red-500 text-xs italic">{confPasswordError}</p>
                </div>
                
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full bg-[#80ED99] py-3 text-center text-white"
                  >
                    Register Now
                  </button>
                  <Link
                  onClick={() => navigate("/doctor/signin")}
                  variant="body2"
                  component="button"
                >
                  "Don't have an account? Sign Up"
                </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
