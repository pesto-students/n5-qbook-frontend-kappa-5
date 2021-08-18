import React, { useEffect } from "react";
import AppointmentsLayout from "layouts/AppointmentsLayout";
import CardAppointmentHistoryData from "components/Cards/CardAppointmentHistoryData";
export default function History() {
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
