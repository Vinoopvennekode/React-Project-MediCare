import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
function AppoinmentHistory() {
  const { id, token } = useSelector((state) => state.doctorLogin);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(moment(date).format("dddd"));
  const [appoinments, setAppoinments] = useState([]);

  const onChange = (date) => {
    setDate(date);
    const day = moment(date).format("dddd");
    setDay(day);
  };

  console.log(date, day);

  const disabledDates = [new Date(2023, 3, 10), new Date(2023, 3, 15)];

  useEffect(() => {
    axios
      .post(
        "/doctor/appoinmentHistory",
        { date: date, id: id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res.data);
        setAppoinments(res.data.appoinments);
      });
  }, [date]);

  console.log(appoinments,'ljksghadlkjhasdlkjsdhakj;');

  return (
    <>
      <div className="mt-24">
        <div className="p-10  h-screen bg-gray-100">
          <div className="lg:flex justify-between">
            <div class="overflow-auto w-full lg:w-2/3 lg:mx-16 rounded-lg shadow-md">
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
                    <th class="p-3 text-sm font-semibold tracking-wide text-left">
                      Status
                    </th>
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
            <div className="flex lg:w-1/3 flex-col">
              <Calendar
                onChange={onChange}
                maxDate={new Date()}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppoinmentHistory;
