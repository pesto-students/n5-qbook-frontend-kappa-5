import React,{useEffect,useState} from "react";
import DoctorNavbar from "components/Navbars/DoctorNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterDoctor from "components/Footers/FooterDoctor.js";
import HeaderAppointments from "components/Headers/HeaderAppointments";
import { firebaseAuth } from "../firebase";
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
import LoadingOverlay from "react-loading-overlay";
import { useRouter } from 'next/router'
export default function AppointmentsLayout({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const router = useRouter();
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
    <>
      <Sidebar />
      <div className="relative h-screen md:ml-64 bg-blueGray-100">
        <DoctorNavbar />
        <HeaderAppointments/>       
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          {/* <FooterDoctor /> */}
        </div>
        <FooterDoctor />
      </div>
      
    </>
  );
}
