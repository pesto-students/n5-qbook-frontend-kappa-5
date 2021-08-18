import React,{useState,useEffect} from "react";
import Toggle from 'components/Sidebar/Toggle';
import { updateConfig } from '../../slices/settingsSlice'
import { selectAppointmentList } from '../../slices/appointmentSlice'
import { useSelector,useDispatch } from 'react-redux';
import {getAsyncPostData,getAsyncData} from '../../utils/ApiRequests';
import CardLoader from "./CardLoader";
import { ToastContainer, toast } from 'react-toastify';

export default function CardConfig() {
const [loading,setLoading] = useState(false);
const dispatch = useDispatch();
const [configInfo,setConfigInfo] = useState({is_duty:false,is_notification:false});
const patientList = useSelector(selectAppointmentList);

const getDashboardInfo = async() =>{
  const settingInfo = JSON.parse(sessionStorage.getItem('settings'));
  if(settingInfo){
    const userConfig = {
      is_duty: settingInfo?.is_duty===undefined?false:settingInfo?.is_duty,
      is_notification: settingInfo?.is_notification===undefined?false:settingInfo?.is_notification,
    }
    setConfigInfo(userConfig);
    dispatch(updateConfig(userConfig));
  } 
  }
useEffect( () => {
  getDashboardInfo();
}, [])
const updateConfigAPI = async(data) =>{
  setLoading(true);
  try{
    const response = await getAsyncPostData('/user/updateConfig',data); 
    if(response){
      sessionStorage.setItem('settings',JSON.stringify(response.data));
      setLoading(false);
    }
    if(!response){
      return toast("Unable to update the settings",{type:"error"})
    }
  }
  catch{
    return toast("Unable to update the settings",{type:"error"})
  }
 }
 const cancelAppointments = async() =>{
   if(patientList?.length===0) return
  setLoading(true);
  try{
    const response = await getAsyncData('/booking/cancelAllBooking'); 
    if(response){
      setLoading(false);
      return toast("Bookings cancelled successfully!!",{type:"success"})
    }
    if(!response){
      return toast("Unable to cancel the appointments",{type:"error"})
    }
  }
  catch{
    return toast("Unable to cancel the appointments",{type:"error"})
  }
  
 }
const setDutyEnabled =(e) =>{
  setConfigInfo(values=>({
    ...values,
        is_duty:e
  }))
  dispatch(updateConfig(configInfo));
  updateConfigAPI({is_duty:e});
}
const setNotificationEnabled =(e) =>{
  setConfigInfo(values=>({
    ...values,
        is_notification:e
  }))
  dispatch(updateConfig(configInfo));
  updateConfigAPI({is_notification:e});
}

  return (
    <>
    {loading?(
      <CardLoader/>
    ):(
      <>
      <ToastContainer position="bottom-center" />
      <div className="relative flex flex-col  min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">        
        <div className="flex flex-wrap flex-col  m-20 space-y-2">
          <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">        
          <Toggle value="ON/OFF Duty (Adhoc)"  enabled={configInfo?.is_duty} 
              setEnabled={setDutyEnabled} name="is_duty"
              />
              </div>
              <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">
               <Toggle value="ON/OFF Notifications" enabled={configInfo?.is_notification} 
                 setEnabled={setNotificationEnabled} name="is_notification"
               />
              </div>
              <div className="w-full lg:w-12/12 px-4 mt-5 mb-5 ml-5">
                <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button" onClick={cancelAppointments}
              disabled={patientList?.length===0}
              >Cancel All Appointments</button>
              </div>    
        </div>
      </div>
      </>
    )}
      
    </>
  );
}
