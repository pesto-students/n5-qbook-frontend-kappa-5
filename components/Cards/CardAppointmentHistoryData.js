import React,{useEffect,useState} from "react";
import { selectSearchTerm, updateAppointmentsHistoryList } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import {getAsyncData} from '../../utils/ApiRequests';
import CardLoader from "./CardLoader";
import LoadingOverlay from "react-loading-overlay";
export default function CardAppointmentHistoryData() {
  const [loading,setLoading] = useState(false);
      const searchText = useSelector(selectSearchTerm)
      const dispatch = useDispatch();
      const [errorMessage,setErrorMessage] = useState(false);
      const [appointmentHistoryList,setAppointmentHistoryList] = useState();
      const getAppointmentHistoryList = async() =>{
            const params={
              status: '2',
          }
          try{
            setLoading(true);
            const response = await getAsyncData('/booking/list',params);
            if(response){
              dispatch(updateAppointmentsHistoryList(response?.data));
              setAppointmentHistoryList(response?.data);
              setLoading(false);
            } 
          }
          catch{
            setErrorMessage(true)
          }
       }
       useEffect( () => {
         //get the appointment history list data from api for todays date
         getAppointmentHistoryList();
       }, [])
  return (
    <>
      <LoadingOverlay active={loading} spinner text="">
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
              let patientName = val?.customerInfo?.name;
              let phoneNumber = val?.customerInfo?.mobile
              if(searchText===""){
                return val;
              }
             else if((searchText!=="") && 
                (patientName?.toString()?.toLowerCase().includes(searchText?.toLowerCase())||
                phoneNumber?.toString()?.toLowerCase().includes(searchText)
                )){                    
                    return val;                           
                }
            })
            .map((patient=>(
              <tr key={patient?.id}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">                 
                  <span className="ml-3 font-bold text-blueGray-600">{patient?.customerInfo?.name}</span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {patient?.customerInfo?.mobile}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span>{patient?.bookingDateTime?.split("T")[0]}</span>
                </td>              
                <td className="hidden md:block border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span>{patient.paymentMode}</span>
                </td>
              </tr>
            )))} 
            </tbody>
          </table>
        </div>
        {errorMessage &&
            <p className="block uppercase text-xs font-bold text-red-500 px-2">Unable to get the appointments..</p>
           }
      </div>
      </LoadingOverlay>

    </>
  );
}


