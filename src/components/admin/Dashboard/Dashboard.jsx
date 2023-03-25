import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { setLogin } from "../../../Store/Slice/UserLogin";

function Dashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [salesReport, setSalesReport] = useState([]);
  const { token } = useSelector((state) => state.adminLogin);
  const arr = [
    {
      name: "Doctors",
      image: "/DoctorsAdmin.png",
      number: dashboard.doctors,
    },
    {
      name: "Patients",
      image: "/patients.png",
      number: dashboard.users,
    },
    {
      name: "Pending Doctors",
      image: "/pending.png",
      number: dashboard.doctorPending,
    },
    {
      name: "Departments",
      image: "/departments.png",
      number: dashboard.departments,
    },
  ];
  useEffect(() => {
    axios
      .get("/admin/dashboard", { headers: { Authorization: token } })
      .then((res) => {
        console.log(res.data);
        setDashboard(res.data);
        setSalesReport(res.data.salesReport)
      });
  }, []);
  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <h1 class="text-xl mb-2">Dashboard</h1>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {arr.map((app) => {
              return (
                <div>
                  <div className=" flex justify-between card cursor-pointer  bg-gray-300 w-[250px] h-[100px] m-2 rounded-lg shadow-lg ">
                    <div className=" ">
                      <img
                        className="w-[80px] h-[80px] object-cover p-2"
                        src={app.image}
                        alt="img"
                      />
                    </div>
                    <div className=" flex flex-col  items-end  p-3 bg-">
                      <div className="title font-semibold text-sm ">
                        {app.name}
                      </div>
                      <div className="title font-semibold text-5xl my-1">
                        {app.number}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
        {salesReport.length !== 0 && (
          <div className=" mt-10 overflow-auto rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Month
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Year
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                   Total appoinments
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    Total Sales
                  </th>
                </tr>
              </thead>
              <tbody className=" bg-white divide-y divide-gray-200">
                {salesReport.map((salesReport) => (
                  <tr className="">
                    <td className=" p-3 text-sm text-gray-700 text-center">
                      {salesReport.month}
                    </td>
                    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {salesReport.year}
                    </td>
                    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {salesReport.count}
                    </td>
                    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      {salesReport.totalSales}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
