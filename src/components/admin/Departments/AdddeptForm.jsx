import React, { useState } from "react";
import axios from "../../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { message } from "antd";

function AdddeptForm() {
 
  const navigate = useNavigate();
  const [name, setName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [description, setDescrption] = useState(false);
  const [descrptionError, setDescrptionError] = useState("");
  const [deptImg, setDeptImg] = useState(false);
  const [deptImgError, setDeptImgError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      name: data.get("name"),
      description: data.get("description"),
      deptImg: data.get("deptImg"),
    };

    if (data.deptImg.name) {
      const dirs = Date.now();
      const rand = Math.random();
      const image = data.deptImg;
      const imageRef = ref(
        storage,
        `/doctordeptImg/${dirs}${rand}_${image?.name}`
      );
      const toBase64 = (image) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        }).catch((err) => {
          console.log(err);
        });
      const imgBase = await toBase64(image);
      await uploadString(imageRef, imgBase, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        data.deptImg = downloadURL;
      });
    } else {
      data.deptImg = "";
    }

    if (data.name && data.description && data.deptImg) {
      if (data.name) {
        setName(false);
        setNameError("");
        if (data.description) {
          setDescrption(false);
          setDescrptionError("");
          if (data.deptImg) {
            setDeptImg(false);
            setDeptImgError("");
            axios.post("/admin/speciality", data).then((response) => {
              console.log(response.data);
              if (response.data.status) {
                message.success('haiiiii')
                navigate("/admin/departments");
              } else {
                
                toast(response.data.message);
              }
            });
          } else {
            setDeptImg(true);
            setDeptImgError("Please upload image");
          }
        } else {
          setDescrption(true);
          setDescrptionError("Please enter description");
        }
      } else {
        setName(true);
        setNameError("Please enter name");
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
            <h4 className="text-xl">Add Department</h4>
          </div>
          <p class="text-red-500 text-xs italic"> {totalRequired}</p>

          <form
            className=" sm:w-[300px] md:w-[500px] lg:w-[700px]"
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
                class="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p class="text-red-500 text-xs italic"> {descrptionError}</p>
            </div>
            <div class="mb-6">
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

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdddeptForm;
