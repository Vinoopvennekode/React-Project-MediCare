import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Popconfirm } from "antd";
import Pagination from "@mui/material/Pagination";

function RejectedDoctors() {
  const { token } = useSelector((state) => state.adminLogin);
  const [id, setId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("admintoken");
  useEffect(() => {
    axios
      .get(`/admin/doctors?page=${currentPage}&limit=4`, { headers: { Authorization: token } })
      .then((response) => {
        
        setDoctors(response.data.doctor);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
     
      })
      .catch((error) => {});
  }, [refresh,currentPage]);

  const blockDoctor = (id) => {
    axios
      .patch(
        "/admin/blockDoctor",
        { id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.data.success) {
          
          setRefresh(!refresh);
        } else {
          message.error(res.data.message);
        }
      });
  };

  const unblocDoctor = (id) => {
    
    axios
      .patch(
        "/admin/unblockDoctor",
        { id },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        if (response.data.success) {
       
          setRefresh(!refresh);
        } else {
          message.error(response.data.message);
        }
      });
  };

  const confirm = (e) => {
    
    axios
    .patch(
      "/admin/blockDoctor",
      { id },
      { headers: { Authorization: token } }
    )
    .then((res) => {
      if (res.data.success) {
       
        setRefresh(!refresh);
      } else {
        message.error(res.data.message);
      }
    });
    message.success("Click on Yes");
  };

  const cancel = (e) => {
   
    message.error("Click on No");
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <div className="flex justify-between mb-3">
          <h1 class="text-xl mb-2">doctors</h1>
          <button
            onClick={() => navigate("/admin/pendingDoctors")}
            className="p-2 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer hover:bg-opacity-95"
          >
            Pending to approve
          </button>
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
              {doctors?.map((doctor) => (
                <tr>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor?._id}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {" "}
                    {doctor?.firstName}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor?.email}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor?.phone}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {doctor?.block == true ? (
                      <button
                        onClick={() => unblocDoctor(doctor?._id)}
                        className=" p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-green-600 rounded-lg bg-opacity-75 cursor-pointer hover:bg-opacity-95"
                      >
                        Unblock
                      </button>
                    ) : (
                      <Popconfirm
                        title="Block the Doctor"
                        description="Are you sure to Block this Doctor?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button
                          onClick={() => setId(doctor?._id)}
                          className=" p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-red-600 rounded-lg bg-opacity-75 cursor-pointer "
                        >
                          Block
                        </button>
                      </Popconfirm>
                    )}
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

export default RejectedDoctors;
