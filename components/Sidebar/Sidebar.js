import React,{useState} from "react";
import Link from "next/link";
import { qBook,hrefSettings,hrefAppointments,hrefHistory,hrefReports,hrefSupport,hrefQrCode } from '../../utils/Constants';
import NavLink from "./NavLink";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button" onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}>
            <i className="fas fa-bars"></i>
          </button>
          <Link href="/">
            <a  href="/"  className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              {qBook}
            </a>
          </Link>       
          <div  className={ "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " + collapseShow}>
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a href="/" className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      {qBook}
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button  type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-4 md:min-w-full" />
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <NavLink hrefLink={hrefAppointments} hrefText="Appointments" icon="fa-calendar"/>
                <NavLink hrefLink={hrefHistory} hrefText="Appointments History" icon="fa-id-card-alt"/>
                <NavLink hrefLink={hrefSettings} hrefText="Settings" icon="fa-tools"/>
                <NavLink hrefLink={hrefQrCode} hrefText="My QR Code" icon="fa fa-qrcode"/>
                <NavLink hrefLink={hrefReports} hrefText="Reports" icon="fa-chart-bar"/>
                <NavLink hrefLink={hrefSupport} hrefText="Support" icon="fa-question-circle"/>   
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
