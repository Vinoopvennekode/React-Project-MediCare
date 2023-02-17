import React from "react";

function Banner() {
  return (
    <>
      <div class="bg-gray-200 mt-16">
        <div class="w-100% md:h-[414px] sm:h-[350px] bg-[url('./DocterBanner.png')] md:flex md:justify-between items-center">
          <div class="p-5">
            <span class="text-white text-md">
              Your health is our priority !
            </span>
            <h1 class="text-white  tracking-wide text-6xl">
              We care about your helth
            </h1>
          </div>
          <form class="w-full max-w-sm p-5">
            <span class="text-white text-xl">Find Your Docter</span>

            <div class="flex items-end  ">
              <input
                class=" bg-white border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter your pincode"
              />

              <button
                class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <main class="grid grid-cols-4 ">
          <div class="col-span-1 m-5 hidden md:block">
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
              Speciality
            </h3>
            <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="vue-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="vue-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Dentist
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="react-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="react-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Orthopedics
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="angular-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="angular-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Internal Medicine
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center pl-3">
                  <input
                    id="laravel-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="laravel-checkbox"
                    class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Pediatrics
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class=" m-10 grid flex justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 col-span-3">
            <div class="w-[200px] bg-white rounded overflow-hidden border shadow-md relative ">
              <img src="./docter.jpg" alt="" />
              <div class="m-2">
                <span class="font-bold text-md">Docter name</span>
                <span class="block text-gray-400 text-sm"> Speciality</span>
              </div>
              <div class="bg-gray-200  uppercase rounded-full p-1 absolute top-0 ml-2 mt-2">
                <span class="text-sm"> Popular</span>
              </div>
            </div>
            <div class="w-[200px] bg-white rounded overflow-hidden border shadow-md relative ">
              <img src="./docter.jpg" alt="" />
              <div class="m-2">
                <span class="font-bold text-md">Docter name</span>
                <span class="block text-gray-400 text-sm"> Speciality</span>
              </div>
              <div class="bg-gray-200  uppercase rounded-full p-1 absolute top-0 ml-2 mt-2">
                <span class="text-sm"> Popular</span>
              </div>
            </div>
            <div class="w-[200px] bg-white rounded overflow-hidden border shadow-md relative ">
              <img src="./docter.jpg" alt="" />
              <div class="m-2">
                <span class="font-bold text-md">Docter name</span>
                <span class="block text-gray-400 text-sm"> Speciality</span>
              </div>
              <div class="bg-gray-200  uppercase rounded-full p-1 absolute top-0 ml-2 mt-2">
                <span class="text-sm"> Popular</span>
              </div>
            </div>
            <div class="w-[200px] bg-white rounded overflow-hidden border shadow-md relative ">
              <img src="./docter.jpg" alt="" />
              <div class="m-2">
                <span class="font-bold text-md">Docter name</span>
                <span class="block text-gray-400 text-sm"> Speciality</span>
              </div>
              <div class="bg-gray-200  uppercase rounded-full p-1 absolute top-0 ml-2 mt-2">
                <span class="text-sm"> Popular</span>
              </div>
            </div>
            <div class="w-[200px] bg-white rounded overflow-hidden border shadow-md relative ">
              <img src="./docter.jpg" alt="" />
              <div class="m-2">
                <span class="font-bold text-md">Docter name</span>
                <span class="block text-gray-400 text-sm"> Speciality</span>
              </div>
              <div class="bg-gray-200  uppercase rounded-full p-1 absolute top-0 ml-2 mt-2">
                <span class="text-sm"> Popular</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Banner;
