import React,{useEffect} from "react";
import CardConfig from "components/Cards/CardConfig";
import AppointmentsLayout from "layouts/AppointmentsLayout";
import CardAppointmentData from "components/Cards/CardAppointmentData";
import {getAsyncData,getAsyncPostData} from '../../utils/ApiRequests';
import { useRouter } from 'next/router'
import { firebaseAuth } from "../../firebase";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
export default function Appointments() {
  const router = useRouter();
  const dispatch = useDispatch();
  const getDashboardInfo = async() =>{
    const userInfo = JSON.parse(sessionStorage.getItem('doctor_login'));
    if(!userInfo){
      firebaseAuth.signOut().then(()=>{
        router.push('/')
        dispatch(logout());
        sessionStorage.clear();
    });
    }
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
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 lg:w-8/12">
          <CardAppointmentData/>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig />
        </div>
      </div>
    </>
  );
}

Appointments.layout = AppointmentsLayout;
