import React,{useEffect,useState} from "react";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardQrCode from "components/Cards/CardQrCode";
import {getAsyncData} from '../../utils/ApiRequests';
import { useRouter } from 'next/router'
import { firebaseAuth } from "../../firebase";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';
export default function QrCode() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [user, setUser] = useState();
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
    <LoadingOverlay active={loading} spinner text="">
      <div className="flex flex-wrap"> 
        <div className="w-full lg:w-4/12 px-4">
          <CardQrCode />
        </div>
      </div>
      </LoadingOverlay>
    </>
  );
}

QrCode.layout = DoctorLayout;
