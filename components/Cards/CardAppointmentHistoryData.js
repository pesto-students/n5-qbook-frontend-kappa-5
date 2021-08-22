import React,{useEffect,useState} from "react";
import { selectSearchTerm, updateAppointmentsHistoryList,selectedDate } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import {getAsyncData} from '../../utils/ApiRequests';
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";

export default function CardAppointmentHistoryData() {
  const [loading,setLoading] = useState(false);
  const [filtered,setFiltered] = useState(false);
      const searchText = useSelector(selectSearchTerm)
      const searchDate = useSelector(selectedDate)
      const dispatch = useDispatch();
      const [appointmentHistoryList,setAppointmentHistoryList] = useState();
      const [filteredList,setFilteredList] = useState();
      useEffect(() => {
        const filteredArray =appointmentHistoryList?.filter((val)=>{
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
        if(filteredArray?.length===0){
          setFiltered(true);
        }
        else{
          setFiltered(false);
        }
        setFilteredList(filteredArray)
        console.log(filtered,"filteredOptions")
      }, [searchText,searchDate])
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
              setFilteredList(response?.data);
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
            return toast("Prescription sent successfully!!",{type:"success"})
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
      <ToastContainer position="bottom-right" />
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
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Actions
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-56">
            
            {filteredList!==undefined &&
              filteredList.map((patient=>( 
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
                  <span className="p-2" style={{'color': 'white','backgroundColor': patient?.status === 2 ? 'green' : patient?.status  === 1 ? 'lightblue' : 'maroon'}}>{patient?.status===3?"Cancelled":patient?.status===2?"Completed":"Ongoing"}</span>
                </td>            
                <td className="hidden md:block border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span>{patient.paymentMode}</span>
                </td>
                {patient?.status === 2 &&
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="far fa-paper-plane px-2 cursor-pointer" title="Send Prescription " onClick={(e)=>sendPrescription(e,patient?.searchToken)}></i>
                <Link 
                  href={{
                    pathname:`/doctor/consultation/${patient?.searchToken}`,
                    query:{searchToken:`${patient.searchToken}`,name:`${patient?.customerInfo?.name}`,mobile:`${patient?.customerInfo?.mobile}`, status:2}
                    }}
                    as={`/doctor/consultation/${patient?.searchToken}`} >
                    <i className="fas fa-eye px-2 cursor-pointer" title="View Prescription"></i>
                    </Link>
                </td>}
              </tr>
            )))} 
            {filtered &&
          <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <p className="block  text-xs font-bold text-red-500 px-5 py-5 justify-center ml-7 items-center">{"   "}No data available for this filter. Please search again.</p>
            </div>
          </div>
        </div> 
           }
            </tbody>
          </table>
        </div>
        
      </div>
      </LoadingOverlay>

    </>
  );
}


