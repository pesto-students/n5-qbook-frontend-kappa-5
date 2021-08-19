import React,{useEffect} from "react";
import CardSupport from "components/Cards/CardSupport";
import { firebaseAuth } from "../../firebase";
import DoctorLayout from "layouts/DoctorLayout";
import { useRouter } from 'next/router'

import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
export default function Support() {
  const router = useRouter();
  const dispatch = useDispatch();
  const getLoginInfo = async() =>{
    const userInfo = JSON.parse(sessionStorage.getItem('doctor_login'));
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
    return (
        <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSupport />
        </div>
        
      </div>
    )
}

 
Support.layout = DoctorLayout;