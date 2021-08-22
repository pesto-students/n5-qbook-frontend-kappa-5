
import React,{useState,useRef, useEffect} from "react";
import LoginLayout from "layouts/LoginLayout.js";
import config from "../config/config";
import { useRouter } from 'next/router'
import moment from 'moment'
import LoadingOverlay from "react-loading-overlay";

export default function Confirmation() {
  const router = useRouter();
  const { searchToken } = router.query;
  const [appoinmentData,setAppoinmentData] = useState('');
  const [loading,setLoading] = useState(false);

  let checkAppoinment= async () =>{
    setLoading(true);
    const confirmationData = await fetch(config.BASE_API_URL+'/booking/confirmation?searchToken='+searchToken, { method: 'GET' }).then((t) =>{
      setLoading(false);
      return t.json();
    });
      setAppoinmentData(confirmationData);
  }

  useEffect(() => {
    if(searchToken){
      checkAppoinment();
    }
  },[searchToken]);
  
  return (
    <>
    <LoadingOverlay active={loading} spinner text="Loading">
    {appoinmentData && appoinmentData.data && appoinmentData.data.booking?
      <main className="profile-page">
        <section className="relative py-16 ">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      {appoinmentData.data.docsData && appoinmentData.data.docsData.image?<img
                        alt="..."
                        src= {appoinmentData.data.docsData.image}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    :''}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                   DR. {appoinmentData.data.docsData.firstname}
                  </h3>
                  { appoinmentData.data.tokenNumber?
                  <div className="mb-2 text-blueGray-600">
                   Queue Number:  <strong>{appoinmentData.data.tokenNumber}</strong> 
                  </div>
                  : <div className="mb-2 text-blueGray-600">You have sucessfully Completed your Appoinmnet !!</div>
                  }
                  <div className="w-full lg:w-2/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          Patient Name
                        </span>
                        <span className="text-sm text-blueGray-400">
                        {appoinmentData.data.booking.customerInfo.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-2/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                     <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          Mobile Number
                        </span>
                        <span className="text-sm text-blueGray-400">
                        {appoinmentData.data.booking.customerInfo.mobile}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-2/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          Booking date
                        </span>
                        <span className="text-sm text-blueGray-400">
                        {appoinmentData.data.booking.bookingDateTime?moment(appoinmentData.data.booking.bookingDateTime).format('YYYY-MM-DD hh:mm A'):'--'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-2/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        Expected Date Time
                        </span>
                        <span className="text-sm text-blueGray-400">
                        {appoinmentData.data.expectedDateTime?moment(appoinmentData.data.expectedDateTime).format('YYYY-MM-DD hh:mm A'):'--'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-2/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                     <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          Consulatation Fees
                        </span>
                        <span className="text-sm text-blueGray-400">
                        {appoinmentData.data.booking.fees}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {appoinmentData && appoinmentData.data && appoinmentData.data.booking && appoinmentData.data.booking.paymentMode && appoinmentData.data.booking.paymentMode === 'online' && 
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        Payment Recived Successfully !
                      </p>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </section>
      </main>
      :<main className="profile-page">
        {appoinmentData &&
      <section className="relative py-16 ">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
            <div className="px-6"><div className="flex flex-wrap justify-center">No Appoinmnet Available !!</div></div>
            </div>
          </div>
        </section>
          }
      </main>}
      </LoadingOverlay>
    </>
  );
}
Confirmation.layout = LoginLayout;