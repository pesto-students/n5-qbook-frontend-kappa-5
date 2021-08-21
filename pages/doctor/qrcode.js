import React,{useEffect} from "react";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardQrCode from "components/Cards/CardQrCode";
import {getAsyncData} from '../../utils/ApiRequests';
import { useRouter } from 'next/router'
import { firebaseAuth } from "../../firebase";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
import LoadingOverlay from "react-loading-overlay";
export default function QrCode() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(sessionStorage.getItem('doctor_login'));
    const getDashboardInfo = async() =>{ 
        if(!userInfo){
          firebaseAuth.signOut().then(()=>{
            router.push('/')
            dispatch(logout());
            sessionStorage.clear();
        });
        }
        const settingInfo = JSON.parse(sessionStorage.getItem('settings'));
        if(!settingInfo){
            const response = await getAsyncData('/user/dashboard');
            if(response && response?.data?.setting){
              sessionStorage.setItem('settings',JSON.stringify(response?.data?.setting));
            } else{
              router.push('/doctor/settings')
            }
        }
        }
        useEffect(() => {
          getDashboardInfo()
        }, [])
        if(!userInfo){
          return(
            <>
            <LoadingOverlay active={true} spinner text=""></LoadingOverlay>
            </>
          )
        }
  return (
    <>   
      <div className="flex flex-wrap"> 
        <div className="w-full lg:w-4/12 px-4">
          <CardQrCode />
        </div>
      </div>
    </>
  );
}

QrCode.layout = DoctorLayout;
