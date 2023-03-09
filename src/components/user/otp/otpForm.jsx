import React, { useEffect, useRef, useState } from "react";
import axios from "../../../axios/axios";
import { Formik, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (Object.values(values.otp).some((data) => data === "")) {
    errors.otp = "this field is required";
  }
  return errors;
};

function otpForm({ otpToken }) {
  const navigate=useNavigate()
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
const [currentOtp,setCurrrentOtp]=useState('')
const[load,setLoad]=useState(false)

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

  console.log(currentOtp)



  const formik = useFormik({
    initialValues: {
      otp: Array.from({ length: 6 }).fill(""),
    },
    validate,
    onSubmit: (values) => {
      const str = Object.values(values.otp).join();
      const value = str.replace(/,/g, "");
      axios.post('/otpverify',{data:value},{headers:{'Authorization':otpToken}}).then((res)=>{
       if(res.data.status==="success"){
        navigate('/signin')
       }else{
        console.log(false);
       }
      })
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

    const currentOTP = { ...formik.values.otp };

    currentOTP[index] = value.slice(-1);
    formik.setValues((prev) => ({
      ...prev,
      otp: currentOTP,
    }));
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
    return Object.keys(otp).map((value, index) => (
      <input
        key={index}
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        value={otp[value]}
        name={value}
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
              <Formik>
                <div>{renderInput()}</div>
              </Formik>
              {formik.errors.otp && <p>please fill the fields</p>}

              {seconds > 0 || minutes > 0 ? (
                <button
                  type="button"
                  className="mt-4 w-32 border border-solid border-black  p-1 rounded"
                  onClick={formik.handleSubmit}
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

export default otpForm;
