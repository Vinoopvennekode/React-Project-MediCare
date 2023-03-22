import React, { useState, useEffect } from "react";
import axios from "../../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import{message }from 'antd'
import { useSelector } from "react-redux";
import { ColorRing, Dna } from "react-loader-spinner";
import { firebaseImage } from "../../../firebase/firebaseImage";

function EditdeptForm() {
  // const [messageApi, contextHolder] = message.useMessage();
  const { token } = useSelector((state) => state.adminLogin);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [department, setDepartment] = useState([]);
  let data = location.state.id;
  const navigate = useNavigate();
  const [name, setName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [description, setDescrption] = useState(false);
  const [descrptionError, setDescrptionError] = useState("");
  const [deptImg, setDeptImg] = useState(false);
  const [deptImgError, setDeptImgError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionError, setSelectedOptionError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    axios
      .post(
        "/admin/singledepartment",
        { id: data },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        setDepartment(res.data.department);
        setSelectedOption(res.data.department.status);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = new FormData(e.currentTarget);
    data = {
      name: data.get("name"),
      description: data.get("description"),
      deptImg: data.get("deptImg"),
      status: data.get("status"),
    };
    if (!data.deptImg.name) {
      data.deptImg = department.deptImg;
    }
    if (data.name && data.description && data.deptImg) {
      const regName = /^[a-zA-Z]+$/;
      if (regName.test(data.name)) {
        setName(false);
        setNameError("");
        if (data.description) {
          setDescrption(false);
          setDescrptionError("");
          if (data.deptImg) {
            if (data.deptImg !== department.deptImg) {
              const url =await firebaseImage(data.deptImg)
              data.deptImg=url
            }
            setDeptImg(false);
            setDeptImgError("");
            axios
              .post(
                "/admin/editDept",
                { data: data, id: department._id },
                { headers: { Authorization: token } }
              )
              .then((response) => {
                if (response.data.message) {
                  setLoading(false)
              message.error(response.data.message);
              message.success(response.data.message);
                  navigate("/admin/departments");
                } else {
                  toast('somthing went wrong');
                }
              });
          } else {
            setLoading(false)
            setDeptImg(true);
            setDeptImgError("Please upload image");
          }
        } else {
          setLoading(false)
          setDescrption(true);
          setDescrptionError("Please enter description");
        }
      } else {
        setLoading(false)
        setName(true);
        setNameError("Please enter valid speciality name");
      }
    } else {
      setTotalRequired("All feilds are required");
    }
  };

  return (
    <>
  
      <ToastContainer />
      <div className="mt-9 flex justify-center">
        <div className="flex flex-col">
          <div className="mb-9">
            {" "}
            <h4 className="text-lg">Edit Department</h4>
          </div>
          <p class="text-red-500 text-xs italic"> {totalRequired}</p>

          <form
            className=" sm:w-[300px] md:w-[400px] lg:w-[500px]"
            onSubmit={handleSubmit}
          >
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={department?.name}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p class="text-red-500 text-xs italic"> {nameError}</p>
            </div>

            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                id="text"
                name="description"
                defaultValue={department?.description}
                class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p class="text-red-500 text-xs italic"> {descrptionError}</p>
            </div>
            <div class="mb-6">
              <img src={department.deptImg} width={"150px"} alt="" />
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <input
                type="file"
                id="confirm_password"
                name="deptImg"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
              />
              <p class="text-red-500 text-xs italic"> {deptImgError}</p>
            </div>

            <div className="mb-6">
              <label className=" text-gray-700 font-medium mb-2 " htmlFor="sex">
                Status
              </label>
              <div className="flex  flex-wrap mb-6 ">
                <div className=" p-2   ">
                  <input
                    type="radio"
                    id="Active"
                    name="status"
                    value="Active"
                    checked={selectedOption === "Active"}
                    onChange={handleOptionChange}
                  />
                  <label className="mx-1" htmlFor="Active">
                    Active
                  </label>
                </div>
                <div className="  p-2  ">
                  <input
                    type="radio"
                    id="Inactive"
                    name="status"
                    value="Inactive"
                    checked={selectedOption === "Inactive"}
                    onChange={handleOptionChange}
                  />
                  <label className="mx-1" htmlFor="Inactive">
                    Inactive
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          {loading && (
            <div className=" p-10 bg-gray-100 rounded-lg overflow-auto shadow-xl transform transition-all opacity-70 fixed inset-0 z-50  ">
              <div className=" flex h-screen justify-center items-center ">
                <div className="flex-col justify-center   py-12 px-10 ">
                  <Dna
                    visible={true}
                    height="160"
                    width="160"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditdeptForm;
