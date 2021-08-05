import React from "react";
import CardTable from "components/Cards/CardTable.js";
import CardConfig from "components/Cards/CardConfig";
import AppointmentsLayout from "layouts/AppointmentsLayout";

export default function Appointments() {
  return (
    <>   
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4 lg:w-8/12">
          <CardTable />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig />
        </div>
      </div>
    </>
  );
}

Appointments.layout = AppointmentsLayout;
