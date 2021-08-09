import React,{useEffect,useState} from "react";
import { selectSearchTerm,selectedDate,selectAppointmentHistoryList } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import { updateAppointmentsHistoryList } from '../../slices/appointmentSlice';
import {getAsyncData,getAsyncPostData} from '../../utils/ApiRequests';
export default function CardAppointmentHistoryData() {
      const appointmentHistoryList = useSelector(selectAppointmentHistoryList)
      const searchText = useSelector(selectSearchTerm)
      const searchDate = useSelector(selectedDate)
      const dispatch = useDispatch();
      const getAppointmentList = async() =>{
        const params={
           status: '2',
           date:'2021-08-21',
           name:'gaurav',
       }
          const response = await getAsyncData('/booking/list',params);
          console.log(response,"res in history"); 
         // dispatch(updateConfig(response));
         // setProfileInfo(response);
       }
       useEffect( () => {
         //get the dashboard data from api
         getAppointmentList();
       }, [])
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
            {appointmentHistoryList?.filter((val)=>{
              if(searchText==="" && searchDate===null){
                return val;
              }
              else if(searchText==="" && new Date(val.date).setHours(0,0,0,0) === new Date(searchDate).setHours(0,0,0,0)){
                return val;
              }else if((searchText!=="") && 
                (val.name.toLowerCase().includes(searchText?.toLowerCase())||
                val.phoneNumber.includes(searchText)||
                (new Date(val.date).setHours(0,0,0,0) === new Date(searchDate).setHours(0,0,0,0)))){                    
                    return val;                           
                }
            })
            .map((patient=>(
              <tr key={patient.uuid}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">                 
                  <span className="ml-3 font-bold text-blueGray-600">{patient.name}</span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {patient.phoneNumber}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span>{patient.date}</span>
                </td>              
                <td className="hidden md:block border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span>{patient.paymentMode}</span>
                </td>
              </tr>
            )))} 
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}


