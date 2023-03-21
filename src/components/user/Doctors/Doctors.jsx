import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import DoctorsList from "./DoctorsList";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiChevronLeft, FiLogIn } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
function Doctors() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [SearchInput, setSearchInput] = useState("");
  const [department, setDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [feeFilter, setFeeFilter] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const { token } = useSelector((state) => state.userLogin);
  // useEffect(() => {
  //   axios.get("/doctors").then((res) => {
  //     setDoctors(res.data.doctor);
  //     console.log(res.data.doctor, "=========================");
  //   });
  // }, [refresh === 0]);

  useEffect(() => {
    axios.get("/departments").then((res) => {
      setDepartments(res.data.departments);
    });
  }, []);

  useEffect(() => {
    try {
      axios
        .get(
          `/getDoctors/doctors?page=${currentPage}&limit=3&sortBy=${sortBy}&sortOrder=${sortOrder}&searchLocation=${searchLocation}&department=${department}`,
          { headers: { Authorization: token } }
        )
        .then((response) => {
          setDoctors(response.data.data);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
        });
    } catch (err) {
      console.error(err);
    }
  }, [currentPage, sortBy, sortOrder, feeFilter, searchLocation, department]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setRefresh(0);
    if (SearchInput) {
      let uppdateUse = doctors.filter(
        (item) =>
          item.firstName
            .toString()
            .toLowerCase()
            .indexOf(SearchInput.toLowerCase()) > -1
      );
      console.log(uppdateUse);
      setDoctors(uppdateUse);
    } else {
      setRefresh(1);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleSortDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchLocation(event.target.value);
  };
  return (
    <>
      <div className=" mt-14">
        <div className="flex  justify-center border-b-2">
          <div className="p-10">
            <input
              type="text"
              id="first_name"
              className="sm:w-[300px] md:w-[600px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by place....."
              onChange={handleSearchChange}
              value={searchLocation}
            />
          </div>
        </div>

        <div className="sm:flex">
          
          <div className="md:w-1/3  h-20">
            <div className=" flex ml-28 flex-col  space-y-4 mt-16 w-44">
              <div className="flex flex-col">
                <label className="text-[#194569] font-medium" htmlFor="sortBy">
                  Filter By: Departments
                </label>
                <select
                  id="sortBy"
                  className="w-28"
                  value={department}
                  onChange={handleSortDepartment}
                ><option key={'all'}> All</option>
                  {departments?.map((dep) => (
                    <option key={dep._id}>{dep.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[#194569] font-medium" htmlFor="sortBy">
                  Sort By:
                </label>
                <select
                  id="sortBy"
                  className="w-28"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="createdAt">Date</option>
                  <option value="fee">Fee</option>
                  <option value="experience">Experience</option>
                </select>
              </div>
              <div className="flex flex-col ">
                <label
                  className="text-[#194569] font-medium"
                  htmlFor="sortOrder"
                >
                  Order:
                </label>
                <select
                  id="sortOrder"
                  className="w-28"
                  value={sortOrder}
                  onChange={handleOrderChange}
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 h-full flex mt-16 flex-col">
            {doctors.length !== 0 ? (
              doctors?.map((doc) => {
                return <DoctorsList doc={doc} />;
              })
            ) : (
              <div className="flex justify-center my-20">
                <h2 className="text-4xl">Sorry ,we could'nt find the data</h2>
              </div>
            )}
          </div>
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

export default Doctors;
