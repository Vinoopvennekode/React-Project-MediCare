import React from "react";
import Card from "./Card";

import { AddAPhoto } from "@mui/icons-material";

const Carousel = () => {
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

        <   div
          id="content"  
          className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide"
        >
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
