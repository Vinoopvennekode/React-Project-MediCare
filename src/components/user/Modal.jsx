import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { ColorRing, Dna } from "react-loader-spinner";
import{message }from 'antd'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Modal = ({ date, setModalOn, doctor, time }) => {
  const Navigate = useNavigate();

  const [name, setName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [age, setAge] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [symptoms, setSymptoms] = useState(false);
  const [symptomsError, setSymptomsError] = useState("");
  const [document, setDocument] = useState(false);
  const [documentError, setDocumentError] = useState("");
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const { id, token } = useSelector((state) => state.userLogin);
  const handleCancelClick = () => {
    setModalOn(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);

    data = {
      doctor: doctor._id,
      user: id,
      name: data.get("name"),
      age: data.get("age"),
      symptoms: data.get("symptoms"),
      date: date,
      time: time,
      document: data.get("document"),
    };
    if (data.document.name) {
      const dirs = Date.now();
      const rand = Math.random();
      const image = data.document;
      const imageRef = ref(
        storage,
        `/doctorImages/${dirs}${rand}_${image?.name}`
      );
      const toBase64 = (image) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        }).catch((err) => {
        });
      const imgBase = toBase64(image);
      uploadString(imageRef, imgBase, "data_url").then(async () => {
        const downloadURL = getDownloadURL(imageRef);
        data.document = downloadURL;
      });
    } else {
      data.document = "";
    }

    const regName = /^[a-zA-Z]+$/;
    if (regName.test(data.name)) {
      setName(false);
      setNameError("");
      if (data.age > 0) {
        setAge(false);
        setAgeError("");
        if (data.symptoms) {
          setSymptoms(false);
          setSymptomsError("");
         


          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Book appoinment!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios
              .post("/postAppointment", data, {
                headers: { Authorization: token },
              })
              .then((res) => {
               message.error(res.data.message)
               
              });
              Swal.fire(
                'Appoinment Booked',
                'Your can check your notification for payment.',
                'success'
              )
              Navigate('/')
            }
          })
            
          
        } else {
          setSymptoms(true);
          setSymptomsError("Please Enter Symptoms");
        }
      } else {
        setAge(true);
        setAgeError("Please Enter valid Age");
      }
    } else {
      setName(true);
      setNameError("Please Enter valid Name");
    }
  };

  return (
    <div className=" p-10 bg-gray-100 rounded-lg overflow-auto shadow-xl transform transition-all opacity-90 fixed inset-0 z-50  ">
      <div className=" flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-green-500 py-12 px-10 ">
          <div className="flex relative justify-end ">
            <button onClick={handleCancelClick} className=" ">
              {" "}
              <CloseIcon />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <div className=" grid sm:grid-cols-1 md:grid-cols-2">
              <div className="mx-3  mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name"
                    type="text"
                    name="name"
                    
                  />
                  <p class="text-red-500 text-xs italic">{nameError}</p>

                </div>
              </div>
              <div className=" mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="age"
                    type="number"
                    name="age"
                    
                  />
                  <p class="text-red-500 text-xs italic">{ageError}</p>

                </div>
              </div>
              <div className=" mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="symptoms"
                  >
                    Symptoms
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="symptoms"
                    name="symptoms"
                    
                  ></textarea>
                  <p class="text-red-500 text-xs italic">{symptomsError}</p>

                </div>
              </div>
              <div className=" mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="documents"
                  >
                    Documents (optional)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="document"
                    name="document"
                    type="file"
                    multiple
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-around my-5">
              <div>
                <p className="text-sm font-medium mb-2">You Selected</p>
                <p className="text-sm font-medium mb-2">{date}</p>

                <p className="text-sm font-medium mb-2">
                  {" "}
                  {time.start} To {time.end}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">contact</p>
                <p className="text-xs mb-1">
                  {doctor.firstName} {doctor.lastName}
                </p>
                <p className="text-xs mb-1">{doctor.department}</p>
                <p className="text-xs mb-1">{doctor.phoneNumber}</p>
                <p className="text-xs mb-1">Kozhikode,Kerala,India</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className=" mx-3 mb-6">
                <div className="w-full px-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <span className="text-xs">
              "By clicking submit, you will be get allotted time and PaymentLink
              as a notification."
            </span>
          </form>
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
      </div>
    </div>
  );
};

export default Modal;
