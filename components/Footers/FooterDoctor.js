import React from "react";

export default function FooterDoctor() {
  return (
    <>
      {/* <footer className="sticky  md:sticky bottom-0 w-12/12 h-10"> */}
      <footer className="fixed  md:fixed bottom-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center">
     
        <div className="container">
          {/* <hr className="mb-1 border-b-1 border-blueGray-200" /> */}
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-12/12 px-4 lg:w-12/12 xl:w-12/12">
              <div className="text-xs text-blueGray-500 py-0 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" QBook"}                
              </div>
            </div>
            {/* <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <p  className="text-blueGray-600 hover:text-blueGray-800 text-sm block">
                    Contact
                  </p>
                </li>                
              </ul>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}
