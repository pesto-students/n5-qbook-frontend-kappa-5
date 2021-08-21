import React, { useState, useEffect} from "react";
import {firebaseAuth,provider} from '../../firebase'
import LoginLayout from "layouts/LoginLayout.js";
import { useDispatch } from 'react-redux'
import { login } from '../../slices/doctorSlice'
import { fcmToken, qBook, signInText, Google, qBookDescription, doctorLogin, loginUrlAPI } from '../../utils/Constants';
import {getAsyncPostData} from '../../utils/ApiRequests';
import { useRouter } from 'next/router'
import CardLoader from '../../components/Cards/CardLoader'
export default function DoctorLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tokenFCM,setTokenFCM] = useState('');
  const [loading,setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState(false);
  const addDoctorInfo = async(user) =>{
    try{
      const response= await getAsyncPostData(`${loginUrlAPI}`,user);
      if(response){
        localStorage.setItem(`${doctorLogin}`,JSON.stringify(response.data));
        dispatch(login(response.data));
        router.push('/doctor/appointments')
      }
    }
    catch{
      setErrorMessage(true);
    }  
  }
  useEffect(() => {
    setTokenFCM(localStorage.getItem(`${fcmToken}`))
  },[]);

  const signIn = () =>{
    firebaseAuth.signInWithPopup(provider)
    .then(({user})=>{
        let userInfo = {
          email:user.email,
          googleAuthId: user.uid,
          firstname:user.displayName,
          lastname:user.displayName,
          image:user.photoURL,
          token:localStorage.getItem(`${fcmToken}`)||''
        }
        addDoctorInfo(userInfo);   
    })
    .catch(error=>alert(error.message))
  }
  return (
    <>
    {loading?(
      <CardLoader/>
    ):(
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-600 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
             
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
                <div className="mt-5 pt-5 pb-2 border-t border-blueGray-200 text-center">           
                </div>
                <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-12/12 px-4">
                <p className="mb-4 text-base leading-relaxed text-white ">
                  <span className="font-bold">{qBook}</span> {qBookDescription}
                </p>
              </div>
              {errorMessage &&
            <p className="block uppercase text-xs font-bold text-red-500 px-2">Unable to Login..!!</p>
             }  
            </div>
              </div>          
            </div>          
          </div>
        </div>
      </div>
    )}
    </>
  );
}
DoctorLogin.layout = LoginLayout;
