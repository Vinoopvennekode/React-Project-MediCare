import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            if (data.password.length >= 6) {
              setPassword(false);
              setPasswordError("");
              if (data.password === data.confPassword) {
                setPassword(false);
                setConfPassword(false);
                setPasswordError("");
                setConfPasswordError("");
                axios.post("/docter/signup", data).then((response) => {
                  console.log(response.data);
                  if (response.data.status === "success") {
                    navigate("/docter/register");
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
              setPasswordError("Minimum 6 character");
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
      <div class="min-h-screen py-40">
        <div class="container mx-auto">
          <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-[#80ED99] bg-no-repeat bg-cover bg-center ">
              <h1 class=" text-3xl mb-3">Welcome</h1>
              <div>
                <p class="">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                  <a href="#" class=" font-semibold">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div class="w-full lg:w-1/2 py-16 px-12">
              <h2 class="text-3xl mb-4">Signup</h2>
              <p class="mb-4">
                Create your account. It’s free and only take a minute
              </p>

              <p class="text-red-500 text-xs italic"> {totalRequired}</p>
             
              <form action="#" onSubmit={handleSubmit}>
                <div class="grid grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Firstname"
                      id="firstName"
                      name="firstName"
                      class="border border-gray-400 py-1 px-2"
                    />
                    <p class="text-red-500 text-xs italic">{firstNameError}</p>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Lastname"
                      id="lastName"
                      name="lastName"
                      class="border border-gray-400 py-1 px-2"
                    />
                    <p class="text-red-500 text-xs italic">{lastNameError}</p>
                  </div>
                </div>
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
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confPassword"
                    name="confPassword"
                    class="border border-gray-400 py-1 px-2 w-full"
                  />
                  <p class="text-red-500 text-xs italic">{confPasswordError}</p>
                </div>
                <div class="mt-5">
                  <input type="checkbox" class="border border-gray-400" />
                  <span>
                    I accept the{" "}
                    <a href="#" class=" font-semibold">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="#" class="">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div class="mt-5">
                  <button
                    type="submit"
                    class="w-full bg-[#80ED99] py-3 text-center text-white"
                  >
                    Register Now
                  </button>
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
