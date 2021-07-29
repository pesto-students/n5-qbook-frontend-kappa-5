import React from "react";

export default function CardConfig() {
  return (
    <>
      <div className="relative flex flex-col  min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="flex flex-wrap flex-col m-20 space-y-2">
         

          <div className="w-full lg:w-6/12 px-4 mt-5">
                <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              ON/OFF DUTY (Adhoc)
            </button>
              </div>
              <div className="w-full lg:w-6/12 px-4 mt-5">
                <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Cancel All Appointments
            </button>
              </div>
              <div className="w-full lg:w-6/12 px-4 mt-5 mb-5">
                <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              ON/OFF  Notifications
            </button>
              </div>
          
        </div>
      </div>
    </>
  );
}
