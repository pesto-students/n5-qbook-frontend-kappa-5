import React, { useContext } from "react";

import CardTable from "components/Cards/CardTable.js";

import DoctorLayout from "layouts/DoctorLayout.js";
import { ProfileContext } from "Context/ProfileContext";

export default function History() {
  const {profile,dispatch} = useContext(ProfileContext);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}

History.layout = DoctorLayout;
