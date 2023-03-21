import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Popconfirm } from "antd";
import Pagination from "@mui/material/Pagination";

function AppoinmentsTable() {
  const { token } = useSelector((state) => state.adminLogin);
  const [id, setId] = useState("");
  const [appoinments, setAppoinments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const adminToken = localStorage.getItem("admintoken");
  console.log(adminToken);
  useEffect(() => {
    axios
      .get(`/admin/appoinments?page=${currentPage}&limit=4`, {
        headers: { 'Authorization': token },
      })
      .then((response) => {
        console.log(response.data);
        setAppoinments(response.data.appoinments);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {});
  }, [refresh, currentPage]);

 



  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <div className="flex justify-between mb-3">
          <h1 class="text-xl mb-2">Appoinments</h1>
          
        </div>
        <div class="overflow-auto rounded-lg shadow-md">
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
                <th class="p-3 text-sm font-semibold tracking-wide text-left"></th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {appoinments.map((app) => (
                <tr>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap"></td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {app.user?.name}
              
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {app.user?.email}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {app.user?.phone}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {app?.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-8">
          {totalPages !== 0 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AppoinmentsTable;
