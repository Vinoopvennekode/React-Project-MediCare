import React from "react";
import {useNavigate} from 'react-router-dom'

const Card2 = () => {
  const navigate=useNavigate()
  const arr = [
    "Acne, pimple or skin issues",
    "Cold, cough or fever",
    "Child not feeling well",
    "Depression or anxiety",
    "Period doubts or Pregnancy ",
    "Joint pain or muscle pain in children",
  ];

  return (
    <>
      <div className="relative ">
        <div className=" px-4  text-xl ">
          Book an appointment for an in-clinic consultation
        </div>

        <div className="px-4">
          Find experienced doctors across all specialties
        </div>
      </div>

      <div
        id="content"
        className="carousel px-20 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {arr.map((name) => {
          return (
            <div>
              <div className="card flex flex-col justify-center bg-white w-[200px] h-[350px]">
                <div className="top">
                  <img className="rounded-full  " src="/cough.jpg" alt="" />
                </div>
                <div className="bottom flex justify-center items-center p-3 bg-">
                  <div className=" text-md my-1">{name}</div>
                </div>
                <button onClick={()=>navigate('/doctors')} className="bg-transparent hover:bg-blue-500 text-blue-700 font hover:text-white py-2 px-4  hover:border-transparent rounded">
                   Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card2;
