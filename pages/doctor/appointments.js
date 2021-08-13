import React from "react";
import CardConfig from "components/Cards/CardConfig";
import AppointmentsLayout from "layouts/AppointmentsLayout";
import CardAppointmentData from "components/Cards/CardAppointmentData";

export default function Appointments() {
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
