import React,{useState,useRef} from "react";
import firebase from '../firebase'
import LoginLayout from "layouts/LoginLayout.js";
import config from "../config/config";
import {getAsyncData, getAsyncPostData} from '../utils/ApiRequests';
import { useRouter } from 'next/router'
import { firebaseCloudMessaging } from '../components/Service/webPush';

//import DeviceInfo from 'react-native-device-info';
//import {isMobile,getUA} from "react-device-detect";
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

export default function Booking() {
  const [deviceId, setDeviceId] =  useState('');
  const router = useRouter();
  const { uuid } = router.query;
        
  // const getdeviceId = () => {
  //   var uniqueId = getUA
  //  //var uniqueId = MediaDeviceInfo.deviceId;
  //  //var uniqueId = getUA();
  //   console.log(uniqueId)
  //   setDeviceId(uniqueId);
  // };

    const [phoneNumber,setPhoneNumber] = useState('');
    const [fullName,setFullName] = useState('');
    const [otp,setOtp] = useState('');
    const capthaRef = useRef();
    const configureCaptha = () =>{    
      if(window.recaptchaVerifier) {       
        capthaRef.current.innerHTML = `<div id="sign-in-button" ></div>`;
    }    
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {        
      }
    })}
    const signInPatient = () =>{
      configureCaptha();    
      const appVerifier = window.recaptchaVerifier;    
      const phoneNum = "+91" +phoneNumber;
      firebase.auth().signInWithPhoneNumber(phoneNum, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          }).catch((error) => {
            window.recaptchaVerifier.reset();
          });
    }
    const onSubmitOtp =() =>{

      // const code = otp;
      // window.confirmationResult.confirm(code).then((result) => {
      //   const user = result.user;
      //   console.log(JSON.stringify(user));
      // }).catch((error) => {
      //   console.log("otp invalid",error.message);
      //   window.recaptchaVerifier.reset();
      //   window.recaptchaVerifier.clear();
      // });

      displayRazorpay();
    }

      let displayRazorpay = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        const webtoken = await firebaseCloudMessaging.init();
        if (!res) {
          alert('Razorpay SDK failed to load. Are you online?')
          return
        }
    
        const dataQrCode = await fetch(config.BASE_API_URL+'/booking/checkAvailability?uuid='+uuid, { method: 'GET' }).then((t) =>
          t.json()
        )
        // const dataQrCode = await getAsyncData('/booking/checkAvailability?uuid='+uuid,{uuid});
        // const data = await fetch('http://localhost:1337user/generate-code', { method: 'GET' }).then((t) =>
        //   t.json()
        // )
        
        console.log('dataQrCode', dataQrCode, webtoken);
        if(dataQrCode && dataQrCode.data){
          
            const options = {
              key: 'rzp_test_Mj02y5458xshqx',
              currency: 'INR',
              amount: dataQrCode.data.fee || 500,//data.amount.toString(),
              order_id: dataQrCode.data.orderId,
              name: 'Doctor Payment',
              description: 'Please go ahead for payemnt !!',
              image: 'https://www.newzealand.com/assets/Operator-Database/f59158f2b6/img-1536060335-6557-12242-p-6F1EB578-C4BC-BE00-91796DF7718B39A2-2544003__aWxvdmVrZWxseQo_CropResizeWzk0MCw1MzAsNzUsImpwZyJd.jpg',
              handler: function (response) {
                // alert(response.razorpay_payment_id)
                // alert(response.razorpay_order_id)
                // alert(response.razorpay_signature)
                console.log('response',response);
                let createData ={
                  "name": fullName,
                  "mobileNum": phoneNumber,
                  "isMobileNumVerified": true,
                  "paymentMode": "online",
                  "uuid": uuid,
                  "razorpay_order_id": response.razorpay_order_id,
                  "razorpay_payment_id": response.razorpay_payment_id,
                  "razorpay_signature": response.razorpay_signature,
                  "token":webtoken || ''
                }
                bookingCreateApi(createData);
              },
              prefill: {
                phone_number: phoneNumber
              }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        }
       
      }
      const bookingCreateApi = async(data) =>{
        const bookingResponse = await getAsyncPostData('/booking/create',data); 
        console.log('bookingResponse',bookingResponse);
      }
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
                    <input  type="text" value = {fullName} onChange={(e)=>setFullName(e.target.value)}
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
                  <div className="text-center mt-6">
                    {/* <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"  onClick={getdeviceId}>generate unique id</button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );}
  Booking.layout = LoginLayout;