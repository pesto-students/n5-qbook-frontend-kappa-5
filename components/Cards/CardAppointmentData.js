import React,{useEffect,useState} from "react";
import Link from "next/link";
import { selectSearchTerm,updateAppointmentsList } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import {getAsyncData} from '../../utils/ApiRequests';
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';
export default function CardAppointmentData() {
        const searchText = useSelector(selectSearchTerm)
        const dispatch = useDispatch();
        const [appointmentList,setAppointmentList] = useState();
        const [loading,setLoading] = useState(false);
      const getAppointmentList = async() =>{
        const params={
          status: '1',
        }
        try{
          setLoading(true);
          const response = await getAsyncData('/booking/list',params);
          if(response){
            setAppointmentList(response.data);
            dispatch(updateAppointmentsList(response.data)); 
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
        //get the dashboard data from api
        getAppointmentList();
      }, [])
  return (
    <>
    <ToastContainer position="top-right" />
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
                <th className="hidden md:block lg:table-cell px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Payment Mode
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-56">
            {appointmentList?.filter((val)=>{
              let patientName = val?.customerInfo?.name;
              let phoneNumber = val?.customerInfo?.mobile
              if(searchText===""){
                return val;
              }
              else if((searchText!=="") && 
                (patientName?.toString()?.toLowerCase().includes(searchText?.toLowerCase())||
                phoneNumber?.toString()?.includes(searchText?.toLowerCase())
                )){                    
                    return val;                           
                }
            })
            .map((patient=>(
              <tr key={patient?.id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">                 
                  <span className="ml-3 font-bold text-blueGray-600">{patient?.customerInfo?.name}</span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {patient?.customerInfo?.mobile}
                </td>           
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <span>{patient?.paymentMode}</span>
                </td>
				        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <Link 
                href={{
                  pathname:`/doctor/consultation/${patient?.searchToken}`,
                  query:{searchToken:`${patient.searchToken}`}
                  }}
                  as={`/doctor/consultation/${patient?.searchToken}`} >
                <button className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-2 md:px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button">Start</button></Link>
                </td>
              </tr>
            )))} 
            </tbody>
          </table>
        </div>
        {appointmentList?.length===0 &&
          <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <p className="block uppercase text-xs font-bold text-red-500 px-5 py-5 justify-center ml-7 items-center">{"   "}No active appointments.</p>
            </div>
          </div>
        </div> 
           }
      </div>
      </LoadingOverlay>
    </>
  );
}


