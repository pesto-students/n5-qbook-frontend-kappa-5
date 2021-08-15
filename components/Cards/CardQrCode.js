import React,{useState,useEffect} from "react";
import Toggle from 'components/Sidebar/Toggle';
import { updateConfig } from '../../slices/settingsSlice'
import { useDispatch } from 'react-redux';
import {getAsyncPostData,getAsyncData} from '../../utils/ApiRequests';

export default function CardQrCode() {
    const loginInfo = JSON.parse(sessionStorage.getItem("doctor_login"));
const getQrCode = async() =>{
    const response = await getAsyncData('/user/generate-code'); 
    debugger;
    console.log(response,"response in QR")
  } 
  
useEffect( () => {
    getQrCode();
}, [])

 

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={loginInfo?.result?.image}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
          </div>
        
          
        </div>
      </div>
    </>
  );
  }
