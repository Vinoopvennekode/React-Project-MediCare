import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";

function Modal({ setModalOn, app, date, doctorId }) {
  const [cancel, setCancel] = useState(false);
  const { id } = useSelector((state) => state.userLogin);
  const { token } = useSelector((state) => state.doctorLogin);

  const submit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = {
      date: date,
      doctorId: doctorId,
      userId: id,
      id: app._id,
      allotedTime: data.get("allotedTime"),
    };
    console.log(data);
    axios
      .post("/doctor/allotedTime", data, { headers: { Authorization: token } })
      .then((res) => {
        console.log(res.data);
      });
    setModalOn(false);
  };

  const handleCancelAppoinment = () => {
    axios
      .post(
        "/doctor/cancelAppoinment",
        { data: app._id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.data.status === "canceled") {
          setCancel(true);
        }
      });
  };
  const handleCancelClick = () => {
    setModalOn(false);
  };
  return (
    <div className=" mt-10  bg-zinc-500 opacity-90 fixed inset-0 z-50  ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-white py-12 px-10 ">
          <div className="flex    text-zinc-600   mb-10">
            <div>
              {/* <img src={doctorsM.doctorimg} width={"150px"} alt="" /> */}
            </div>
            <div className="">
              <h1 className="text-md font-bold">Patient Details</h1>
              <p className="text-md">
                Name <span className="text-sm">:: {app.user.name}</span>
              </p>
              <p className="text-md">
                Age <span className="text-sm"> :: {app.user.age}</span>
              </p>

              <p className="text-md">
                Symtoms <span className="text-sm"> :: {app.symptoms}</span>
              </p>
              <p className="text-md">
                Address <span className="text-sm"> :: {app.user.address}</span>
              </p>
              <p className="text-md">
                Status <span className="text-sm"> :: {app.status}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center mx-3">
            {app.status === "canceled" ? (
              "canceled"
            ) : app.status === "checked" ? (
              "checked"
            ) : (
              <form action="" onSubmit={submit}>
                <input type="time" name="allotedTime" />

                <button
                  type="submit"
                  className=" rounded px-4 py-2 ml-3 text-white  bg-green-400 "
                >
                  Approve
                </button>
              </form>
            )}
            {!(app.status === "canceled") && !(app.status === "checked") && (
              <button
                onClick={handleCancelAppoinment}
                className="rounded px-4 py-2 ml-4 text-white bg-red-400 "
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleCancelClick}
              className="rounded px-4 py-2 ml-4 text-white bg-blue-500 "
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
