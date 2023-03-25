import React, { useEffect, useRef, useState } from "react";
import axios from "../../../axios/axios";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function OtpForgot({ phone, setOtpForgot, setNewPassword }) {
  const Navigate = useNavigate();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [currentOtp, setCurrrentOtp] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [required, setRequired] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      phone: phone,
      otp: data.get("otp"),
    };

    if (data.otp) {
      const regNumber = /^[0-9]+$/;
      if (regNumber.test(data.otp)) {
      
        setOtp(false);
        setOtpError("");
        if (data.otp.length <= 6) {
          
          setOtp(false);
          setOtpError("");
     
          axios.post("/doctor/forgotOtpVerify", { data: data }).then((res) => {
        
            if (res.data.status) {
              setOtpForgot(false);
              setNewPassword(true);
            } else {
         
            }
          });
        } else {
          setOtp(true);
          setOtpError("Please 6 digits");
        }
      } else {
        setOtp(true);
        setOtpError("Please enter Number only");
      }
    } else {
      setRequired("fill the otp");
    }
  };

  return (
    <div className=" bg-zinc-500 opacity-90 fixed inset-0 z-50  ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex justify-center  bg-green-300 py-12 px-10 ">
          <form action="" onSubmit={handleSubmit}>
            <div className=" flex flex-col items-center ">
              <h3 className="text-2xl mb-8"> Please fill the otp</h3>
              <input type="text" className="" id="otp" name="otp" />

              {seconds > 0 || minutes > 0 ? (
                <button
                  type="submit"
                  className="mt-4 w-32 border border-solid border-black  p-1 rounded"
                >
                  Submit
                </button>
              ) : (
                <button className="mt-4 w-32 border border-solid border-black  p-1 rounded">
                  Resend
                </button>
              )}

              <div className="flex  mt-5 justify-center">
                {seconds > 0 || minutes > 0 ? (
                  <p style={{ fontSize: "12px" }}>
                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpForgot;
