import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import Modal from '../Modal'
import { useSelector } from "react-redux";

function DocterPending() {
  const { token } = useSelector((state) => state.adminLogin);

  const [modalOn, setModalOn] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctorsM, setDoctorsm] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const clicked = (doctor) => {
    setModalOn(true)
    setDoctorsm(doctor)
  }
  const [choice, setChoice] = useState(false)



  useEffect(() => {
    axios.get("/admin/pending",{headers:{'Authorization':token}}).then((res) => {
      setDoctors(res.data.doctor);
    });
  }, [refresh]);

  const approve = (id) => {
    console.log(id, "unblock");
    axios.patch("/admin/approve", { id },{headers:{'Authorization':token}}).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setRefresh(!refresh);
      } else {
        message.error(response.data.message);
      }
    });
  };

  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <div className="flex justify-between mb-3">
          <h1 class="text-xl mb-2">Pending to approve</h1>
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
                    <button
                      onClick={() => clicked(doctor)}
                      className="p-2 text-xs font-medium  tracking-wider text-white bg-red-500 rounded-lg  cursor-pointer uppercase hover:bg-opacity-95"
                    >
                      {" "}
                      view
                    </button>
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      onClick={() => approve(doctor._id)}
                      className="p-2 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer uppercase hover:bg-opacity-95"
                    >
                      {" "}
                      approve
                    </button>
                  </td>
                </tr>
              ))}
          {modalOn && < Modal setModalOn={setModalOn} doctorsM={doctorsM} setChoice={setChoice} />}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DocterPending;
