import React from "react";
import { FacebookOutlined, Instagram, Twitter } from "@mui/icons-material";

const footer = () => {
  return (
    <>
      <div className="h-full bg-slate-300">
        <div className="container mx-auto px-4 pt-7">
          <div className="flex flex-wrap">
            <div className="w-full md:w-3/12 px-14">
              <ul className="">
                <li className="flex justify-center">
                  <img max-width={"80%"} src="./logo.png" alt="" />
                </li>
                <li className="flex justify-center pb-8">
                  <ul className="list-unstyled  cursor-pointer flex flex-row">
                    <li className="mx-5">
                      <span className="text-black hover:text-blue-900">
                        <FacebookOutlined />
                      </span>
                    </li>
                    <li className="mx-5">
                      <span className="text-black hover:text-orange-600">
                        <Instagram />
                      </span>
                    </li>
                    <li className="mx-5">
                      <span className="text-black hover:text-teal-400">
                        <Twitter />
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-3/12 px-14">
              <h4 className="font-normal text-1 mb-4">MEDICARE</h4>
              <ul className="list-unstyled  cursor-pointer">
                <li >
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    Home
                  </span>
                </li>
                <li>
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    About
                  </span>
                </li>
                <li>
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    Services
                  </span>
                </li>
                <li>
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    Contact
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-3/12 px-14">
              <ul className="list-unstyled  cursor-pointer">
                <li className="mb-2">
                  <span className="text-[#57CC99]	text-sm ">
                    Our specialities
                  </span>
                </li>
                <li>
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    Dentists
                  </span>
                </li>
                <li>
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    Cardiologist
                  </span>
                </li>
                <li>
                  <span className="text-white text-xs hover:text-[#57CC99]">
                    Pediatrics
                  </span>
                </li>
                <li>
                  <span className="text-white text-xs hover:text-[#57CC99]">
                    Ophthalmology
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-3/12 px-14 ">
              <ul className="list-unstyled  cursor-pointer">
                <li className="mb-2">
                  <span className="text-[#57CC99]	text-sm hover:text-black">
                    Home
                  </span>
                </li>
                <li>
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    About
                  </span>
                </li>
                <li>
                  <span className="text-white	text-xs hover:text-[#57CC99]">
                    Services
                  </span>
                </li>
                <li className="mb-20">
                  <span className="text-white text-xs hover:text-[#57CC99]">
                    Contact
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default footer;
