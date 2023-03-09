import React, { useEffect, useState } from "react";
import SpecialityCard from "./SpecialityCard";
import axios from "../../../axios/axios";

function Specialities() {
  const [speciality, setSpeciality] = useState([]);

  useEffect(() => {
    axios.get("/departments").then((res) => {
      setSpeciality(res.data.departments);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center mt-20">
        <h3 className="text-3xl">Our Specialities</h3>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {speciality.map((speciality) => (
            <SpecialityCard speciality={speciality} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Specialities;
