import React,{useEffect} from "react";
import Link from "next/link";
import { selectAppointmentList,selectSearchTerm,updateAppointmentsList } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import {getAsyncData} from '../../utils/ApiRequests';
export default function CardAppointmentData() {
        const appointmentList = useSelector(selectAppointmentList)
        const searchText = useSelector(selectSearchTerm)
        const dispatch = useDispatch();
        //console.log(new Date().toJSON().slice(0,10),"date")
        const getAppointmentList = async() =>{
        const params={
          status: '1',
          date:new Date().toJSON().slice(0,10),
          name:'',
        }
        const response = await getAsyncData('/booking/list',params);
        dispatch(updateAppointmentsList(response.data)); 
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
                <th className="hidden md:block lg:table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Payment Mode
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-56">
            {appointmentList?.filter((val)=>{
              if(searchText===""){
                return val;
              }
              else if((searchText!=="") && 
                (val.name.toLowerCase().includes(searchText?.toLowerCase())||
                val.phoneNumber.includes(searchText)
                )){                    
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
				        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <Link href={`/doctor/consultation/${patient.uuid}`}>
                <button className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-2 md:px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button">Start</button></Link>
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


