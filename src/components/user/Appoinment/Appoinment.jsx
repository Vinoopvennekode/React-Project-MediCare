import React, { useState, useEffect } from "react";
import { Datepicker } from "@mobiscroll/react";
import { useSelector } from "react-redux";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import moment from "moment";
import axios from "../../../axios/axios";
import { useLocation } from "react-router-dom";
function Appoinment() {
  const location=useLocation()
 const id =location.state.id

  const [time, setTime] = useState([]);
  const [myValue, setMyValue] = useState(null);
  const [day, setDay] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const[doctor,setDoctor]=useState([])

  const myChange = (ev) => {
    const date = moment(ev.value);
    const dayOfWeek = date.format("dddd");
    setMyValue(ev.value);
    setDay(dayOfWeek);
    setRefresh(!refresh);
  };
 
  useEffect(()=>{
    axios.get(`/findDoctor?id=${id}`).then((res)=>{
      setDoctor(res.data.doctor)
    })
  },[])
  
  console.log(doctor,'>>>>>>>>>>>>>>>>');
    
  useEffect(() => {
    axios.get(`/viewappoinment?id=${id}&day=${day}`).then((res) => {

      if (res.data.time) {
        setTime(res.data.time);
      }
    });
  }, [refresh]);



  return (
    <>
      <div class="p-32">
        <div class="p-8 bg-gray-200 shadow-xl mt-24">
          <div class="grid grid-cols-1 ">
            <div class="relative">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img src={doctor.doctorimg} className="rounded-full" alt="" />
              </div>
            </div>
          </div>
          <div class="mt-40 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">
             {doctor.firstName} {doctor.lastName} <span class="font-light text-gray-500">27</span>
            </h1>
            <p class="font-light text-gray-600 mt-3">{doctor.location}</p>
            <p class="mt-8 text-gray-500">
              {doctor.department}- {doctor.location}
            </p>
            <p class="mt-2 text-gray-500">University of Computer Science</p>
          </div>
          <div class="mt-12 flex flex-col justify-center items-center">
            <p class="text-gray-600 text-center  my-4 font-light lg:px-16">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p>
            <span>Choose Your Data</span>
            <Datepicker value={myValue} onChange={myChange} />

            <span className="my-6">Booking Here</span>
            <div className="flex  justify-center">
              {time.length ? (
                time.map((time) => (
                  <button className="mx-3 p-1 bg-red-200 border-red-300	 border-2 ">
                    {time.start} To {time.end }
                  </button>
                ))
              ) : (
                <span>Booking not availabe</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appoinment;
