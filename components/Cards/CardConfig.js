import React,{useState} from "react";
import Toggle from 'components/Sidebar/Toggle';
import firebase from '../../firebase'
export default function CardConfig() {
const [onDuty, setOnDuty] = useState(true);
const [sendNotifications, setSendNotifications] = useState(true);
const [enabled, setEnabled] = useState(false)

// const messaging = firebase.messaging();
// messaging.getToken({vapidKey: "BE-QIly0dhEhwxGy7HK1-0ukeqjzbmJE9IIqCFRe1-fV2MSpnhtc-ipMGXOktjTXkrIeGx0948zOZSUVh1aosqk"}).then((currentToken) => {
//   if (currentToken) {
//     // Send the token to your server and update the UI if necessary
//     console.log(currentToken,"token")
//     // ...
//   } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//     // ...
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   // ...
// });
//console.log("messaging",messaging)
// messaging.requestPermission().then(()=>{
//   console.log("have permission")
//   //return messaging.getToken()
// }).catch(function(err){
//   console.log('err')
// })
const cancelAppointments =() =>{
  //api call
}
  return (
    <>
     
      <div className="relative flex flex-col  min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        
        <div className="flex flex-wrap flex-col  m-20 space-y-2">
          <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">
         
          <Toggle/>
              </div>
              <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">
               <Toggle/>
                
              </div>
              <div className="w-full lg:w-12/12 px-4 mt-5 mb-5 ml-5">
                <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button" onClick={cancelAppointments}>Cancel All Appointments</button>
              </div>         
        </div>
      </div>
    </>
  );
}
