import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "../../../axios/axios";
import { useLocation } from "react-router-dom";
import Modal from '../Modal'

function Appoinment() {
  const {token}=useSelector((state)=>state.userLogin)
  const location = useLocation();
  const id = location.state.id;
  const [modalOn, setModalOn] = useState(false);


  const [time, setTime] = useState([]);
  const [selectedTime,setselectedTime]=useState([])
  const [myValue, setMyValue] = useState(null);
  const [day, setDay] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const[date,setDate]=useState('')

  const clicked = (time) => {
    setModalOn(true)
    setselectedTime(time)
  }
  const myChange = (dates) => {
    const date = moment(dates);
    const selectedDate=date.format("MMM Do YYYY");
    setDate(selectedDate)
    const dayOfWeek = date.format("dddd");
    
    setMyValue(dates);
    setDay(dayOfWeek);
    setRefresh(!refresh);
  };


  useEffect(() => {
    axios.get(`/findDoctor?id=${id}`,{headers:{'Authorization':token}}).then((res) => {
      setDoctor(res.data.doctor);
    });
  }, []);



  useEffect(() => {
    axios.get(`/viewappoinment?id=${id}&day=${day}`,{headers:{'Authorization':token}}).then((res) => {
      if (res.data.time) {
        setTime(res.data.time);
      }
    });
  }, [refresh]);

  return (
    <>
      <div class="md:p-32">
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
              {doctor.firstName} {doctor.lastName}{" "}
              <span class="font-light text-gray-500">27</span>
            </h1>
            <p class="font-light text-gray-600 mt-3">{doctor.location}</p>
            <p class="mt-8 text-gray-500">
              {doctor.department}- {doctor.location}
            </p>
            {/* <p class="mt-2 text-gray-500">University of Computer Science</p> */}
          </div>
          <div class=" flex flex-col justify-center items-center">
            {/* <p class="text-gray-600 text-center  my-4 font-light lg:px-16">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </p> */}
            <span>Choose Your Date</span>
            <Calendar  minDate={new Date()} value={myValue} onChange={myChange} />

            <span className="my-6">Booking Here</span>
            <div className="flex  justify-center">
              {time.length ? (
                time.map((time) => (
                  <button
                    onClick={() => clicked(time)}
                    className="mx-3 p-1 bg-green-200 border-green-300	 border-2 "
                  >
                    {time.start} To {time.end}
                  </button>
                ))
              ) : (
                <span className="text-red-500">Booking not availabe</span>
              )}
                       {modalOn && < Modal date={date} setModalOn={setModalOn} time={selectedTime} doctor={doctor} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appoinment;
