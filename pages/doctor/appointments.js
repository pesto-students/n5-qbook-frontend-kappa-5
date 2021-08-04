import React, { useContext } from "react";

import CardTable from "components/Cards/CardTable.js";

import DoctorLayout from "layouts/DoctorLayout.js";
import CardConfig from "components/Cards/CardConfig";
import { ProfileContext } from "Context/ProfileContext";

export default function Appointments() {
  //const [{profileInfo,setProfileInfo}] = useContext(ProfileContext)
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4 lg:w-8/12">
          <CardTable />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig />
        </div>
      </div>
    </>
  );
}

Appointments.layout = DoctorLayout;
