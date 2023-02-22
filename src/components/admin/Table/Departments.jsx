import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";

function Departments() {
  const [departments,setDepartments] = useState([]);
  const [refresh, setRefresh] = useState(false);
const navigate=useNavigate()
  useEffect(() => {
    axios.get("/admin/getdepartments").then((res) => {
        setDepartments(res.data.departments);
    });
  }, []);

 
 

  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <div className="flex justify-between mb-3">
        <h1 class="text-xl mb-2">Departments</h1>
        <button onClick={(e)=>navigate('/admin/addDepartment')} className="p-2 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer hover:bg-opacity-95">Add Departments</button>
        </div>
        <div class="overflow-auto rounded-lg shadow-md">
          <table class="w-full">
            <thead class="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                   Department Name
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {departments.map((dep) => (
                <tr>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {dep._id}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {dep.name}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {dep.status==true ? <a className="p-1 bg-green-200 border-green-400	 border-2 "> Active</a>:<a className="p-1 bg-red-200 border-red-400	 border-2 ">Inactive</a>}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button onClick={(e)=>{navigate('/admin/department',{state:{id:dep._id}})}}>view details</button>
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

export default Departments;
