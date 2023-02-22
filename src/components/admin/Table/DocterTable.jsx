import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";

function DocterTable() {
  const [doctors, setDoctors] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("/admin/doctors").then((res) => {
      setDoctors(res.data.doctor);
    });
  }, [refresh]);

  const blockDoctor = (id) => {
    axios.patch("/admin/blockDoctor", { id }).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setRefresh(!refresh)
       
      } else {
        message.error(res.data.message);
      }
    });
  };

  const unblocDoctor = (id) => {
    console.log(id, "unblock");
    axios.patch("/admin/unblockDoctor", { id }).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setRefresh(!refresh)
      
      } else {
        message.error(response.data.message);
      }
    });
  };

  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <div className="flex justify-between mb-3">
        <h1 class="text-xl mb-2">doctors</h1>
        <button className="p-2 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer hover:bg-opacity-95">Pending to approve</button>
        </div>
        <div class="overflow-auto rounded-lg shadow-md">
          <table class="w-full">
            <thead class="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  No.
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
                <th class="p-3 text-sm font-semibold tracking-wide text-left"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {doctors.map((doctor) => (
                <tr>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor._id}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {" "}
                    {doctor.firstName}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor.email}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor.phone}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor.block == true ? (
                      <button
                        onClick={()=>unblocDoctor(doctor._id)}
                        className=" p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-green-600 rounded-lg bg-opacity-75 cursor-pointer hover:bg-opacity-95"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={()=>blockDoctor(doctor._id)}
                        className=" p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-red-600 rounded-lg bg-opacity-75 cursor-pointer "
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DocterTable;
