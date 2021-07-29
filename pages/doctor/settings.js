import React from "react";
import CardSettings from "components/Cards/CardSettings.js";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardConfig from "components/Cards/CardConfig";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig />
        </div>
      </div>
    </>
  );
}

Settings.layout = DoctorLayout;
