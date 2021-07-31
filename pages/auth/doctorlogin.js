import React from "react";
import {auth,provider} from '../../firebase'
import LoginLayout from "layouts/LoginLayout.js";
import axios from "axios";

export default function DoctorLogin() {

  const addDoctorInfo = async(user) =>{
           const apiUrl = 'http://ec2-52-66-15-186.ap-south-1.compute.amazonaws.com:1337/api/v1/user/login';
          // const apiUrl = 'http://localhost:1337/api/v1/user/login';

          const response= await axios.post(apiUrl,user);
      console.log(response,"response")
  }
  

  const signIn = () =>{
    auth.signInWithPopup(provider)
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
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
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
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>          
            </div>          
          </div>
        </div>
      </div>
    </>
  );
}

DoctorLogin.layout = LoginLayout;
