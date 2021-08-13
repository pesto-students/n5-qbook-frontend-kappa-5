import React from "react";
import {firebaseAuth,provider} from '../../firebase'
import LoginLayout from "layouts/LoginLayout.js";
import { useDispatch } from 'react-redux'
import { login } from '../../slices/doctorSlice'
import { qBook,signInText,Google,qBookDescription,doctorLogin,loginUrlAPI } from '../../utils/Constants';
import {getAsyncPostData} from '../../utils/ApiRequests';
import { useRouter } from 'next/router'

export default function DoctorLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const addDoctorInfo = async(user) =>{
      const response= await getAsyncPostData(`${loginUrlAPI}`,user);
      if(response){
        sessionStorage.setItem(`${doctorLogin}`,JSON.stringify(response.data));
        dispatch(login(response.data));
        router.push('/doctor/appointments')
      }
       
  }
  const signIn = () =>{
    firebaseAuth.signInWithPopup(provider)
    .then(({user})=>{
        let userInfo = {
          email:user.email,
          googleAuthId: user.uid,
          firstname:user.displayName,
          lastname:user.displayName,
          image:user.photoURL, 
        }
        addDoctorInfo(userInfo);   
    })
    .catch(error=>alert(error.message))
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-600 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
              <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-12/12 px-4">
                <p className="mb-4 text-base leading-relaxed text-white ">
                  <span className="font-bold">{qBook}</span> {qBookDescription}
                </p>
              </div>
            </div>
                <div className="text-center mb-3 mt-2">
                  <h6 className="text-white text-sm font-bold">
                    {signInText}
                  </h6>
                </div>
                <div className="btn-wrapper text-center">                 
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={signIn}
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    {Google}
                  </button>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">           
                </div>
              </div>          
            </div>          
          </div>
        </div>
      </div>
    </>
  );
}
DoctorLogin.layout = LoginLayout;
