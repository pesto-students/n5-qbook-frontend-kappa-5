import React,{useEffect,useState} from "react";
import { selectSearchTerm, updateAppointmentsHistoryList,selectedDate } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import {getAsyncData} from '../../utils/ApiRequests';
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';
export default function CardAppointmentHistoryData() {
  const [loading,setLoading] = useState(false);
      const searchText = useSelector(selectSearchTerm)
      const searchDate = useSelector(selectedDate)
      const dispatch = useDispatch();
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
            if(!response){
              setLoading(false);
              return toast("Unable to load the appointments",{type:"error"})
            } 
          }
          catch{
            return toast("Unable to load the appointments",{type:"error"})
          }
       }
       useEffect( () => {
         //get the appointment history list data from api for todays date
         getAppointmentHistoryList();
       }, [])
       const sendPrescription = async(e,searchToken) =>{
         e.preventDefault();
         const params={
          searchToken: searchToken,
        }
         try{
          setLoading(true);
          const response = await getAsyncData('/user/sendMessage',params);
          setLoading(false);
          if(response){
            return toast("Sent prescription successfully!!",{type:"success"})
          }
          if(!response){
            return toast("Unable to send the prescription",{type:"error"})
          }
         }
         catch{
          return toast("Unable to send the prescription",{type:"error"})
         }
       }
  return (
    <>
      <ToastContainer position="top-right" />
      <LoadingOverlay active={loading} spinner text="">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg text-blueGray-700">
                Appointments History
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
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Status
                </th>
                <th className="hidden md:block px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Payment Mode
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-56">
            
            {appointmentHistoryList?.filter((val)=>{
              let patientName = val?.customerInfo?.name;
              let phoneNumber = val?.customerInfo?.mobile;
              let dateString = val?.bookingDateTime?.split("T")[0];
              let patientBookingDate = new Date(dateString);
              let filteredDate = new Date(searchDate);
              if(searchText==="" && searchDate===null){
                return val;
              }
              else if(searchText==="" && patientBookingDate-filteredDate===0){
                return val;
              }
             else if((searchText!=="") && 
                (patientName?.toString()?.toLowerCase().includes(searchText?.toLowerCase())||
                phoneNumber?.toString()?.toLowerCase().includes(searchText)||
                (patientBookingDate-filteredDate===0) 
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
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <span className="p-1" style={{'backgroundColor': patient?.status === 2 ? 'green' : patient?.status  === 1 ? 'yellow' : 'red'}}>{patient?.status===3?"Cancelled":patient?.status===2?"Completed":"Ongoing"}</span>
                </td>            
                <td className="hidden md:block border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span>{patient.paymentMode}</span>
                </td>
                {patient?.status === 2 &&
                <td>
                <button className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-2 md:px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" onClick={(e)=>sendPrescription(e,patient?.searchToken)}>Send Prescription</button>
                </td>}
              </tr>
            )))} 
            </tbody>
          </table>
        </div>
      </div>
      </LoadingOverlay>

    </>
  );
}


