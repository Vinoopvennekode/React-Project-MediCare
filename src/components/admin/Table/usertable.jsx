import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";

function table() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { token } = useSelector((state) => state.adminLogin);
console.log(token,'admin token');
  useEffect(() => {
    axios.get("/admin/users",{headers:{'Authorization':token}}).then((res) => {
      setUsers(res.data.users);
    });
  }, [refresh]);

  const blockUser = (id) => {
    axios.patch("/admin/blockUser", { id },{headers:{'Authorization':token}}).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setRefresh(!refresh)
       
      } else {
        message.error(res.data.message);
      }
    });
  };

  const unblockUser = (id) => {
    console.log(id, "unblock");
    axios.patch("/admin/unblockUser", { id },{headers:{'Authorization':token}}).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setRefresh(!refresh)
      
      } else {
        message.error(response.data.message);
      }
    });
  };

  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <h1 class="text-xl mb-2">Users</h1>
        <div class="overflow-auto rounded-lg shadow-md">
          <table class="w-full">
            <thead class="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Address
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Mobile
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {users.map((user) => (
                <tr>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user._id}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {" "}
                    {user.name}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.phone}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.block == true ? (
                      <button
                        onClick={()=>unblockUser(user._id)}
                        className=" p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-green-600 rounded-lg bg-opacity-75 cursor-pointer hover:bg-opacity-95"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={()=>blockUser(user._id)}
                        className="  p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-red-600 rounded-lg bg-opacity-75 cursor-pointer"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default table;
