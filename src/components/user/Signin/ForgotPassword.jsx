import React, { useState } from "react";
import axios from "../../../axios/axios";
function forgotPassword({ setForgot,setOtpForgot ,setPhone}) {
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [required, setRequired] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      phoneNumber: data.get("phoneNumber"),
    };
    if (data.phoneNumber) {
setPhone(data.phoneNumber)
      const regPhone = /^[0-9]+$/;
      if (regPhone.test(data.phoneNumber)) {
        setPhoneNumber(false);
        setPhoneNumberError("");
        axios.post("/numberCheck", data).then((res) => {
          console.log(res.data, "daaataa");
          if (res.data.status) {
            console.log("succus");
            setOtpForgot(true);
            setForgot(false);
          } else {
            console.log("fail");
          }
        });
      } else {
        setPhoneNumber(true);
        setPhoneNumberError("Please Enter valid Phone no");
      }
    } else {
      setRequired("Please enter your Details");
    }
  };
  return (
    <>
      <div className=" mt-10  bg-zinc-500 opacity-90 fixed inset-0 z-50  ">
        <div className="flex h-screen justify-center items-center ">
          <div className="flex flex-col items-center justify-center  bg-green-300 py-12 px-10 ">
            <h3 className="mb-4">Enter your Mobile Number</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
              action=""
            >
              <input
                type="Text"
                placeholder="PhoneNumber"
                id="phoneNumber"
                name="phoneNumber"
                class="border border-gray-400 py-1 px-2 w-full"
              />
              <p class="text-red-500 text-xs italic">{phoneNumberError}</p>

              <button type="sumbit" className="mt-4">
                Submit
              </button>
            </form>
         
          </div>
        </div>
      </div>
    </>
  );
}

export default forgotPassword;
