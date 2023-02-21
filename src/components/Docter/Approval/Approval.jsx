import React from "react";

function Approvel() {
  return (
    <>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
           <img class="w-8 h-8 mr-2" src="/logo2.png" alt="logo"></img>
          Medicare
        </a>

        <div class="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Need admin approval
            </h1>
            <p>
              You needs permission to access our service, it takes may be 12
              hours,please cooperate with us
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Approvel;
