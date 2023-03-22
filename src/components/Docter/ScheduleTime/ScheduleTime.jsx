import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import axios from "../../../axios/axios";
import { useLocation } from "react-router-dom";
// import 'antd/dist/antd.css';

const DoctorSchedule = () => {
  const location = useLocation();
  const myValue = location.state;
  const { id, token } = useSelector((state) => state.doctorLogin);
  const [date, setDate] = useState([]);
  const [app, setApp] = useState();
  const [time, setTime] = useState();
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData(e.currentTarget);
    data = {
      day: data.get("day"),
      start: data.get("start"),
      end: data.get("end"),
    };
    setDate(data);
    axios
      .post(
        "/doctor/addAppoinment",
        { data: data, id: id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        setRefresh(!refresh);
      });
  };

  useEffect(() => {
    axios
      .post(
        "/doctor/viewappoinment",
        { data: id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        setApp(res.data.app);
      });
  }, [refresh]);

  const deleteAppo = (data) => {
    axios
      .delete(`/doctor/deleteAppoinment?id=${data}&doctor=${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setApp(res.data);
      });
  };

  return (
    <div className="my-20">
      <div class="w-full mx-auto max-w-md">
        <h2 class="text-xl font-medium mb-4">Schedule Availability</h2>
        <form onSubmit={handleSubmit}>
          <div class="flex flex-wrap mb-4">
            <div class="w-1/4">
              <label class="block text-gray-700 font-medium mb-2" for="day">
                Day:
              </label>
              <select class=" w-full" name="day">
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </div>
            <div class="w-1/4">
              <label
                class="block text-gray-700 font-medium mb-2"
                for="start-time"
              >
                Start Time:
              </label>
              <input class=" w-full" type="time" id="start" name="start" />
            </div>
            <div class="w-1/4">
              <label
                class="block text-gray-700 font-medium mb-2"
                for="end-time"
              >
                End Time:
              </label>
              <input class=" w-full" type="time" id="end" name="end" />
            </div>
            <div class="w-1/4">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-7"
                type="submit"
              >
                Add Availability
              </button>
            </div>
          </div>
        </form>
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th class="border px-4 py-2 text-left">Day</th>
              <th class="border px-4 py-2 text-left">Start Time</th>
              <th class="border px-4 py-2 text-left">End Time</th>
              <th class="border px-4 py-2">delete</th>
            </tr>
          </thead>
          <tbody>
            {app?.map((data) => {
              return (
                <tr key={data.id}>
                  <td class="border px-4 py-2">{data.day}</td>

                  <td class="border-b px-4 py-2">
                    {data.time.map((time) => (
                      <span className="flex py-2">{time.start}</span>
                    ))}
                  </td>

                  <td class="border-b px-4 py-2">
                    {data.time.map((time) => (
                      <span className="flex py-2">{time.end}</span>
                    ))}
                  </td>

                  <td class="border px-4 py-2 text-right">
                    {data.time.map((time) => (
                      <div className="py-1">
                        <button
                          onClick={() => deleteAppo(time._id)}
                          class="bg-red-500 flex hover:bg-red-700 text-white  py-1 px-1 rounded"
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorSchedule;
