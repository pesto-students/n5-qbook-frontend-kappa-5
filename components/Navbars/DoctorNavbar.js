import React,{useEffect,useState,useRef} from 'react';
import {  useDispatch,useSelector } from 'react-redux';
import {  login, logout, selectUser } from "slices/doctorSlice";
import {firebaseAuth} from '../../firebase'
import { doctorPortal } from 'utils/Constants';
import {useRouter}  from 'next/router';
import { createPopper } from "@popperjs/core";
export default function DoctorNavbar() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef();
  const popoverDropdownRef = useRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const userLogin = useSelector(selectUser)
  const router = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {
    if (process.browser) {
      const loginInfo = JSON.parse(sessionStorage.getItem("doctor_login"));
      dispatch(login(loginInfo)); 
      }
  }, [])
  const signOut = (e) =>{
    e.preventDefault()
    firebaseAuth.signOut().then(()=>{
          dispatch(logout());
          sessionStorage.clear();
          router.push('/')
      });
  };
  const handlePopOver = (e) =>{
    e.preventDefault();
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
  }
  return (
    <>
      <nav className=" sticky  md:sticky top-0 left-0 w-full z-10 bg-blueGray-800 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between sm:flex-row-reverse md:flex-row-reverse md:flex-nowrap flex-wrap md:px-10 md:absolute md:-mt-28 px-4">
          <p className="text-white text-sm uppercase mb-5 lg:mb-0 lg:inline-block font-semibold">
            {doctorPortal}
          </p> 
          <div className="flex right-0 flex-wrap items-stretch">               
                <a className="text-blueGray-500 block" href="/" ref={btnDropdownRef}  onClick={handlePopOver}>
                  <div className="items-center flex">
                    <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                      <img
                        alt="..."
                        className="w-full rounded-full align-middle border-none shadow-lg"
                        src={userLogin?.result?.image}
                      />
                    </span>
                  </div>
                </a>
                <div   ref={popoverDropdownRef}  className={(dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"}>
              <a  href="/"  className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}
                onClick={signOut}>
                Log Out
              </a>
          </div>
            </div>     
        </div>
      </nav>
    </>
  );
}
