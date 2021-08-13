import { useEffect } from "react";
import DoctorLogin from "./auth/doctorlogin";
import Appointments from "./doctor/appointments";
import  AppointmentsLayout from "layouts/AppointmentsLayout";
import  LoginLayout from "layouts/LoginLayout";
import {firebaseAuth} from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "slices/doctorSlice";
import {doctorLogin} from 'utils/Constants'
export default function Index() {
  const dispatch = useDispatch();
  const userLogin = useSelector(selectUser)
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        //user is logged in
        const userInfo = (sessionStorage.getItem(`${doctorLogin}`));
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