import React,{useState,useEffect} from "react";
import axios from "axios";
import validation from "../../utils/Validation";
import { updateConfig,selectConfigData } from '../../slices/settingsSlice'
import { useDispatch, useSelector } from 'react-redux';
import CardSettingsForm from "./CardSettingsForm";
import {getAsyncData} from '../../utils/ApiRequests';
export default function CardSettings() {
  const configData = useSelector(selectConfigData)
  const dispatch = useDispatch();
  const [profileInfo,setProfileInfo] = useState();
  const [successMessage,setSuccessMessage] = useState(false);
  useEffect(async () => {
    //get the dashboard data from api
    
    const loginInfo = JSON.parse(sessionStorage.getItem("doctor_login"));
    const params ={headers:{
      Authorization:'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjEwNGUxNDM5ZTc5ZTQwNjFjNmMyZTg2IiwiaWF0IjoxNjI4NDg2MTg2LCJleHAiOjE2MjkwOTA5ODZ9.5QLZlqSoUPuCEnCp86JEa0hecHJhYAZJ2Htte4_eAn0' 
    }};
    const appointmentsData = await getAsyncData('/user/dashboard',params);
    console.log(appointmentsData);
    const response = {
      "record": {
          "createdAt": 1627318466653,
          "updatedAt": 1628240250763,
          "id": "60fee8c26343f4eba4aaa963",
          "firstname": "Gaurav",
          "lastname": "Tayal",
          "email": "abc@gmail.com",
          "googleAuthId": "dsdsd24234sadasdasdsd",
          "image": "http://google.com/abc.jpeg",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjBmZWU4YzI2MzQzZjRlYmE0YWFhOTYzIiwiaWF0IjoxNjI4MjQwMjUwLCJleHAiOjE2Mjg4NDUwNTB9.19ML11B6bMIH64KCOvb4p3AenMAQmTC4Q-Qxc-TK3MY"
      },
      "setting": {
          "createdAt": 1627700780186,
          "updatedAt": 1627700780186,
          "id": "6104be2c71fb14712b4d88c1",
          "title": "MBBS MS",
          "brief": "Got Gold Medal in throat infection",
          "fees": 500,
          "userId": "60fee8c26343f4eba4aaa963",         
          "startTime":{hours:"00",minutes:"00",period:"AM"},
          "endTime":{hours:"00",minutes:"00",period:"AM"},
          "is_duty": false,
          "is_notification": false
      }
  };
  dispatch(updateConfig(response));
  setProfileInfo(response);
  }, [])
  const [errors,setErrors] = useState({});
  const updateProfile = (e) =>{
    e.preventDefault();
    setErrors(validation(profileInfo));
    dispatch(updateConfig(profileInfo)) 
    setSuccessMessage(true); 
  }
const handleInput = (e) =>{
    const { dataset, name, value } = e.target;
    setProfileInfo(values=>({
        ...(dataset.nested)?{
          ...values,
          setting:{
            ...values.setting,
            [dataset.id]: {
              ...values.setting[dataset.id], 
            [name]: e.target.value
        }
          }
        }:{
          ...values,
          [dataset.id]:{
            ...values[dataset.id],
          [name]:value
        }
      }
    }))
}
  return (
    <>
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
          />
           {successMessage &&
            <p className="block uppercase text-xs font-bold py-2 text-green-400 ">Settings updated Successfully!</p>
           }
        </div>
      </div>
    </>
  );
}