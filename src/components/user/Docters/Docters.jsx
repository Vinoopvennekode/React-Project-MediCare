import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import DoctorsList from "./DoctorsList";

function Docters() {
  const [doctors, setDoctors] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [SearchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios.get("/admin/doctors").then((res) => {
      setDoctors(res.data.doctor);
      console.log(res.data.doctor);
    });
  }, [refresh === 0]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setRefresh(0);
    if (SearchInput) {
      let uppdateUse = doctors.filter(
        (item) =>
          item.firstName
            .toString()
            .toLowerCase()
            .indexOf(SearchInput.toLowerCase()) > -1
      );
      console.log(uppdateUse);
      setDoctors(uppdateUse);
    } else {
      setRefresh(1);
    }
  };

  return (
    <div className=" mt-14">
      <div className="flex justify-center border-b-2">
        <div className="p-10">
          <input
            type="text"
            id="first_name"
            className="sm:w-[300px] md:w-[600px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            onChange={handleChange}
            value={SearchInput}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-full md:w-2/3 h-full flex flex-col">
          {doctors.map((doc) => {
            return (
              <DoctorsList doc={doc}/>
            );
          })}
        </div>
        <div className="md:w-1/3 h-20"></div>
      </div>
    </div>
  );
}

export default Docters;
