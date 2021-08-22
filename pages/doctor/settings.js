import React,{useEffect,useState} from "react";
import CardSettings from "components/Cards/CardSettings.js";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardConfig from "components/Cards/CardConfig";
import { firebaseAuth } from "../../firebase";
import { useRouter } from 'next/router'
import LoadingOverlay from "react-loading-overlay";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
import {getAsyncData} from '../../utils/ApiRequests';
import { ToastContainer, toast } from 'react-toastify';
export default function Settings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [settingData, setSettingData] = useState();
  const [loading,setLoading] = useState(false);
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
        setLoading(true);
        const response = await getAsyncData('/user/dashboard');
        setLoading(false);
        if(response && response?.data?.setting){
          localStorage.setItem('settings',JSON.stringify(response?.data?.setting));
          setSettingData(response?.data?.setting)
        } else{
          router.push('/doctor/settings')
        }
        if(!response){
          return toast("Unable to load the settings",{type:"error"})
        } 
      }
      catch{
        return toast("Unable to load the settings",{type:"error"})
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
     <ToastContainer position="bottom-center" /> 
    <LoadingOverlay active={loading} spinner text="">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig settingData={settingData}/>
        </div>
      </div>
      </LoadingOverlay> 
    </>
  );
}

Settings.layout = DoctorLayout;
