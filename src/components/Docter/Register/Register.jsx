import React, { useState, useEffect } from "react";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options } from "@mobiscroll/react";
import { ColorRing, Dna } from "react-loader-spinner";
import { firebaseImage } from "../../../firebase/firebaseImage";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [department, setDepartment] = useState(false);
  const [departmentError, setDepartmentError] = useState("");
  const [experience, setExperience] = useState(false);
  const [experienceError, setExperienceError] = useState("");
  const [location, setLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [fees, setFees] = useState(false);
  const [feesError, setFeesError] = useState("");
  const [gender, setGender] = useState(false);
  const [genderError, setGenderError] = useState("");
  const [doctorimg, setDoctorimg] = useState(false);
  const [doctorimgError, setDoctorimgError] = useState("");
  const [certificte, setCertificate] = useState(false);
  const [certificateError, setCertificateError] = useState("");
  const [address, setAddress] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");

  useEffect(() => {
    axios.get("/departments").then((res) => {
      setDepartments(res.data.departments);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const doctor = JSON.parse(localStorage.getItem("docToken"));
  
    let data = new FormData(e.currentTarget);
    data = {
      department: data.get("department"),
      phoneNumber: data.get("phoneNumber"),
      experience: data.get("experience"),
      gender: data.get("gender"),
      location: data.get("location"),
      fees: data.get("fees"),
      doctorimg: data.get("doctorimg"),
      certificate: data.get("certificate"),
      address: data.get("address"),
      doctorId: doctor,
    };
    if (data.doctorimg.name) {

     const url =await firebaseImage(data.doctorimg)
     data.doctorimg=url
     
     
    } else {
      data.doctorimg = "";
    }
    if (data.certificate.name) {
      const url =await firebaseImage(data.certificate)
      data.certificate=url
      
    } else {
      data.certificate = "";
    }

    if (
      data.phoneNumber &&
      data.department &&
      data.experience &&
      data.gender &&
      data.location &&
      data.fees &&
      data.doctorimg &&
      data.certificate &&
      data.address
    ) {
      const regPhone =  /^(?!0000000000)\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      const regName = /^[a-zA-Z]+$/;
      setTotalRequired("");
      if (regPhone.test(data.phoneNumber)) {
        setPhoneNumber(false);
        setPhoneNumberError("");
        if (data.phoneNumber.length === 10) {
          setPhoneNumber(false);
          setPhoneNumberError("");
          if (regName.test(data.gender)) {
            setGender(false);
            setGenderError("");
            if (regName.test(data.department)) {
              setDepartment(false);
              setDepartmentError("");
              if (data.experience>0) {
                setExperience(false);
                setExperienceError("");
                if (regName.test(data.location)) {
                  setLocation(false);
                  setLocationError("");
                  if (data.fees > 0) {
                    setFees(false);
                    setFeesError("");
                    if (data.doctorimg) {
                      setDoctorimg(false);
                      setDoctorimgError("");
                      if (data.certificate) {
                        setCertificate(false);
                        setCertificateError("");
                        if (data.address) {
                          setAddress(false);
                          setAddressError("");
                      
                          axios
                            .post("/doctor/register", data)
                            .then((response) => {
                          

                              if (response.data.message === "success") {
                                setLoading(false);
                                navigate("/doctor/approval");
                              } else {
                          setLoading(false);

                                toast(response.data.message);
                              }
                            });
                        } else {
                          setAddress(true);
                          setLoading(false);

                          setAddressError(" enter address ");
                        }
                      } else {
                        setCertificate(true);
                        setLoading(false);

                        setCertificateError(" upload image ");
                      }
                    } else {
                      setDoctorimg(true);
                      setLoading(false);

                      setDoctorimgError(" upload image ");
                    }
                  } else {
                    setFees(true);
                    setLoading(false);

                    setFeesError(" enter fees ");
                  }
                } else {
                  setLocation(true);
                  setLoading(false);

                  setLocationError(" enter location ");
                }
              } else {
                setExperience(true);
                setLoading(false);

                setExperienceError(" enter expirience ");
              }
            } else {
              setDepartment(true);
              setLoading(false);

              setDepartmentError(" enter department ");
            }
          } else {
            setGender(true);
            setLoading(false);

            setGenderError(" enter valid gender ");
          }
        } else {
          setPhoneNumber(true);
          setLoading(false);

          setPhoneNumberError("Please enter 10 digit");
        }
      } else {
        setPhoneNumber(true);
        setLoading(false);

        setPhoneNumberError("Please Enter valid Phone no");
      }
    } else {
      setTotalRequired("Please enter your Details");
    }
  };
  return (
    <>
      <ToastContainer />
      <div class="min-h-screen py-20">
        <div class="container flex  flex-col justify-center items-center ">
          <h1 className="text-xl mb-11">Add your details</h1>
          <form
            component="form"
            className=" w-[300px] md:w-[500px]"
            onSubmit={handleSubmit}
          >
            <div class="grid gap-6 mb-6 md:grid-cols-2  ">
              <div>
                <label
                  for="website"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
                <p class="text-red-500 text-xs italic">{phoneNumberError}</p>
              </div>
              <div>
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <p class="text-red-500 text-xs italic">{genderError}</p>
              </div>
              <div>
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Departments
                </label>
                <select
                  class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="department"
                >
                  {departments?.map((dep) => (
                    <option key={dep._id}>{dep.name}</option>
                  ))}
                </select>
                <p class="text-red-500 text-xs italic">{departmentError}</p>
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Experience(in year)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
                <p class="text-red-500 text-xs italic">{experienceError}</p>
              </div>
              <div>
                <label
                  for="location"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location of clinic
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
                <p class="text-red-500 text-xs italic">{locationError}</p>
              </div>
              <div>
                <label
                  for="fees"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fees
                </label>
                <input
                  type="text"
                  id="fees"
                  name="fees"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
                <p class="text-red-500 text-xs italic">{feesError}</p>
              </div>
            </div>
            <div class="mb-6">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image (only jpg/png/webp)
              </label>
              <input
                type="file"
                id="doctorimg"
                name="doctorimg"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
              <p class="text-red-500 text-xs italic">{doctorimgError}</p>
            </div>
            <div class="mb-6">
              <label
                for="certificate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Certificate (only jpg/png/webp)
              </label>
              <input
                type="file"
                id="certificate"
                name="certificate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
              <p class="text-red-500 text-xs italic">{certificateError}</p>
            </div>
            <div class="mb-6">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address for communication
              </label>
              <input
                type="text"
                id="address"
                name="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <p class="text-red-500 text-xs italic">{addressError}</p>
            </div>

            <button
              type="submit"
              class="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
            {loading && (
              <div className=" p-10 bg-gray-100 rounded-lg overflow-auto shadow-xl transform transition-all opacity-70 fixed inset-0 z-50  ">
                <div className=" flex h-screen justify-center items-center ">
                  <div className="flex-col justify-center   py-12 px-10 ">
                    <Dna
                      visible={true}
                      height="160"
                      width="160"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
