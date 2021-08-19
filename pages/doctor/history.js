import React, { useEffect } from "react";
import AppointmentsLayout from "layouts/AppointmentsLayout";
import CardAppointmentHistoryData from "components/Cards/CardAppointmentHistoryData";
import { firebaseAuth } from "../../firebase";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
import { useRouter } from 'next/router'
export default function History() {
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
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardAppointmentHistoryData/>
        </div>
      </div>
    </>
  );
}

History.layout = AppointmentsLayout;
