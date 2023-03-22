import React, { useState } from "react";
import axios from '../../axios/axios' 
import { useSelector } from "react-redux";

const RejectModal = ({ doctorsM, setRejectModal,setRefresh,refresh}) => {
  const { token } = useSelector((state) => state.adminLogin);

  const [open, setOpen] = useState(false);

  const [required, setRequired] = useState("");



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


const handleSubmit=(event)=>{
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      reason: data.get("reason"),
    };
   
    if(data.reason){
        axios
        .patch("/admin/reject", { data:data.reason,id:doctorsM._id }, { headers: { Authorization: token } })
        .then((response) => {
          if (response.data.success) {
            setRejectModal(false)
            setRefresh(!refresh)
          }
        });
    }else{
        setRequired('field must be required')
    }
}



  return (
    <div className=" mt-10  bg-zinc-200 opacity-90 fixed inset-0 z-50  ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-green-300 py-12 px-10 ">
          enter reason
            <form action="" onSubmit={handleSubmit} className="flex flex-col items-center">
                <input type="text"name="reason" id="reason"className="h-auto resize-none" />
          <p className="text-red-500">{required}</p>
                <button type="sumbit" className="mt-8 p-2 text-xs font-medium  tracking-wider text-white bg-red-400 rounded-lg  cursor-pointer uppercase hover:bg-opacity-95">Reject</button>
            </form>

          
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
