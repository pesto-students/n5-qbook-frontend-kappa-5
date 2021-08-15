import React from "react";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardQrCode from "components/Cards/CardQrCode";

export default function QrCode() {
  return (
    <>   
      <div className="flex flex-wrap"> 
        <div className="w-full lg:w-4/12 px-4">
          <CardQrCode />
        </div>
      </div>
    </>
  );
}

QrCode.layout = DoctorLayout;
