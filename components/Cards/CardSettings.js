import React,{useState,useEffect} from "react";
import Validation from "../../utils/Validation";
import { updateConfig } from '../../slices/settingsSlice'
import { useDispatch } from 'react-redux';
import CardSettingsForm from "./CardSettingsForm";
import {getAsyncPostData,getAsyncData} from '../../utils/ApiRequests';
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';

export default function CardSettings() {
  const dispatch = useDispatch();
  const [profileInfo,setProfileInfo] = useState({firstname:"",title: "",brief: "",fees: 0,startTime:{hours:'08',minutes:30},
  endTime:{hours:17,minutes:30}});
  const [errors,setErrors] = useState();
  const [loading,setLoading] = useState(false);
  const getDashboardInfo = async() =>{
    const settingInfo = JSON.parse(localStorage.getItem('settings'));
    if(!settingInfo){
      setLoading(true);
      const response = await getAsyncData('/user/dashboard');
      setLoading(false);
      if(response && response?.data?.setting){
        localStorage.setItem('settings',JSON.stringify(response?.data?.setting));
      } 
  }
  setInfo(settingInfo);
    }
  useEffect( () => {
    getDashboardInfo();
  }, [])
  const setInfo = (settingInfo) =>{
    if(settingInfo){
      let array=[];
      array.push(settingInfo?.slots[0]);
      if(array.length===0)
      return;
      const {end,start} = array[0];
      let endTimeValues= end?.split(':');
      let startTimeValues= start?.split(':');
      const userConfig = {
        firstname:settingInfo?.firstname + " " +settingInfo?.lastname,
        title:settingInfo?.title,
        brief:settingInfo?.brief,
        fees:settingInfo?.fees,
        startTime:{hours:startTimeValues[0],minutes:startTimeValues[1]},
        endTime:{hours:endTimeValues[0],minutes:endTimeValues[1]},
      }
      setProfileInfo(userConfig);
      dispatch(updateConfig(userConfig));
  }
}
  const updateConfigAPI = async(data) =>{
    try{
      setLoading(true);
      const response = await getAsyncPostData('/user/updateConfig',data); 
      if(response){
        localStorage.setItem('settings',JSON.stringify(response.data));
       setLoading(false);
       return toast("Settings updated successfully!!",{type:"success"})
      }
      if(!response){
        setLoading(false);
        return toast("Unable to update the settings",{type:"error"})
      }
    }
    catch{
      return toast("Unable to update the settings",{type:"error"})
    }
  }
  useEffect(() => {
   if(!errors) return;
 if(Object.keys(errors).length===0){
      dispatch(updateConfig(profileInfo));
      formatInput();
     }
  }, [errors])
  const updateProfile = (e) =>{
    e.preventDefault();
    setErrors(Validation(profileInfo));
  }
  const handleStartTime = (e) =>{
    let valueProp = e.target.name
    setProfileInfo({ 
        ...profileInfo,
        startTime: {
            ...profileInfo.startTime, 
            [valueProp]: e.target.value
        }
    });  
}
const handleEndTime = (e) =>{
    let valueProp = e.target.name
    setProfileInfo({ 
        ...profileInfo,
        endTime: {
            ...profileInfo.endTime, 
            [valueProp]: e.target.value
        }
    });   
}
const formatInput = () =>{
  let array = [];
  let start = profileInfo?.startTime?.hours +":" +profileInfo?.startTime?.minutes;
  let end = profileInfo?.endTime?.hours +":" +profileInfo?.endTime?.minutes;
  array.push({start,end});
  let options={
    slots:array
  }
  setProfileInfo({...profileInfo, ...options})
  const updatedConfigData = {
    title: profileInfo.title,
    firstname:profileInfo.firstname?.split(' ')[0],
    lastname:profileInfo.firstname?.split(' ')[1],
    brief: profileInfo.brief,
    fees: profileInfo.fees,
    slots: array,
  };
  updateConfigAPI(updatedConfigData)
}
const handleInput = (e) =>{
    let propName = e.target.name;
    let propValue = e.target.value;
    setProfileInfo({...profileInfo,[propName]:propValue})
}

  return (
    <>
      <ToastContainer position="bottom-center" />
      <LoadingOverlay active={loading} spinner text="">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Profile Settings</h6> 
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <CardSettingsForm
            updateProfile={updateProfile}
            profileInfo={profileInfo}
            handleInput={handleInput}
            errors={errors}
            handleStartTime={handleStartTime}
            handleEndTime={handleEndTime}
          />
          <div>
           </div>
        </div>
      </div>
      </LoadingOverlay>
      </> 
    )
}