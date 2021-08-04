/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";
import LoginLayout from "../layouts/LoginLayout.js";

export default function Index() {
 
  
  return (
    <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3" data-testid = "doctorPageLink">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                  <Link href="/auth/doctorlogin"  >Doctor's Login</Link>
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>          
            </div>          
          </div>
        </div>
      </div>
   );
}

Index.layout = LoginLayout;
