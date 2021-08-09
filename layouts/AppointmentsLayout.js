import React from "react";
import DoctorNavbar from "components/Navbars/DoctorNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterDoctor from "components/Footers/FooterDoctor.js";
import HeaderAppointments from "components/Headers/HeaderAppointments";

export default function AppointmentsLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative h-screen md:ml-64 bg-blueGray-100">
        <DoctorNavbar />
        <HeaderAppointments/>       
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          {/* <FooterDoctor /> */}
        </div>
        <FooterDoctor />
      </div>
      
    </>
  );
}
