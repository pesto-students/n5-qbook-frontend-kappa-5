import React,{useEffect} from "react";
import CardSettings from "components/Cards/CardSettings.js";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardConfig from "components/Cards/CardConfig";
import { firebaseAuth } from "../../firebase";
import { useRouter } from 'next/router'
import LoadingOverlay from "react-loading-overlay";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
export default function Settings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(sessionStorage.getItem('doctor_login'));
  const getLoginInfo = async() =>{
    
    if(!userInfo){
      firebaseAuth.signOut().then(()=>{
        router.push('/')
        dispatch(logout());
        sessionStorage.clear();
    });
    }
    }
    useEffect(() => {
      getLoginInfo()
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
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig />
        </div>
      </div>
    </>
  );
}

Settings.layout = DoctorLayout;
