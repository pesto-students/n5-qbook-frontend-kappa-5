import React,{useState} from "react";
import Switch from '@material-ui/core/Switch';

export default function CardConfig() {
const [onDuty, setOnDuty] = useState(true);
const [sendNotifications, setSendNotifications] = useState(true);
const cancelAppointments =() =>{
  //api call
}
  return (
    <>
      <div className="relative flex flex-col  min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="flex flex-wrap flex-col  m-20 space-y-2">
          <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">
                  {/* <Switch
                      checked={onDuty}
                      onChange={(e)=>setOnDuty(e.target.checked)}
                      name="onDuty"
                  /> */}

                {/* <p className="text-bg-blueGray-600 font-bold uppercase text-xs px-1 py-2">ON/OFF DUTY (Adhoc Break)</p> */}
             

                {/* <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-rose-500 border-4 appearance-none cursor-pointer"/>
    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-700 cursor-pointer"></label>
</div>
<label htmlFor="toggle" className="text-xs text-gray-700">Toggle me.</label> */}

<div className="">
<span className="text-sm text-gray-800">Light</span>
<div>
 <input type="checkbox" name="" id="toggle" className="hidden"/>
  <label htmlFor="toggle">

  <div className="w-9 h-5  bg-blueGray-400 active:bg-blueGray-400 rounded-full p-1">
    

    <div className="toggle-dot bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-out"></div>
  
    </div>
    </label>
  </div>

 

</div>
              {/* adding the code */}
              </div>
              <div className="w-full lg:w-12/12 px-1 mt-5 flex flex-row items-center">
                  <Switch
                      checked={sendNotifications}
                      onChange={(e)=>setSendNotifications(e.target.checked)}
                      name="sendNotifications"
                  />
                <p  className="text-bg-blueGray-600 font-bold uppercase text-xs px-1 py-2">ON/OFF Notifications</p>
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
