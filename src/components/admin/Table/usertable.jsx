import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { useSelector ,useDispatch} from "react-redux";
import Pagination from "@mui/material/Pagination";
import { setLogin } from "../../../Store/Slice/UserLogin";

function table() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useSelector((state) => state.adminLogin);

  useEffect(() => {
    axios.get(`/admin/users?page=${currentPage}&limit=4`,{headers:{'Authorization':token}}).then((res) => {
      setUsers(res.data.users);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    });
  }, [refresh,currentPage]);
  const blockUser = (id) => {
    axios.patch("/admin/blockUser", { id },{headers:{'Authorization':token}}).then((res) => {
      if (res.data.success) {
      
        dispatch(
          setLogin({
            user: "user",
         
            block:'true'
          })
        );
        setRefresh(!refresh)
       
      } else {
        message.error(res.data.message);
      }
    });
  };

  const unblockUser = (id) => {
    axios.patch("/admin/unblockUser", { id },{headers:{'Authorization':token}}).then((response) => {
      if (response.data.success) {
        dispatch(
          setLogin({
            user: "user",
         
            block:'false'
          })
        );
        setRefresh(!refresh)
      
      } else {
        message.error(response.data.message);
      }
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
        <div className="flex justify-center my-8">
          {totalPages !== 0 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default table;
