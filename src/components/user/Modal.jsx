import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../axios/axios'
import { useSelector } from "react-redux";

const Modal = ({ date, setModalOn, doctor, time }) => {
  const [open, setOpen] = useState(false);
const {id}=useSelector((state) => state.userLogin)
console.log(doctor._id,'++++++++++++++++++++++++++++++++++++');
  const handleCancelClick = () => {
    setModalOn(false);
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    let data=new FormData(e.currentTarget);
   
    data={
     doctor:doctor._id,
     user:id,
      age:data.get("age"),
      symptoms:data.get("symptoms"),
      date:date,
      time:time
    }
    axios.post('/postAppointment',data).then((res)=>{
      console.log(res.data);
    })
  }

  return (
    <div className=" p-10 bg-gray-100 rounded-lg overflow-auto shadow-xl transform transition-all opacity-90 fixed inset-0 z-50  ">
      <div className=" flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-green-500 py-12 px-10 ">
        <div className="flex relative justify-end ">
            <button
              onClick={handleCancelClick}
              className=" "
            > <CloseIcon/>
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
                    required
                  />
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
                    required
                  />
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
                    required
                  ></textarea>
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
                    id="documents"
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

          
        </div>
      </div>
    </div>
  );
};

export default Modal;
