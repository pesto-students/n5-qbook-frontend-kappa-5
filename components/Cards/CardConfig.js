import React,{useState} from "react";
import Toggle from 'components/Sidebar/Toggle';
import { updateConfig,selectConfigData } from '../../slices/settingsSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function CardConfig() {
const configData = useSelector(selectConfigData)
const dispatch = useDispatch();
const [configInfo,setConfigInfo] = useState(configData);
const setDutyEnabled =(e) =>{
  setConfigInfo(values=>({
    ...values,
      setting:{
        ...values.setting,
        is_duty:e
  }
  }))
  dispatch(updateConfig(configInfo));
}
const setNotificationEnabled =(e) =>{
  setConfigInfo(values=>({
    ...values,
      setting:{
        ...values.setting,
        is_notification:e
  }
  }))
  dispatch(updateConfig(configInfo));
}
const cancelAppointments =() =>{
  //api call
}
  return (
    <>
      <div className="relative flex flex-col  min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">        
        <div className="flex flex-wrap flex-col  m-20 space-y-2">
          <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">        
          <Toggle value="ON/OFF Duty (Adhoc)"  enabled={configData?.setting?.is_duty} 
              setEnabled={setDutyEnabled} name="is_duty"
              />
              </div>
              <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">
               <Toggle value="ON/OFF Notifications" enabled={configData?.setting?.is_notification} 
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
