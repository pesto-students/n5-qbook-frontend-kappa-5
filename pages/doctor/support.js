import React,{useEffect,useState} from "react";
import CardSupport from "components/Cards/CardSupport";
import { firebaseAuth } from "../../firebase";
import DoctorLayout from "layouts/DoctorLayout";
import { useRouter } from 'next/router'
import LoadingOverlay from "react-loading-overlay";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
export default function Support() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  
  const getLoginInfo = async() =>{
    const userInfo = JSON.parse(localStorage.getItem('doctor_login'));
    setUser(userInfo);
    if(!userInfo){
      firebaseAuth.signOut().then(()=>{
        router.push('/')
        dispatch(logout());
        localStorage.clear();
    });
    }
    }
    useEffect(() => {
      getLoginInfo()
    }, [])
    if(!user){
      return(
        <>
        <LoadingOverlay active={true} spinner text=""></LoadingOverlay>
        </>
      )
    }
    return (
        <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSupport />
        </div>
        
      </div>
    )
}

 
Support.layout = DoctorLayout;