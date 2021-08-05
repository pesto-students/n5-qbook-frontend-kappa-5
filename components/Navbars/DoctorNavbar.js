
import { ProfileContext } from 'Context/ProfileContext';
import { useContext } from 'react';
export default function DoctorNavbar() {
  const {doctorLoginInfo,signOut} = useContext(ProfileContext)

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between sm:flex-row-reverse md:flex-row-reverse md:flex-nowrap flex-wrap md:px-10 px-4">
          <p className="text-white text-sm uppercase mb-5 lg:mb-0 lg:inline-block font-semibold">
            Doctor Portal
          </p> 
          <div className="flex right-0 flex-wrap items-stretch">               
                <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full cursor-pointer">
                  <img
                    alt="..."
                    className="w-full rounded-full align-middle border-none shadow-lg"
                    src={doctorLoginInfo?.result?.image} 
                    onClick={signOut}                  
                  />
                </span>
            </div>     
        </div>
      </nav>
    </>
  );
}
