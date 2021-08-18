import React from "react";
import Link from "next/link";


export default function LoginNavbar(props) {

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <p
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              >
                QBook
              </p>
            </Link> 
            {/* <div className="relative flex flex-col lg:flex-row mr-auto">
                <img
                  alt="..."
                  src="/img/logo.png"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>            */}
          </div>        
        </div>
      </nav>
    </>
  );
}
