import React,{useState,useRef, useEffect} from "react";
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
  const [phoneNumber,setPhoneNumber] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [paymnetMode,setPaymnetMode] = useState('online');
  const [fullName,setFullName] = useState('');
  const [checkAvailable,setCheckAvailable] = useState('');
  const [isCheckAvailable,setIsCheckAvailable] = useState('');
  const [otp,setOtp] = useState('');
  const [isMobileNumVerified,setIsMobileNumVerified] = useState('');
  const [isOtpNumVerified,setIsOtpNumVerified] = useState('');
  
  const capthaRef = useRef();
  const configureCaptha = () =>{    
      if(window.recaptchaVerifier) {       
        capthaRef.current.innerHTML = `<div id="sign-in-button" ></div>`;
    }
    setIsCheckAvailable(true);   
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {        
      }
    })
  }
  const getSetPaymnetMode = (e) =>{
    setPaymnetMode(e.target.value);
  }
    const signInPatient = () =>{
      if(!isMobileNumVerified) {
        if(phoneNumber){
          configureCaptha();    
          const appVerifier = window.recaptchaVerifier;    
          const phoneNum = "+91" +phoneNumber;
          firebase.auth().signInWithPhoneNumber(phoneNum, appVerifier)
              .then((confirmationResult) => {
                setIsOtpNumVerified(true);
                window.confirmationResult = confirmationResult;
                setErrorMessage('');
              }).catch((error) => {
                setIsOtpNumVerified(false);
                window.recaptchaVerifier.reset();
                setErrorMessage(error.message);
              });
        }else {
          setErrorMessage(' PHONE NUMBER is required for genrating the OTP !');
        }
        
      } else {
        setErrorMessage(' Pateint Mobile number already verified !');
      }
    }
    const onSubmitOtp =() =>{
      if(!isMobileNumVerified) {
          if(isOtpNumVerified) {
            const code = otp;
            window.confirmationResult.confirm(code).then((result) => {
              const user = result.user;
              setIsMobileNumVerified(true);
              setErrorMessage('');
            }).catch((error) => {
              setIsMobileNumVerified(false);
              window.recaptchaVerifier.reset();
              window.recaptchaVerifier.clear();
              setErrorMessage(error.message);
            });
          } else{
            setErrorMessage('OTP Genration is Pending  !');
          }
      }else {
          setErrorMessage(' Pateint Mobile number already verified !');
      }
    }
    const onBookAppoinment =() =>{
      if(fullName && phoneNumber && otp && isMobileNumVerified) {
        if(paymnetMode === 'online'){
          displayRazorpay();
          setErrorMessage('');
        } else if(paymnetMode === 'cash'){
          cashCreateBooking();
          setErrorMessage('');
        }else{
          setErrorMessage('Payment Mode is required !');
        }
      }else{
        setErrorMessage('Please fill all required Fields or Mobile number is not verified !');
      }
    }
    const cashCreateBooking= async () =>{
      const casheWebtoken = await firebaseCloudMessaging.init();
      
      let cashCreateData ={
        "name": fullName,
        "mobileNum": phoneNumber,
        "isMobileNumVerified": isMobileNumVerified?true:false,
        "paymentMode": paymnetMode,
        "uuid": uuid,
        "order_id": checkAvailable.data.orderId,
        "token":casheWebtoken || ''
      }
      bookingCreateApi(cashCreateData);
    }
    let checkAvailability= async () =>{
      const dataQrCode = await fetch(config.BASE_API_URL+'/booking/checkAvailability?uuid='+uuid, { method: 'GET' }).then((t) =>
          t.json()
        );
        setCheckAvailable(dataQrCode);
    }
    let displayRazorpay = async () => {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      const webtoken = await firebaseCloudMessaging.init();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }
      if(checkAvailable && checkAvailable.data){
        
          const options = {
            key: 'rzp_test_Mj02y5458xshqx',
            currency: 'INR',
            amount: checkAvailable.data.fee || 500,//data.amount.toString(),
            order_id: checkAvailable.data.orderId,
            name: 'Doctor Payment',
            description: 'Please go ahead for payemnt !!',
            image: 'https://www.newzealand.com/assets/Operator-Database/f59158f2b6/img-1536060335-6557-12242-p-6F1EB578-C4BC-BE00-91796DF7718B39A2-2544003__aWxvdmVrZWxseQo_CropResizeWzk0MCw1MzAsNzUsImpwZyJd.jpg',
            handler: function (response) {
              let createData ={
                "name": fullName,
                "mobileNum": phoneNumber,
                "isMobileNumVerified": isMobileNumVerified?true:false,
                "paymentMode": paymnetMode,
                "uuid": uuid,
                "order_id": checkAvailable.data.orderId,
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
      if(bookingResponse && bookingResponse.data && bookingResponse.data.booking && bookingResponse.data.booking.searchToken){
        router.push('/confirmation?searchToken='+encodeURIComponent(bookingResponse.data.booking.searchToken))
      }else{
        setErrorMessage('Some issue in Book an appoinmnet please try again !');
      }
    }
    useEffect(() => {
      if(uuid){
        checkAvailability();
      }
    },[uuid]);
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            {checkAvailable && checkAvailable.data && checkAvailable.data.orderId? <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">Book an Appointment</h6>
                </div>  
                {errorMessage?<div className="text-center mb-3">
                  <h6 className="text-red-500 text-sm font-bold">! Error : {errorMessage}</h6>
                </div>:''}           
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>:
                <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">Doctor Appointment is not available for now !!. </h6>
                </div>
              </div>
                }
              {checkAvailable && checkAvailable.data && checkAvailable.data.orderId? 
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
                      type="button"  onClick={onSubmitOtp}>Verify OTP</button>
                  </div>
                  <div className="mt-6">
                    <span className="text-gray-700">Payment Mode</span>
                    <div className="mt-2">
                      <label className="inline-flex items-center px-2 py-2 block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        <input type="radio" className="form-radio" name="accountType" value="cash" checked={paymnetMode === 'cash'?true:false} onChange={getSetPaymnetMode} />
                        <span className="ml-2">Cash</span>
                      </label>
                      <label className="inline-flex items-center px-2 py-2 block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        <input type="radio" className="form-radio" name="accountType" value="online" checked={paymnetMode === 'online'?true:false}  onChange={getSetPaymnetMode} />
                        <span className="ml-2">Online</span>
                      </label>
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 "
                      type="button"  onClick={onBookAppoinment}>Book Appointment</button>
                  </div>
                </form>
              </div>:''}
            </div>
          </div>
        </div>
      </div>
    </>
  );}
  Booking.layout = LoginLayout;