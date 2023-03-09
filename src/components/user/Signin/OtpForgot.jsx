import axios from "../../../axios/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function OtpForgot({phone,setOtpForgot,setNewPassword}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const Navigate = useNavigate();

  const onOtpChange = (e, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);

    if (e.target.value.length === 1 && index < 5) {
      document.getElementsByTagName("input")[index + 1].focus();
    }
  };

  const submitOtp = (e) => {
    e.preventDefault();
    const otpJoined = otp.join("");
   axios.post('/forgotOtpVerify',{otp:otpJoined,phone:phone})
      .then(() => {
          setOtp(["", "", "", "", "", ""]);
        setOtpForgot(false)
        setNewPassword(true)
      })
      .catch((err) => setErr(err));
  };

  return (
    <div className=" mt-10  bg-zinc-500 opacity-90 fixed inset-0 z-50  ">
    <div className="flex h-screen justify-center items-center ">
      <div className="flex justify-center  bg-green-300 py-12 px-10 ">
       
        <form className="flex justify-evenly" onSubmit={submitOtp}>
          {otp.map((digit, index) => (
            <div key={index} className="mr-2 rounded-3xl">
              <input
                type="text"
                value={digit}
                onChange={(e) => onOtpChange(e, index)}
                maxLength={1}
                className="w-11 h-11 border border-gray-400 rounded text-center text-xl font-medium focus:outline-none"
              />
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="bg-indigo-500 text-white font-medium py-2 px-5 ml-5 rounded hover:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
        
        </div>
      </div>
    </div>
  );
}

export default OtpForgot;
