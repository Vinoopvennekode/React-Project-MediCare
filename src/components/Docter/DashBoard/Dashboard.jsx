import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'jspdf-autotable';
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
function DashBoard() {
  const [dashboard, setDashboard] = useState([]);
  const [salesReport, setSalesReport] = useState([]);
  const { id, token } = useSelector((state) => state.doctorLogin);
  const arr = [
    {
      name: "Total Appoinments",
      image:
        "https://www.transparentpng.com/thumb/calendar/green-calendar-vector-icon-png-20.png",
      number: dashboard.totalAppoinments,
    },
    {
      name: "Cancled appoinments",
      image: "/cancled.png",
      number: dashboard.canceled,
    },
    {
      name: "Total visitors",
      image: "/visitors.png",
      number: dashboard.checked,
    },
    {
      name: "Pending Vistors",
      image: "/pending.png",
      number: dashboard.pending,
    },
  ];

  const downloadPDF = (table) => {
    console.log(table);
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.autoTable({ html: table });
      pdf.save("table.pdf");
    });
  };

  useEffect(() => {
    axios
      .post(
        "/doctor/dashboard",
        { data: id },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res.data);
        setDashboard(res.data);
        setSalesReport(res.data.salesReport);
      });
  }, []);

  return (
    <div className="mt-16">
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2  lg:grid-cols-4 ">
          {arr.map((app) => {
            return (
              <div>
                <div className=" flex justify-between card mx-9 cursor-pointer  bg-gray-300 w-[250px] h-[100px] m-2 rounded-lg shadow-lg ">
                  <div className=" ">
                    <img
                      className="w-[80px] h-[80px] object-cover p-2"
                      src={app.image}
                      alt="img"
                    />
                  </div>
                  <div className=" flex flex-col  items-end  p-3 bg-">
                    <div className="title font-semibold text-sm ">
                      {app.name}
                    </div>
                    <div className="title font-semibold text-5xl my-1">
                      {app.number}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
      
      {salesReport.length !== 0 && (
        
        <div className=" m-10  flex justify-center overflow-auto">
          
          <table id="my-table" className="w-6/12">
            
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Month
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Year
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Total checked appoinments
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  Total Sales
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white divide-y divide-gray-200">
              {salesReport.map((salesReport) => (
                <tr className="">
                  <td className=" p-3 text-sm text-gray-700 text-center">
                    {salesReport.month}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {salesReport.year}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {salesReport.count}
                  </td>
                  <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {salesReport.totalSales}
                  </td>
                </tr>
              ))}
            </tbody>
            
            <button
            className="p-2 bg-green-200"
            onClick={() => downloadPDF(document.getElementById("my-table"))}
          >
            Download PDF
          </button>
          </table>
          
        </div>
        
        
      )}
      
    </div>
  );
}

export default DashBoard;
