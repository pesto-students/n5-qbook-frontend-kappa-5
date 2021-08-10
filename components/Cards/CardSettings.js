import React,{useState,useEffect} from "react";
import validation from "../../utils/Validation";
import { updateConfig } from '../../slices/settingsSlice'
import { useDispatch } from 'react-redux';
import CardSettingsForm from "./CardSettingsForm";
import {getAsyncData,getAsyncPostData} from '../../utils/ApiRequests';
export default function CardSettings() {
  const dispatch = useDispatch();
  const [profileInfo,setProfileInfo] = useState({firstname:"",title: "",brief: "",fees: 0,});
  const [successMessage,setSuccessMessage] = useState(false);
  const [errors,setErrors] = useState();
  console.log(errors,"errors in page")
  const getDashboardInfo = async() =>{
    const res = await getAsyncData('/user/dashboard');
      let {end,start} = res.data.setting.slots[0];
      let endTimeValues= end.split(':');
      let startTimeValues= start.split(':');
      const userConfig = {
        firstname:res?.data?.record?.firstname,
        title:res?.data?.setting?.title,
        brief:res?.data?.setting?.brief,
        fees:res?.data?.setting?.fees,
        startTime:{hours:startTimeValues[0],minutes:startTimeValues[1]},
        endTime:{hours:endTimeValues[0],minutes:endTimeValues[1]},
      }
      setProfileInfo(userConfig);
      dispatch(updateConfig(userConfig));
    }
  useEffect( () => {
    getDashboardInfo();
  }, [])
  const updateConfigAPI = async(data) =>{
   const response = await getAsyncPostData('/user/updateConfig',data); 
   if(response){
    setSuccessMessage(true);
    setErrors();
   }
  }
  useEffect(() => {
   
     if(errors!==undefined && Object.keys(errors).length>0){
      setSuccessMessage(false);
      return;
     } 
     else{
      dispatch(updateConfig(profileInfo));
      formatInput();
      setSuccessMessage(true);
     }
  }, [errors])
  const updateProfile = (e) =>{
    e.preventDefault();
    setErrors(validation(profileInfo));
  }
  const handleStartTime = (e) =>{
    let valueProp = e.target.name
    setProfileInfo({ 
        ...profileInfo,
        startTime: {
            ...profileInfo.startTime, // Spread the startTime object to preserve all values
            [valueProp]: e.target.value
        }
    });  
}
const handleEndTime = (e) =>{
    let valueProp = e.target.name
    setProfileInfo({ 
        ...profileInfo,
        endTime: {
            ...profileInfo.endTime, // Spread the endTime object to preserve all values
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
    firstname:profileInfo.firstname,
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
           {successMessage &&
            <p className="block uppercase text-xs font-bold py-2 text-green-400 ">Settings updated Successfully!</p>
           }
        </div>
      </div>
  );
}