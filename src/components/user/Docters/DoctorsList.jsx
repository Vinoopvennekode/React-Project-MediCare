import React,{useState} from 'react'


function DoctorsList({doc}) {
    const [open, setOpen] = useState(false);


  return (
    <div className="p-10 flex flex-col sm:flex sm:flex-row justify-between border-b-4  border-gray-200">
                <div className="flex  items-center">
                  <img src="/logo2.png" className="w-[100px]" alt="" />
                  <div className=" m-4 flex flex-col">
                    <h1 className="text-xl">{doc.firstName}</h1>
                    <p>{doc.speciality}</p>
                    <p>{doc.location}</p>
                  </div>
                </div>
                <div className=" m-4 flex flex-col">
                  <button onClick={(e)=>setOpen(true)} className="m-3 p-2 text-xs font-medium  tracking-wider text-white bg-green-600 rounded-lg  cursor-pointer hover:bg-opacity-80">
                    Book appoinment
                  </button>
                  <button  onClick={(e) => setOpen(false)} className="m-3 p-2 text-xs font-medium  tracking-wider text-white bg-green-600 rounded-lg  cursor-pointer hover:bg-opacity-80">
                    {" "}
                    view profile
                  </button>
                </div>
                { open?<div className="bg-black">
hy
                </div>:null}
              </div>
  )
}

export default DoctorsList