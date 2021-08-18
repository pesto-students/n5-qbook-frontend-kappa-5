import React from "react";
import DoctorNavbar from "components/Navbars/DoctorNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterDoctor from "components/Footers/FooterDoctor.js";

export default function DoctorLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <DoctorNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterDoctor />
        </div>
      </div>
    </>
  );
}
