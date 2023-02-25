import React from "react";

function Home() {
  const arr = [{name:"Appoinment -pending",des:"select for approving appoinmnet"},{name:"scheduled Appoinment",des:"your Scheduled appoinments Here"},{name:"Appoinment History",des:"Click here for apinment history"},{name:"Upcoming"}];
  return (
    <>
      <div className="mt-6">
        <div className=" bg-slate-400 w-full h-[300px] md:h-[350px]   md:flex justify-between items-center">
          <div className="text-white text-lg p-4 ">WELCOME DOCTER</div>
          <div className="text-white text-6xl p-4">
            We care about your helth
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
                  <div className="card mx-9 bg-gray-300 w-[200px] h-[300px] m-2 rounded-lg shadow-lg ">
                    <div className="top">
                      <img
                        className="w-[200px] h-[200px] object-cover  p-2"
                        src="https://www.towerdental.com.au/uploads/170/46/Untitled-design-49.png"
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
