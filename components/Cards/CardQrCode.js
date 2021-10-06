import React,{useState,useEffect} from "react";
import QRCode from 'qrcode.react';
import {getAsyncData} from '../../utils/ApiRequests';
import QrCode from "pages/doctor/qrcode";
import LoadingOverlay from "react-loading-overlay";
const MINUTE_MS = 300000;
export default function CardQrCode() {
    const [loading,setLoading] = useState(false);
    const [url,seturl] = useState('');
    const [Index,setIndex] = useState(0);
const getQrCode = async() =>{
    setLoading(true);
    const response = await getAsyncData('/user/generate-code'); 
    seturl(response.data);
    setLoading(false);
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
    <LoadingOverlay active={loading} spinner text="">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Scan for Booking </h6> 
          </div>
        </div>
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center pb-5">
              <div className="relative pb-20">
                {url && url !== "" &&
                <QRCode value={url} includeMargin={true} level="Q" size={150}/>
               }
              </div>
            </div>
          </div>
        </div>
      </div>
      </LoadingOverlay>
    </>
  );
  }
