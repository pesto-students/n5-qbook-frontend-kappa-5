import { useEffect } from "react";
import DoctorLogin from "./doctorlogin";
import Appointments from "./doctor/appointments";
import  AppointmentsLayout from "layouts/AppointmentsLayout";
import  LoginLayout from "layouts/LoginLayout";
import {firebaseAuth} from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "slices/doctorSlice";

export default function Index() {
  const dispatch = useDispatch();
  const userLogin = useSelector(selectUser)
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((user)=>{
      debugger;
      if(user){
        //user is logged in
        const userInfo = JSON.parse(sessionStorage.getItem("doctor_login"));
        dispatch(login(userInfo))
      }
      else{
        //user is logged out
        dispatch(logout())
      }
    })
},[])
  return (
    <>
    {!userLogin?(
      <LoginLayout>
        <DoctorLogin/>
      </LoginLayout>
    ):(    
      <AppointmentsLayout>
        <Appointments/>
      </AppointmentsLayout>
    )}     
    </>
  );
}
