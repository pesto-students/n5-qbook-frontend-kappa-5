import React,{useEffect} from "react";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardQrCode from "components/Cards/CardQrCode";
import {getAsyncData} from '../../utils/ApiRequests';
import { useRouter } from 'next/router'
export default function QrCode() {
    const router = useRouter();
    const getDashboardInfo = async() =>{
        const response = await getAsyncData('/user/dashboard');
        if(response && response?.data?.setting){
          sessionStorage.setItem('settings',JSON.stringify(response?.data?.setting));
        } else{
          router.push('/doctor/settings')
        }
        }
        useEffect(() => {
          getDashboardInfo()
        }, [])
    
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
