import React,{useState,useEffect} from "react";
import {useRouter} from "next/router";
import { updateAppointmentsHistoryList } from '../../slices/appointmentSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import {getAsyncData,getAsyncPostData} from '../../utils/ApiRequests';
export default function CardPatientInfo({searchToken}) {
  const dispatch = useDispatch();
   const router = useRouter();
  const [patientDetails,setPatientDetails] = useState({});
  const getPatientInfo = async() =>{
    const params={
      searchToken: searchToken,
    }
    debugger;
    const response = await getAsyncData('/booking/detail',params);
    console.log(response,"response")
    if(response){
      setPatientDetails(response.data);
    } 
    }
  useEffect( () => {
    getPatientInfo();
  }, [])
  const { register, handleSubmit, formState: { errors } } = useForm(
    // {
    //   defaultValues: {
    //     patientName: patientDetails?.name,
    //   }
    // }
  );
  const handleInput = (e) =>{
    let propName = e.target.name;
    let propValue = e.target.value;
    setPatientDetails({...patientDetails,[propName]:propValue})
  }
  const updatePatientInfoAPI = async(data) =>{
    const response = await getAsyncPostData('/booking/addPrescription',data); 
    if(response){
      dispatch(updateAppointmentsHistoryList(response.data))
      router.push({
          pathname: '/doctor/appointments'
      })
    }
   }
  const updateProfile = (e) =>{
    e.preventDefault();
    handleSubmit(e);
    debugger;
    const data = {
      searchToken:searchToken,
      diagnosis:patientDetails.diagnosis,
      prescription:patientDetails.prescription,
    }
    updatePatientInfoAPI(data);
  }
 console.log(errors,"errors")
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl uppercase font-bold">Patient Consultation</h6> 
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={updateProfile}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Patient Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Patient Name<span className="text-xs text-red-500 px-1">*</span></label>
                  {/* <input {...register('name', { required: true })} type="text" name="patientName" value={patientDetails?.name}  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput} required 
                  /> */}
                  <input  type="text" name="patientName" value={patientDetails?.customer?.name ||''} readOnly className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    // onChange={handleInput} {...register('patientName', { required: true })} readOnly 
                  />
                  {/* {errors?.patientName && <span className="text-xs text-red-500 ">Name is Required!</span>} */}
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
                  <textarea  rows={3} cols={3} {...register('diagnosis', { required: true })}  name="diagnosis" 
                  value={patientDetails?.diagnosis} 
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput} />
                    {errors?.diagnosis && <p className="text-xs text-red-500 px-2">Diagnosis is Required!</p>}
                </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Prescription<span className="text-xs text-red-500 px-1">*</span></label>
                  <textarea  rows={5} cols={5}  name="prescription" {...register('prescription', { required: true })} value={patientDetails?.prescription} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput} />
                    {errors?.prescription && <p className="text-xs text-red-500 px-2">Prescription is Required!</p>}
                </div>
            </div>
              <div className="w-full lg:w-6/12 px-4 mt-3">
                <div className="relative w-full mb-3">
                {/* <Link href={`/doctor/appointments`}> */}
                  <button  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" onClick={updateProfile}>Close Examination</button>
                    {/* </Link> */}
                </div>
              </div>          
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />        
          </form>
        </div>
      </div>
    </>
  );
}
