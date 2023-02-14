import React from "react";

const Card2 = () => {
  const arr = ["anna", "ajay", "brototype", "akshay", "sahad", "broto"];

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

      <div id="content" className="carousel px-20 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide">
        {arr.map((name) => {
          return (
            <div>
            <div className="card flex flex-col justify-center bg-white w-[200px] h-[350px]">
              <div className="top">
                <img className="rounded-full  " src="./cough.jpg" alt="" />
              </div>
              <div className="bottom flex justify-center items-start p-3 bg-">
                <div className="font-semibold text-md my-1">{name}</div>
              </div>
              <button class="bg-transparent hover:bg-blue-500 text-blue-700 font hover:text-white py-2 px-4  hover:border-transparent rounded">
                Consult Now
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
