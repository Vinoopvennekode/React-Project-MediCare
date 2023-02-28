import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../axios/axios";
import Swal from 'sweetalert2';
import { message } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function department() {
  const navigate=useNavigate()
  const location = useLocation();
  const [department, setDepartment] = useState([]);
  let data = location.state.id;

  useEffect(() => {
    axios.post("/admin/singledepartment", { id: data }).then((res) => {
      console.log(res.data);
      setDepartment(res.data.department);
    });
  }, []);


  const [dropdown, setDropdown] = useState(false);
  function handleDelete(id) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Implement delete logic
        axios.delete(`/admin/deleteDepartment?id=${id}`).then((response) => {
            if(response.data.success){
                console.log(response.data,"response");
                toast(response.data.message)
     
            navigate('/admin/departments')
            }else{
              toast(response.data.message)
            }
          })
         
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
        setDropdown(!dropdown)

      }else{
        setDropdown(!dropdown)
      }
    });
  }


  
  return (
    <div className="m-8 flex justify-center">
      <div className="bg-white h-full w-[500px] flex flex-col  items-center">
        <img className="mt-6" src={department.deptImg} width={200} alt="" />
        <div className="mt-6">
          <h1 className=" text-bold text-xl">{department.name}</h1>
        </div>
        <div className="p-6">
          <h4 className="text-sm">{department.description}</h4>
        </div>
       
        <div>
          {department.status == 'Active' ? (
            <p className="p-6">Status:ACTIVE</p>
          ) : (
            <p className="p-6">Status:INACTIVE</p>
          )}
        </div>
        <div className="p-6">
          <button onClick={()=>navigate('/admin/editDept',{state:{id:department._id}})} className="p-2 mx-6 text-xs font-medium  tracking-wider text-white bg-green-500 rounded-lg  cursor-pointer hover:bg-opacity-95">
            EDIT
          </button>
          <button    onClick={()=>handleDelete(department._id)} className="p-2 mx-6 text-xs font-medium  tracking-wider text-white bg-red-500 rounded-lg  cursor-pointer hover:bg-opacity-95">
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default department;
