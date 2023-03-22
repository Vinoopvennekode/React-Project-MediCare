import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import axios from '../../axios/axios'
import { useSelector } from "react-redux";


function calender() {
  const navigate = useNavigate();
const { id } = useSelector((state) => state.doctorLogin);
  
  const [myValue, setMyValue] = useState("");

  const myChange = (ev) => {
    setMyValue(ev.value);
  };
  const handleCellClick = () => {
    navigate("/doctor/schedule", { state: { myValue: myValue } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      start: data.get("start"),
      end: data.get("end"),
    };
  axios.post('/doctor/leaveDays', { data: data, id: id }).then((res)=>{
  })
    
  };



  const myInvalid = [
  
    {
      start: "2023-03-01T15:00",
      end: "2023-03-01T17:00",
    },
    {
      start: "2023-03-01T19:00",
      end: "2023-03-03T20:00",
    },
  ];

  return (

    <div className="my-20  flex flex-col items-center  ">

    <div>
      update your leaves
    </div>
    <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="start-date" className="block font-medium text-gray-700 mb-2">Leave Start Date</label>
        <input
          type="date"
          id="start-date"
         
         name="start"
          className="w-full border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="end-date" className="block font-medium text-gray-700 mb-2">Leave End Date</label>
        <input
          type="date"
          id="end-date"
        name="end"
          
          className="w-full border-gray-400 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Submit</button>
    </form>

    <div className="w-[150px]">
      <Datepicker
        controls={["calendar"]}
        min="2023-03-01T00:00"
        max="2023-09-01T00:00"
        value={myValue}
        onChange={myChange}
        invalid={myInvalid}
        // onCellClick={handleCellClick}
      />
    </div>
    </div>
  );
}

export default calender;
