import React from "react";
import Card from "./Card";

import { AddAPhoto } from "@mui/icons-material";

const Carousel = () => {
  const arr = [
    "Cardiology",
    "Endocrinology",
    "Family Medicine",
    "Neurology",
    "Pathology",
    "Pediatrics",
    "Urology",
  ];

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
          <div className=" p-4  text-xl ">
            Book an appointment for an in-clinic consultation
          </div>

          <div className="pl-4">
            Find experienced doctors across all specialties
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
          {arr.map((name) => {
            return (
              <div>
                <div className="card bg-white w-[200px] h-[310px] m-5 rounded-lg shadow-lg  ">
                  <div className="top">
                    <img
                      className="w-[200px] h-[200px] object-cover  p-2"
                      src="https://www.towerdental.com.au/uploads/170/46/Untitled-design-49.png"
                      alt="img"
                    />
                  </div>
                  <div className="bottom flex flex-col justify-center items-start p-3 bg-">
                    <div className="title font-semibold text-xs my-1">
                      {name}
                    </div>
                    <div className="category text-xs font-light my-1">
                      Speciality
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
