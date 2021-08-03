import React,{useState,useContext,useEffect} from "react";
import {useForm} from "react-hook-form"
import axios from "axios";
import TimePicker from "components/Sidebar/TimePicker";
import {ProfileContext} from '../../Context/ProfileContext';
import validation from "layouts/utils/validation";

export default function CardSettings() {

  const {profileInfo,handleInput,handleStartTime,handleEndTime} = useContext(ProfileContext)
useEffect(() => {
  const getUserInfo = async() =>{
    const apiUrl = 'http://ec2-13-126-203-170.ap-south-1.compute.amazonaws.com:1337/api/v1/user/dashboard';
      const response= await axios.get(apiUrl);
      console.log(response,"response")
  }
  getUserInfo();
}, [])

 // const { register, handleSubmit, formState: { errors } } = useForm();
  const [errors,setErrors] = useState({});
  console.log(profileInfo,"profileInfo")
  const updateProfile = (e) =>{
    console.log("inside update ")
    e.preventDefault();
      setErrors(validation(profileInfo))
    
    //console.log("profile",profileInfo);
      // const apiUrl = 'http://ec2-13-126-203-170.ap-south-1.compute.amazonaws.com:1337/api/v1/user/login';
      // const response= await axios.post(apiUrl,profile);
      // console.log(response,"response")
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Profile Settings</h6> 
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={updateProfile}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Doctor Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Preferred Name</label>
                  <input  type="text" name="name" value={profileInfo.name}  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                     onChange={handleInput}
                    // {...register("name", {required: true})}
                     />
                     {errors.name && <p className="text-xs text-red-600 px-2">{errors.name}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Specialization</label>
                  <input  type="text" name="specialization" value={profileInfo.specialization} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors.specialization && <p className="text-xs text-red-600 px-2">{errors.specialization}</p>}
                </div>
              </div>           
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Consultation Information</h6>
            <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Maximum Appointments</label>
                  <input  type="number" name="maxAppointments" value={profileInfo.maxAppointments} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors.maxAppointments && <p className="text-xs text-red-600 px-2">{errors.maxAppointments}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Consultation Fees</label>
                  <input  type="number" name="fees" value={profileInfo.fees} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors.fees && <p className="text-xs text-red-600 px-2">{errors.fees}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Start Time</label>
                  <TimePicker setTime={handleStartTime}/>
                  {errors.startTime && <h6 className="text-xs text-red-600 px-2">{errors.startTime}</h6>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">End Time</label>
                  <TimePicker setTime={handleEndTime}/>
                </div>
              </div>
               
              
              <div className="w-full lg:w-6/12 px-4 mt-3">
                <div className="relative w-full mb-3">
                  <button  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit" onClick={updateProfile}>Update</button>
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