import React,{useEffect,useState} from "react";
import DoctorLayout from "layouts/DoctorLayout";
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import {getAsyncData} from '../../utils/ApiRequests';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from "react-loading-overlay";
import { useRouter } from 'next/router'
import {  useDispatch, } from 'react-redux';
import {   logout } from "slices/doctorSlice";
import { firebaseAuth } from "../../firebase";
export default function Reports() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const [response,setResponse] = useState({});
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
  const getChartData=async()=>{
    try{
      setLoading(true);
      const res = await getAsyncData('/user/report');
      setLoading(false);
      setResponse(res);
    }
    catch{
      return toast("Unable to load the report data",{type:"error"})
    }
  }
  useEffect(() => {
    getLoginInfo();
    getChartData();
  }, []);
  if(!userInfo){
    return(
      <>
      <LoadingOverlay active={true} spinner text=""></LoadingOverlay>
      </>
    )
  }
    return (
        <>
        <ToastContainer position="bottom-center" />
        <LoadingOverlay active={loading} spinner text="">
      {Object.keys(response).length>0 &&
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart finance={response.data.finance} financeM={response.data.financeM}/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart appointment={response.data.appointment} appointmentM={response.data.appointmentM}/>
        </div>
      </div>
      }
      </LoadingOverlay>
    </>
      
    )
}

 
Reports.layout = DoctorLayout;