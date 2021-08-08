import React, { useEffect } from "react";
import AppointmentsLayout from "layouts/AppointmentsLayout";
import { useDispatch } from 'react-redux';
import { updateAppointmentsHistoryList } from '../../slices/appointmentSlice';
import CardAppointmentHistoryData from "components/Cards/CardAppointmentHistoryData";

export default function History() {
  const dispatch = useDispatch();
  useEffect(() => {
    //get the appointment data from api
    const response = [{uuid:"1",name:"Anna",phoneNumber:"12345678",date:"08/08/2021",paymentMode:"online"},
    {uuid:"2",name:"helen",phoneNumber:"12225678",date:"08/07/2021",paymentMode:"online"},
    {uuid:"3",name:"tom",phoneNumber:"34345656",date:"03/09/2021",paymentMode:"online"},
    {uuid:"4",name:"Anna",phoneNumber:"67676756",date:"03/09/2021",paymentMode:"online"}
    ];
  dispatch(updateAppointmentsHistoryList(response));
  }, [])
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardAppointmentHistoryData/>
        </div>
      </div>
    </>
  );
}

History.layout = AppointmentsLayout;
