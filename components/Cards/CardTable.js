import React from "react";
import { selectAppointmentList,selectSearchTerm,selectedDate,selectAppointmentHistoryList } from '../../slices/appointmentSlice'
import { useSelector } from 'react-redux';
import CardAppointmentHistoryData from "./CardAppointmentHistoryData";
import CardAppointmentData from "./CardAppointmentData";
export default function CardTable({fromHistory}) {
      const appointmentListData = useSelector(selectAppointmentList)
      const appointmentHistoryListData = useSelector(selectAppointmentHistoryList)
      const searchText = useSelector(selectSearchTerm)
      const searchDate = useSelector(selectedDate)
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Appointments
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Patient Name
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Phone Number
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Date
                </th>
                <th className="hidden md:block px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Payment Mode
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-56">
              { !fromHistory ?  <CardAppointmentData appointmentList={appointmentListData} 
                searchDate={searchDate}  searchText={searchText}/>
              : <CardAppointmentHistoryData appointmentList={appointmentHistoryListData} 
                searchDate={searchDate}  searchText={searchText}/>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}


