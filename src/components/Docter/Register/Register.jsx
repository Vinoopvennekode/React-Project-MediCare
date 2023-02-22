import React, { useState } from "react";
import axios  from "../../../axios/axios";
import { useNavigate } from "react-router-dom";

import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/firebase';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [department, setDepartment] = useState(false);
  const [departmentError, setDepartmentError] = useState("");
  const [experience, setExperience] = useState(false);
  const [experienceError, setExperienceError] = useState("");
  const [location, setLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [gender, setGender] = useState(false);
  const [genderError, setGenderError] = useState("");
  const [totalRequired, setTotalRequired] = useState("");


  const handleSubmit = async(e) => {
    e.preventDefault();
    const docter = JSON.parse(localStorage.getItem('doctorToken'));
console.log(docter.docterId);
    let data = new FormData(e.currentTarget);
    data = {
      department: data.get("department"),
      phoneNumber: data.get("phoneNumber"),
      experience: data.get("experience"),
      gender: data.get("gender"),
      location:data.get('location'),
      doctorimg: data.get("doctorimg"),
      certificate:data.get ("certificate"),
      address:data.get("address"),
      docterId:docter.docterId

    };
    console.log(data);
    if (data.doctorimg.name) {
      const dirs = Date.now();
      const rand = Math.random();
      const image = data.doctorimg;
      const imageRef = ref(storage, `/doctorImages/${dirs}${rand}_${image?.name}`);
      const toBase64 = (image) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        }).catch((err) => {
          console.log(err);
        });
      const imgBase =   await toBase64(image);
      await uploadString(imageRef, imgBase, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        data.doctorimg = downloadURL;
      });
    } else {
      data.doctorimg = '';
    }
    if (data.certificate.name) {
      const dirs = Date.now();
      const rand = Math.random();
      const image = data.certificate;
      const imageRef = ref(storage, `/doctorcertificate/${dirs}${rand}_${image?.name}`);
      const toBase64 = (image) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        }).catch((err) => {
          console.log(err);
        });
      const imgBase =   await toBase64(image);
      await uploadString(imageRef, imgBase, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        data.certificate = downloadURL;
      });
    } else {
      data.certificate = '';
    }
    console.log(data);

    axios.post("/docter/register", data).then((response) => {
      console.log(response.data);
      if (response.data.status === "success") {
        toast(response.data.status);

        navigate("/docter/register");
      } else {
        toast(response.data.message);
      }
    })
    
  };
  return (
    <>
      <div class="min-h-screen py-20">
      
        <div class="container flex justify-center ">
          <form component="form" onSubmit={handleSubmit}>
              
          
            <div class="grid gap-6 mb-6 md:grid-cols-2  ">
              <div>
                <label
                  for="website"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="flowbite.com"
                  required
                />
              </div>
              <div>
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Flowbite"
                  required
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Experience(in year)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
              <div>
                <label
                  for="location"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
             Location of clinic
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  required
                />
              </div>
              
            </div>
            <div class="mb-6">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <input
                type="file"
                id="doctorimg"
                name="doctorimg"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="certificate"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Certificate
              </label>
              <input
                type="file"
                id="certificate"
                name="certificate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address for communication
              </label>
              <input
                type="text"
                id="address"
                name="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
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

export default Register;
