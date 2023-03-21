import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../axios/axios";
import { message, Popconfirm } from "antd";
function Approvel() {
  const Navigate = useNavigate();
  const location = useLocation();
  const rejectReason = location.state?.reason;
  const id = location.state?.id;
  const doctor = JSON.parse(localStorage.getItem("docToken"));

  const confirm = (e) => {
    console.log(e);
    axios.delete(`/doctor/deleteAccount?id=${doctor}`).then((res) => {
      if (res.data.success) {
        Navigate("/doctor/signin");
      }
    });
    message.success("Account deleted successfully");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("not deleted");
  };
  return (
    <>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="w-8 h-8 mr-2" src="/logo2.png" alt="logo"></img>
          Medicare
        </a>

        <div class="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Message From Admin
            </h1>
            <p>
              We regret to inform you that your registration request has been
              rejected by the admin.You should delete your account and start
              from the signup.Please correct all of the data.{" "}
            </p>
            <p className="text-red-500">reason:{rejectReason}</p>
            <Popconfirm
              title="Delete the Account"
              description="Are you sure to delete your account?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button className="p-2 text-xs font-medium  tracking-wider text-white bg-red-500 rounded-lg  cursor-pointer uppercase hover:bg-opacity-95">
                Delete My Account
              </button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
}

export default Approvel;
