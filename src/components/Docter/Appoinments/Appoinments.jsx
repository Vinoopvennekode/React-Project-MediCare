import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
import moment from "moment";

function Appoinments() {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const { id } = useSelector((state) => state.docterLogin);
  const [day, setDay] = useState(moment(date).format("dddd"));
  const [appoinments, setAppoinments] = useState([]);

  console.log(date, "+++++", day);
  const onChange = (date) => {
    setDate(date);
    const day = moment(date).format("dddd");
    setDay(day);
  };

  useEffect(() => {
    axios.get(`docter/timeslots?id=${id}&day=${day}`).then((res) => {
      console.log(res.data, "////--/-/-/-/-");
      if (res.data.time) {
        setTimeSlot(res.data.time);
      }
    });
  }, [date]);

  console.log(timeSlot, "++++++++++++++++");

  // disable specific dates
  const disabledDates = [new Date(2023, 3, 10), new Date(2023, 3, 15)];
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);

    data = {
      id: id,
      date: date,
      timeStart: data.get("TimeSlot"),
    };
    console.log(data, "///*/*/*/*/*/*");
    axios.post("/docter/getappoinments", data).then((res) => {
      setAppoinments(res.data.appoinments);
    });
  };
  console.log(appoinments);

  return (
    <>
      <div className="mt-24">
        <div class="p-10 h-screen  bg-gray-200">
          <div className="flex justify-between mb-3">
            <h1 class="text-xl mb-2">My Appoinments</h1>
          </div>
          <div className="flex">

          
          <div class="overflow-auto w-full md:w-2/3 mx-16 rounded-lg shadow-md">
            <table class="w-full">
              <thead class="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th class="p-3 text-sm font-semibold tracking-wide text-left">
                    Token
                  </th>
                  <th class="p-3 text-sm font-semibold tracking-wide text-left">
                    Name
                  </th>
                  <th class="p-3 text-sm font-semibold tracking-wide text-left">
                    Address
                  </th>
                  <th class="p-3 text-sm font-semibold tracking-wide text-left">
                    Mobile
                  </th>
                  <th class="p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                {appoinments.map((app) => (
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap"></td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {app.user.name}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {app.user.email}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {app.user.phone}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {app.status}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex md:w-1/3 flex-col">
            <Calendar
              onChange={onChange}
              value={date}
              tileDisabled={({ date }) =>
                disabledDates.some(
                  (disabledDate) =>
                    disabledDate.getDate() === date.getDate() &&
                    disabledDate.getMonth() === date.getMonth() &&
                    disabledDate.getFullYear() === date.getFullYear()
                )
              }
            />

            <form className="my-4" onSubmit={handleSubmit} action="">
              <select className=" p-2 rounded-lg" name="TimeSlot" id="">
                {timeSlot.map((time) => (
                  <option value={time.start}>
                    {time.start} To {time.end}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="p-2 mx-6 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer hover:bg-opacity-95"
              >
                submit
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appoinments;
