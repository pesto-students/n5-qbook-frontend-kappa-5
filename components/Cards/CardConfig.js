import React,{useState,useEffect} from "react";
import Toggle from 'components/Sidebar/Toggle';
import { updateConfig,selectConfigData } from '../../slices/settingsSlice'
import { useDispatch, useSelector } from 'react-redux';
import {getAsyncData,getAsyncPostData} from '../../utils/ApiRequests';
export default function CardConfig() {
const configData = useSelector(selectConfigData)
const dispatch = useDispatch();
const [configInfo,setConfigInfo] = useState({});
const getDashboardInfo = async() =>{
  const response = await getAsyncData('/user/dashboard');
  if(response){
    const userConfig = {
      is_duty: response?.data?.setting?.is_duty===undefined?false:response?.data?.setting?.is_duty,
      is_notification: response?.data?.setting?.is_notification===undefined?false:response?.data?.setting?.is_notification,
    }
    setConfigInfo(userConfig);
    dispatch(updateConfig(userConfig));
  } 
  }
useEffect( () => {
  getDashboardInfo();
}, [])
const updateConfigAPI = async(data) =>{
  const response = await getAsyncPostData('/user/updateConfig',data); 
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
const cancelAppointments =() =>{
  //api call
}
  return (
    <>
      <div className="relative flex flex-col  min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">        
        <div className="flex flex-wrap flex-col  m-20 space-y-2">
          <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">        
          <Toggle value="ON/OFF Duty (Adhoc)"  enabled={configData?.is_duty} 
              setEnabled={setDutyEnabled} name="is_duty"
              />
              </div>
              <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">
               <Toggle value="ON/OFF Notifications" enabled={configData?.is_notification} 
                 setEnabled={setNotificationEnabled} name="is_notification"
               />
              </div>
              <div className="w-full lg:w-12/12 px-4 mt-5 mb-5 ml-5">
                <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button" onClick={cancelAppointments}>Cancel All Appointments</button>
              </div>         
        </div>
      </div>
    </>
  );
}
