import React from "react";

function table() {
  return (
    <>
      <div class="p-10 h-screen bg-gray-200">
        <h1 class="text-xl mb-2">DOCTERS</h1>
        <div class='overflow-auto rounded-lg shadow-md'> 
        <table class='w-full'>
          <thead class='bg-gray-100 border-b-2 border-gray-200'>
            <tr>
              <th class='p-3 text-sm font-semibold tracking-wide text-left'>No.</th>
              <th class='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
              <th class='p-3 text-sm font-semibold tracking-wide text-left'>Address</th>
              <th class='p-3 text-sm font-semibold tracking-wide text-left'>Mobile</th>
            </tr>
          </thead>
          <tbody class='divide-y divide-gray-100'>
            <tr>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>1001</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'> Dr.Ajay</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>Address,Address,malappuram,kerala</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>9898989898</td>
            </tr>
            <tr>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>1001</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'> Dr.Gopi</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>Address,Address,malappuram,kerala</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>78787878787</td>
            </tr>
            <tr> 
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>1001</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'> Dr.Achu</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>Address,Address,malappuram,kerala</td>
                <td class='p-3 text-sm text-gray-700 whitespace-nowrap'>54685432217</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

export default table;
