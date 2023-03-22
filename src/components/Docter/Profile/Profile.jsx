import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios/axios";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { ColorRing, Dna } from "react-loader-spinner";
import Swal from "sweetalert2";
import { firebaseImage } from "../../../firebase/firebaseImage";
import { message } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate=useNavigate()
  const[update,setUpdate]=useState(false)
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id, token } = useSelector((state) => state.doctorLogin);
  const [departments, setDepartments] = useState([]);
  const [firstName, setfirstName] = useState(false);
  const [firstNameError, setfirstNameError] = useState("");
  const [lastName, setlastName] = useState(false);
  const [lastNameError, setlastNameError] = useState("");
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
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
  const [address, setAddress] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    axios.get("/departments").then((res) => {
      setDepartments(res.data.departments);
    });
  }, []);
  useEffect(() => {
    axios
      .post(
        `/doctor/profile`,
        { data: id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        setDoctor(res.data.doctor);
      });
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData(e.currentTarget);
    data = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      department: data.get("department"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      experience: data.get("experience"),
      location: data.get("location"),
      fees: data.get("fees"),
      doctorimg: data.get("doctorimg"),
      address: data.get("address"),
      doctorId: id,
    };
    if (!data.doctorimg.name) {
      data.doctorimg = doctor.doctorimg;
    }
    const regPhone =
      /^(?!0000000000)\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const regName = /^[a-zA-Z]+$/;
    const regemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    setTotalRequired("");
    if (regName.test(data.firstName)) {
      setfirstName(false);
      setfirstNameError("");
      if (regName.test(data.lastName)) {
        setlastName(false);
        setlastNameError("");
        if (regemail.test(data.email)) {
          setEmail(false);
          setEmailError("");
          if (regPhone.test(data.phoneNumber)) {
            setPhoneNumber(false);
            setPhoneNumberError("");
            if (data.phoneNumber.length === 10) {
              setPhoneNumber(false);
              setPhoneNumberError("");
              if (regName.test(data.department)) {
                setDepartment(false);
                setDepartmentError("");
                if (data.experience > 0) {
                  setExperience(false);
                  setExperienceError("");
                  if (regName.test(data.location)) {
                    setLocation(false);
                    setLocationError("");
                    if (data.fees > 0) {
                      setFees(false);
                      setFeesError("");

                      if (data.doctorimg) {
                        if (data.doctorimg !== doctor.doctorimg) {
                          const url = await firebaseImage(data.doctorimg);
                          data.doctorimg = url;
                        }

                        axios
                          .post("/doctor/updateProfile", data, {
                            headers: { Authorization: token },
                          })
                          .then((response) => {
                           

                            if (response.data.message === "success") {
                              setLoading(false);
                              setrefresh(!refresh);

                              toast.success("profile successfully updated", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                              });
                              setUpdate(false)
                            } else {
                              toast(response.data.message);
                            }
                          });
                      } else {
                        setLoading(false);
                      }
                    } else {
                      setFees(true);
                      setLoading(false);

                      setFeesError(" enter valid fee ");
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
          setEmail(true);
          setLoading(false);

          setEmailError("Please Enter valid email");
        }
      } else {
        setlastName(true);
        setLoading(false);

        setlastNameError("Please Enter valid lastName");
      }
    } else {
      setfirstName(true);
      setLoading(false);

      setfirstNameError("Please Enter valid Name");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className=" flex justify-center my-24 ">
        <div className="bg-green-200 px-18 md:px-32 pb-32 mt-24">
          <div className="">
            <div class="relative">
              <div class="w-40  md:w-52 h-40 md:h-52 bg-indigo-100 mx-auto  shadow-2xl absolute inset-x-0 top-0 -mt-20 right-1/2 sm:right-3/4 flex items-center justify-center text-indigo-500">
                <img
                  src={doctor.doctorimg}
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="flex mt-40">
            <form onSubmit={handleSubmit}>
              <div class="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    FirstName
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={()=>setUpdate(true)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={doctor.firstName}
                  />
                  <p class="text-red-500 text-xs italic">{firstNameError}</p>
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={()=>setUpdate(true)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={doctor.lastName}
                  />
                  <p class="text-red-500 text-xs italic">{lastNameError}</p>
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
                    onChange={()=>setUpdate(true)}
                    defaultValue={doctor.department}
                  >
                    {departments?.map((dep) => (
                      <option key={dep._id}>{dep.name}</option>
                    ))}
                  </select>
                  <p class="text-red-500 text-xs italic">{departmentError}</p>
                </div>
                <div>
                  <label
                    for="website"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={()=>setUpdate(true)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={doctor.phoneNumber}
                    required
                  />
                  <p class="text-red-500 text-xs italic">{phoneNumberError}</p>
                </div>
                <div>
                  <label
                    for="website"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fee
                  </label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    onChange={()=>setUpdate(true)}
                    class="appearance-none bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    defaultValue={doctor.fees}
                  />
                  <p class="text-red-500 text-xs italic">{feesError}</p>
                </div>
                <div>
                  <label
                    for="visitors"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Experience{" "}
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    onChange={()=>setUpdate(true)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={doctor.experience}
                  />
                  <p class="text-red-500 text-xs italic">{experienceError}</p>
                </div>
                <div>
                  <label
                    for="visitors"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    onChange={()=>setUpdate(true)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={doctor.location}
                  />
                  <p class="text-red-500 text-xs italic">{locationError}</p>
                </div>
                <div class="">
                  <label
                    for="image"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="doctorimg"
                    name="doctorimg"
                    onChange={()=>setUpdate(true)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                  <p class="text-red-500 text-xs italic">{doctorimgError}</p>
                </div>
              </div>
              <div className="mb-6">
                <label
                  for="visitors"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={()=>setUpdate(true)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={doctor.address}
                />
                <p class="text-red-500 text-xs italic">{addressError}</p>
              </div>
              <div class="mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={()=>setUpdate(true)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={doctor.email}
                />
                <p class="text-red-500 text-xs italic">{emailError}</p>
              </div>

              {update?(<button
                type="submit"
                class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>):(<button 
                class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={()=>navigate('/doctor/home')}>Back</button>)}
            </form>
          </div>
        </div>
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
      </div>
    </>
  );
}

export default Profile;
