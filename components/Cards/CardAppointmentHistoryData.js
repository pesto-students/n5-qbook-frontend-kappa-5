import React,{useEffect,useState} from "react";
import { selectSearchTerm,selectedDate,selectAppointmentHistoryList } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import { updateAppointmentsHistoryList } from '../../slices/appointmentSlice';
export default function CardAppointmentHistoryData() {
      const appointmentHistoryList = useSelector(selectAppointmentHistoryList)
      const searchText = useSelector(selectSearchTerm)
      const searchDate = useSelector(selectedDate)
      const dispatch = useDispatch();
      //const[appointmentHistoryList,setAppointmentHistoryListData] = useState();
      // useEffect(() => {
      //   //get the appointment data from api
      //   const response = [{uuid:"1",name:"Anna",phoneNumber:"12345678",date:"08/08/2021",paymentMode:"online"},
      //   {uuid:"2",name:"helen",phoneNumber:"12225678",date:"08/07/2021",paymentMode:"online"},
      //   {uuid:"3",name:"tom",phoneNumber:"34345656",date:"03/09/2021",paymentMode:"online"},
      //   {uuid:"4",name:"Anna",phoneNumber:"67676756",date:"03/09/2021",paymentMode:"online"}
      //   ];
      // dispatch(updateAppointmentsHistoryList(response));
      // setAppointmentHistoryListData(response);
      // }, [])
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
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
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
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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


