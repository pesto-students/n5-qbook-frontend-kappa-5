import React,{useState,useRef} from "react";
import firebase from '../../firebase'
import LoginLayout from "layouts/LoginLayout.js";

export default function PatientLogin() {
    const [phoneNumber,setPhoneNumber] = useState('');
    const [otp,setOtp] = useState('');
    const capthaRef = useRef();
    const configureCaptha = () =>{    
      if(window.recaptchaVerifier) {       
        capthaRef.current.innerHTML = `<div id="sign-in-button" ></div>`;
    }    
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("captha verified");         
      },
      defaultCountry:"IN",
    })}
    const signInPatient = () =>{
      configureCaptha();    
      const appVerifier = window.recaptchaVerifier;    
      const phoneNum = "+91" +phoneNumber;
      firebase.auth().signInWithPhoneNumber(phoneNum, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          }).catch((error) => {
            console.log("sms not sent",error.message);
            window.recaptchaVerifier.reset();
          });
    }
    const onSubmitOtp =() =>{
      const code = otp;
      window.confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
      }).catch((error) => {
        console.log("otp invalid",error.message);
        window.recaptchaVerifier.reset();
        window.recaptchaVerifier.clear();
      });}
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">Book an Appointment</h6>
                </div>             
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">               
                <form>
                <div ref={capthaRef}><div id="sign-in-button" ></div></div>
                  <div className="relative w-full mb-3">
                    <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Full Name</label>         
                    <input  type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name" />
                  </div>
                  <div className="relative w-full mb-3">
                    <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Phone Number</label>
                    <input  type="number" value = {phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone Number"/>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button" onClick={signInPatient}>Generate OTP</button>
                  </div>
                  <div>
                    <label className="flex items-center cursor-pointer justify-center">                     
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">Not received OTP ? {" "}
                        <span  className="text-lightBlue-500"  onClick={signInPatient}>Resend OTP</span>
                      </span>
                    </label>                 
                  </div>
                  <div className="relative w-full mb-3">
                    <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Enter OTP</label>
                    <input  type="number" value = {otp} onChange={(e)=>setOtp(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="OTP"/>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={onSubmitOtp}>Verify OTP & Book Appointment</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );}
  PatientLogin.layout = LoginLayout;