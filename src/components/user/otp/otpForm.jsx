import React, { useEffect, useRef, useState } from "react";
import axios from "../../../axios/axios";
import { Formik,useFormik } from "formik";

function otpForm() {
  const formik= useFormik({
    initialValues: {
      otp: {
        digitOne: "",
        digitTwo: "",
        digitThree: "",
        digitFour: "",
        digitFive: "",
        digitSix: "",
      },
    },
  });
  const inputRef = useRef({});
  const [otp, setOtp] = useState({
    digitOne: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });

  useEffect(() => {
    inputRef.current[0].focus();
    inputRef.current[0].addEventListener("paste", pasteText);

    return () => inputRef.current[0].removeEventListener("paste", pasteText);
  }, []);

  const pasteText = (event) => {
    const pastedText = event.clipboardData.getData("text");
    const fieldValues = {};
    Object.keys(otp).forEach((keys, index) => {
      fieldValues[keys] = pastedText[index];
    });
    setOtp(fieldValues);
    inputRef.current[5].focus();
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (/[a-z]/gi.test(value)) return;
    setOtp((prev) => ({
      ...prev,
      [name]: value.slice(-1),
    }));

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackSpace = (event, index) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const renderInput = (keys) => {
    return Object.keys(otp).map((keys, index) => (
      <input
        key={index}
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        value={otp[keys]}
        name={keys}
        className="w-16 h-12 rounded-md mr-3 text-center text-xl"
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackSpace(event, index)}
      />
    ));
  };

  return (
    <div className=" mt-10  bg-zinc-500 opacity-90 fixed inset-0 z-50  ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex justify-center  bg-green-300 py-12 px-10 ">
          <form action="">
            <div className=" flex flex-col items-center ">
              <h3 className="text-3xl mb-8"> Please fill the otp</h3>
              <div>{renderInput()}</div>
              <button className="mt-4 w-32 border border-solid border-black  p-1 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default otpForm;
