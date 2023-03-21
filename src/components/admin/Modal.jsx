import React, { useState } from "react";

const Modal = ({ setModalOn, setChoice, doctorsM }) => {
  const [open, setOpen] = useState(false);

  const clicked = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };
  const handleOKClick = () => {
    setChoice(true);
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setChoice(false);
    setModalOn(false);
  };

  return (
    <div className=" mt-10  bg-zinc-200 opacity-90 fixed inset-0 z-50  ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-white py-12 px-10 ">
          <div className="flex    text-zinc-600   mb-10">
            <div>
              <img src={doctorsM.doctorimg} width={"150px"} alt="" />
            </div>
            <div className="px-5">
              <h1 className="text-md font-bold">{doctorsM.firstName}</h1>
              <p className="text-sm"> {doctorsM.department}</p>
              <p className="text-sm">Mims Hospital,Kozhikode,Kerala,India</p>
              <div className="pt-5">
                <p className="font-semibold text-sm	 text-green-400">
                  Experience{" "}
                  <span className=" text-black font-light	text-xs">
                    {doctorsM.experience}
                  </span>{" "}
                </p>
                <p className="font-semibold text-sm	 text-green-400">
                  Gender{" "}
                  <span className=" text-black font-light text-xs	">
                    {" "}
                    {doctorsM.gender}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-around my-5">
            <div>
              <p className="text-sm font-medium mb-2">certificate</p>
              <img
                className="cursor-pointer"
                onClick={() => clicked()}
                src={doctorsM.certificate}
                width={"80px"}
                alt=""
              />
              {open && (
                <div className="  mt-10 bg-zinc-200  fixed inset-0 z-50 ">
                  <div className="flex h-screen justify-center items-center relative">
                    <button
                      className="absolute top-20 right-20 ml-2 mt-10"
                      onClick={() => close()}
                    >
                      {" "}
                      close
                    </button>
                    <img
                      className="cursor-pointer"
                      onClick={() => clicked()}
                      src={doctorsM.certificate}
                      width={"500px"}
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium mb-2">contact</p>
              <p className="text-xs mb-1">{doctorsM.email}</p>
              <p className="text-xs mb-1">{doctorsM.phoneNumber}</p>
              <p className="text-xs mb-1">Kozhikode,Kerala,India</p>
            </div>
          </div>

          <div className="flex justify-center mx-3">
            
            <button
              onClick={handleCancelClick}
              className="rounded px-4 py-2 ml-4 text-white bg-blue-500 "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
