import React,{useEffect,useState} from "react";
import CardConfig from "components/Cards/CardConfig";
import AppointmentsLayout from "layouts/AppointmentsLayout";
import CardAppointmentData from "components/Cards/CardAppointmentData";
import {getAsyncData} from '../../utils/ApiRequests';
import { useRouter } from 'next/router'
import { firebaseAuth } from "../../firebase";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';
export default function Appointments() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [settingData, setSettingData] = useState();
  const getDashboardInfo = async() =>{
    const userInfo = JSON.parse(localStorage.getItem('doctor_login')); 
    setUser(userInfo)
    if(!userInfo){
      firebaseAuth.signOut().then(()=>{
        router.push('/')
        dispatch(logout());
        localStorage.clear();
    });
    }
    const settingInfo = JSON.parse(localStorage.getItem('settings'));
    if(!settingInfo){
      try{
        const response = await getAsyncData('/user/dashboard');
        if(response && response?.data?.setting){
          localStorage.setItem('settings',JSON.stringify(response?.data?.setting));
          setSettingData(response?.data?.setting)
        } else{
          router.push('/doctor/settings')
        }
        if(!response){
          return toast("Unable to load the appointments",{type:"error"})
        } 
      }
      catch{
        return toast("Unable to load the appointments",{type:"error"})
      }
    }
    else{
      setSettingData(settingInfo)
    }
    }
    useEffect(() => {
      getDashboardInfo()
    }, [])
    if(!user){
      return(
        <>
        <LoadingOverlay active={true} spinner text=""></LoadingOverlay>
        </>
      )
    }
  return (
    <>  
      <ToastContainer position="bottom-right" /> 
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 lg:w-8/12">
          <CardAppointmentData/>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig settingData={settingData}/>
        </div>
      </div>
    </>
  );
}

Appointments.layout = AppointmentsLayout;
