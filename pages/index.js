import { useEffect,useState } from "react";
import DoctorLogin from "./auth/doctorlogin";
import Appointments from "./doctor/appointments";
import  AppointmentsLayout from "layouts/AppointmentsLayout";
import  LoginLayout from "layouts/LoginLayout";
import {firebaseAuth} from '../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "slices/doctorSlice";
import {doctorLogin} from 'utils/Constants';
import LoadingOverlay from "react-loading-overlay";
export default function Index() {
  const dispatch = useDispatch();
  const userLogin = useSelector(selectUser)
  const [user, setUser] = useState();
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        //user is logged in
        const userInfo = (localStorage.getItem(`${doctorLogin}`));
        setUser(userInfo)
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