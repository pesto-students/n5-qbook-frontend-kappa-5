import React,{useEffect} from "react";
import CardConfig from "components/Cards/CardConfig";
import AppointmentsLayout from "layouts/AppointmentsLayout";
import { useDispatch } from 'react-redux';
import { updateAppointmentsList } from '../../slices/appointmentSlice';
import CardAppointmentData from "components/Cards/CardAppointmentData";

export default function Appointments() {
  const dispatch = useDispatch();
  useEffect(() => {
    //get the appointment data from api
    const response = [{uuid:"1",name:"Anna",phoneNumber:"12345678",date:"08/08/2021",paymentMode:"online"},
    {uuid:"2",name:"helen",phoneNumber:"12225678",date:"08/07/2021",paymentMode:"online"},
    {uuid:"3",name:"tom",phoneNumber:"34345656",date:"03/09/2021",paymentMode:"online"},
    {uuid:"4",name:"Anna",phoneNumber:"67676756",date:"03/09/2021",paymentMode:"online"}
    ];
  dispatch(updateAppointmentsList(response));
  }, [])
  return (
    <>   
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 lg:w-8/12">
          <CardAppointmentData/>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig />
        </div>
      </div>
    </>
  );
}

Appointments.layout = AppointmentsLayout;
