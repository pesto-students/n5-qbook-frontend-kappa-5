import React, { useContext } from "react";
import {firebaseAuth,provider} from '../../firebase'
import LoginLayout from "layouts/LoginLayout.js";
import axios from "axios";
import Router from 'next/router'
import Settings from "pages/doctor/settings";
//import { ProfileContext } from "Context/ProfileContext";
export default function DoctorLogin() {
  //const {profileInfo,setProfileInfo} = useContext(ProfileContext)
  const addDoctorInfo = async(user) =>{
            // setProfileInfo({
            //   ...profileInfo,
            //   name:user.firstname,
            //   photoUrl:user.image,
            // });
           const apiUrl = 'http://api.qbooks.in:1337/api/v1/user/login';
          // const apiUrl = 'http://localhost:1337/api/v1/user/login';
          const response= await axios.post(apiUrl,user);
          console.log(response,"response")
          //Router.push("/doctor/settings")
          const apiUrldashboard = 'http://api.qbooks.in:1337/api/v1/user/dashboard';
          axios({
            url: 'http://api.qbooks.in:1337/api/v1/user/dashboard',
            method: 'get',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjBmZWU4YzI2MzQzZjRlYmE0YWFhOTYzIiwiaWF0IjoxNjI3NzA4NTkwLCJleHAiOjE2MjgzMTMzOTB9.pP-6EQMMy26Q2xxRjnRuMknT1JmsBehi9uTHURjoP0E',
            }
         })
         .then(response => {
            console.log(response)
         }) 
         .catch(err => {
            console.log(err);
         });
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
                  <span className="font-bold">QBook</span> helps to ease your consultation process by providing a track
                  of the ongoing & past consultations digitally. Easy configurations of available timings,
                   cancelling the appointments in case of any emergencies, generating a QR code for the patients
                  to book the appointments without any hassle and a lot more...!!
                </p>
              </div>
            </div>
                <div className="text-center mb-3 mt-2">
                  <h6 className="text-white text-sm font-bold">
                    Sign in to get started..!
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={signIn}
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                  {/* <button onClick={askForPermissioToReceiveNotifications} >
      click to receive notifications
    </button> */}
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