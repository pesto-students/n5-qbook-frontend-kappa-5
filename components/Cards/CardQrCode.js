import React,{useState,useEffect} from "react";
import Toggle from 'components/Sidebar/Toggle';
import { updateConfig } from '../../slices/settingsSlice'
import { useDispatch } from 'react-redux';
import QRCode from 'qrcode.react';
import {getAsyncPostData,getAsyncData} from '../../utils/ApiRequests';
import QrCode from "pages/doctor/qrcode";
const MINUTE_MS = 300000;
export default function CardQrCode() {

    const [url,seturl] = useState('');
    const [Index,setIndex] = useState(0);
    //const loginInfo = JSON.parse(sessionStorage.getItem("doctor_login"));
const getQrCode = async() =>{
    const response = await getAsyncData('/user/generate-code'); 
    seturl(response.data);
    //console.log(response,"response in QR")
  } 
  
useEffect( () => {
  if(Index == 0){
    getQrCode();
  }
  const interval = setInterval(() => {
    getQrCode();
    let i = Index;
    setIndex(i++);
  }, MINUTE_MS);

  return () => clearInterval(interval); 
}, [])

 

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Scan for Booking </h6> 
          </div>
        </div>
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                {url && url !== "" &&
                <QRCode value={url} includeMargin={true} level="Q" size="150"/>
               }
              </div>
            </div>
          </div>
        
          
        </div>
      </div>
    </>
  );
  }
