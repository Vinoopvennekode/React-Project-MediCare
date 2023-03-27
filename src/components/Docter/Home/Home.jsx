import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const arr = [
    {
      name: "Appoinment -pending",
      des: "select for approving appoinmnet",
      img: "/appionmentPending.jpg",
      url: "/doctor/appoinments",
    },
    {
      name: "scheduled Appoinment",
      des: "your Scheduled appoinments Here",
      img: "/schedulAppoinment.jpg",
      url: "/doctor/schedule",
    },
    {
      name: "Appoinment History",
      des: "Click here for apinment history",
      img: "/appionmentHistory.jpg",
      url: "/doctor/history",
    },
    {
      name: "Profile",
      des: "View your profile",
      img: "/doctorProfile.jpg",
      url: "/doctor/profile",
    },

    {
      name: "Dashboard",
      des: "View Dash",
      img: "/dashBoard.png",
      url: "/doctor/dashboard",
    },
  ];
  return (
    <>
      <div className="mt-16">
        <div className=" bg-[#38A3A5] w-full h-[250px] md:h-[300px]   md:flex flex-col ">
          <div className="text-white text-xl p-6 ">WELCOME DOCTOR</div>
          <div className="text-white text-3xl md:text-5xl p-6">
            Efficiently manage appointments and provide exceptional care with
            our doctor appointment system .
          </div>
        </div>
        <div className="flex justify-center mt-9">
          <h3 className="text-3xl">Select your option</h3>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {arr.map((app) => {
              return (
                <div>
                  <div
                    onClick={() => navigate(app.url)}
                    className="card mx-9 cursor-pointer  bg-gray-300 w-[200px] h-[300px] m-2 rounded-lg shadow-lg "
                  >
                    <div className="top">
                      <img
                        className="w-[200px] h-[200px] object-cover  p-2"
                        src={app.img}
                        alt="img"
                      />
                    </div>
                    <div className="bottom flex flex-col justify-center items-start p-3 bg-">
                      <div className="title font-semibold text-xs my-1">
                        {app.name}
                      </div>
                      <div className="category text-xs font-light my-1">
                        {app.des}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
