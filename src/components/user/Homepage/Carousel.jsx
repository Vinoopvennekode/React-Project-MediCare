import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "../../../axios/axios";
import { AddAPhoto } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Carousel = () => {
  const Navigate=useNavigate()
  const [departments, setDepartments] = useState([]);
const{token}=useSelector((state)=>state.userLogin)
  useEffect(() => {
    axios.get("/departments").then((res) => {
      setDepartments(res.data.departments);
    });
  }, []);

  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 400;
  };
  return (
    <>
      <div className="relative py-20">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className=" p-4  text-xl">
                Book an appointment for an in-clinic consultation
              </h3>

              <h5 className="pl-4">
                Find experienced doctors across all specialties
              </h5>
            </div>
            <div className="mt-8">

            <button onClick={()=>Navigate('/specialities')} className="mr-10 p-3 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer hover:bg-opacity-95">
              View all Specialities
            </button>
            </div>
          </div>
          {/* <div className="absolute right-0">
            <button
              onClick={scrollLeft}
              className="p-2 m-2 rounded-full bg-white"
            >
              <AddAPhoto />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 m-2 rounded-full bg-white"
            >
              <AddAPhoto />
            </button>
          </div> */}
        </div>

        <div
          id="content"
          className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide "
        >
          {departments.map((dep) => {
            return (
              <div>
                <div className="max-w-xs p-4 mx-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50 cursor-pointer">
                  <div className="top">
                    <img
                      className="object-cover object-center w-full rounded-md h-25 dark:bg-gray-500"
                      src={dep.deptImg}
                      alt="img"
                    />
                  </div>
                  <div className="bottom flex flex-col justify-center items-center p-3 bg-">
                    <div className="block text-xs font-medium tracking-widest uppercase dark:text-violet-400">
                      {dep.name}
                    </div>
                    <div className="text-xs  tracking-wide">
                      {dep.description}
                    </div>

                    <div className="flex justify-center my-2">
                      <button className="border px-3 py-1 text-xs rounded-lg ">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Carousel;