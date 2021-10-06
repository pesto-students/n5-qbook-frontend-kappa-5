import React,{useState,useEffect} from "react";
import {useRouter} from "next/router";
import { updateAppointmentsHistoryList } from '../../slices/appointmentSlice'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import {getAsyncData,getAsyncPostData} from '../../utils/ApiRequests';
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';
export default function CardPatientInfo({searchToken}) {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const [patientDetails,setPatientDetails] = useState({});
  const [isSubmit,setIsSubmit] = useState();
  const [errorMessage,setErrorMessage] = useState(false);
  const [loading,setLoading] = useState(false);
  const getPatientInfo = async() =>{
    if(query.name!==undefined){
    const customerInfo={
      customer:{
      name:query.name,
      mobileNum:query.mobile
      },
      bookingDetail:{
        status:query.status
      },
      diagnosis:'',
      prescription:''
    }
    setPatientDetails(customerInfo)
  }
  if( (query.name===undefined) || (query.status && query.status === '2')){
    const params={
      searchToken: searchToken,
    }
    try{
      setLoading(true);
      const response = await getAsyncData('/booking/detail',params);
      setLoading(false);
      if(response){
        response.data.prescription =response.data.bookingDetail.userComment||'';
        response.data.diagnosis =response.data.bookingDetail.diagnosis||'';
        setPatientDetails(response.data); 
      } 
      if(!response){
        setLoading(false);
        return toast("Unable to get the patient details. Please try again",{type:"error"})
      }
    }
    catch{
      setErrorMessage(true);
      return toast("Unable to get the patient details. Please try again",{type:"error"})
    }
    }
    
    }
  useEffect( () => {
    getPatientInfo();
  }, [])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleInput = (e) =>{
    let propName = e.target.name;
    let propValue = e.target.value;
    setPatientDetails({...patientDetails,[propName]:propValue})
  }
  const updatePatientInfoAPI = async(data) =>{
    setLoading(true);
    try {
      const response = await getAsyncPostData('/booking/addPrescription',data); 
      if(response){
        toast("Prescription submitted for the Appointment",{type:"success"})
        dispatch(updateAppointmentsHistoryList(response.data))
        setLoading(false);
        if(patientDetails?.bookingDetail?.status && patientDetails.bookingDetail.status === 2){
            router.push({
              pathname: '/doctor/history'
          })
        }else{
          router.push({
            pathname: '/doctor/appointments'
          })
        }
      }
      if(!response){
        setLoading(false);
        return toast("Unable to submit the Prescription. Please try again",{type:"error"});
      }
    }
    catch{
      setErrorMessage(false);
      return toast("Unable to submit the Prescription. Please try again",{type:"error"});
    }
   }
  const updateProfile = (data,e) =>{
    if(patientDetails.diagnosis && patientDetails.prescription){
      e.preventDefault();
      setIsSubmit(true);
      const prescriptionData = {
        searchToken:searchToken,
        diagnosis:patientDetails.diagnosis,
        prescription:patientDetails.prescription,
      }
      updatePatientInfoAPI(prescriptionData);
    }
  }
  const cancel = () =>{
    if(patientDetails?.bookingDetail?.status && patientDetails.bookingDetail.status === 2){
      router.push({
        pathname: '/doctor/history'
        })
      } else {
        router.push({
          pathname: '/doctor/appointments'
        })
      }
  }

  return (
    <>
    <ToastContainer position="bottom-right" />
    <LoadingOverlay active={loading} spinner text="">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl uppercase font-bold">Patient Consultation</h6> 
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(updateProfile)}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Patient Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Patient Name<span className="text-xs text-red-500 px-1">*</span></label>
                  <input  type="text" name="patientName" value={patientDetails?.customer?.name ||''} readOnly className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Contact Number<span className="text-xs text-red-500 px-1">*</span></label>
                  <input  type="text" name="phoneNumber" value={patientDetails?.customer?.mobileNum ||''} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                     readOnly
                  />                    
                </div>
              </div>           
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Consultation Information</h6>
            <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Diagnosis<span className="text-xs text-red-500 px-1">*</span></label>
                  <textarea  rows={3} cols={3} name="diagnosis" 
                  value={patientDetails?.diagnosis} 
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput} />
                    {isSubmit && patientDetails && !patientDetails.diagnosis  && <p className="text-xs text-red-500 pt-1 font-semibold">Diagnosis is Required</p>}
                </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Prescription<span className="text-xs text-red-500 px-1">*</span></label>
                  <textarea  rows={5} cols={5}  name="prescription"
                    value={patientDetails?.prescription}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput} />
                    {isSubmit && patientDetails  && !patientDetails.prescription && <p className="text-xs text-red-500 pt-1 font-semibold">Prescription is Required</p>}
                </div>
            </div>
              <div className="w-full lg:w-6/12 px-4 mt-3">
                <div className="relative w-full mb-3">
                  <button  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    onClick={cancel}>Cancel</button>
                    {patientDetails &&  patientDetails.prescription && patientDetails.diagnosis ?
                      <button  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit">{patientDetails?.bookingDetail?.status && patientDetails.bookingDetail.status === 2?'Modify':'Submit'}</button>:
                    <button  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150  opacity-50 cursor-not-allowed"
                    type="submit">{patientDetails?.bookingDetail?.status && patientDetails.bookingDetail.status === 2?'Modify':'Submit'}</button>
                    }
                    
                </div>
              </div>          
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />  
            <div>
           {errorMessage &&
            <p className="block uppercase text-xs font-bold text-red-500 pt-1 font-semibold">Unable to update the prescription details..</p>
           }
           </div>    
          </form>
        </div>
      </div>
   
      </LoadingOverlay>
    </>
  );
}
