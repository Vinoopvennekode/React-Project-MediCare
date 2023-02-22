import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../axios/axios";
function department() {
  const location = useLocation();
  const [department, setDepartment] = useState([]);
  let data = location.state.id;

  useEffect(() => {
    axios.post("/admin/singledepartment", { id: data }).then((res) => {
      console.log(res.data);
      setDepartment(res.data.department);
    });
  }, []);
  console.log(department);
  return (
    <div className="m-8 flex justify-center">
      <div className="bg-white h-full w-[500px] flex flex-col  items-center">
        <img className="mt-6" src={department.deptImg} width={200} alt="" />
        <div className="mt-6">
          <h1 className=" text-bold text-xl">{department.name}</h1>
        </div>
        <div className="p-6">
          <h4>{department.description}</h4>
        </div>
        <div>
          {department.status == true ? (
            <p className="p-6">Status:ACTIVE</p>
          ) : (
            <p className="p-6">Status:INACTIVE</p>
          )}
        </div>
        <div className="p-6">
          <button className="p-2 mx-6 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer hover:bg-opacity-95">
            EDIT
          </button>
          <button className="p-2 mx-6 text-xs font-medium  tracking-wider text-white bg-red-500 rounded-lg  cursor-pointer hover:bg-opacity-95">
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default department;
