/* eslint-disable react/jsx-no-target-blank */


import DoctorLogin from "./auth/doctorlogin";
import ProfileContextProvider from "Context/ProfileContext"
import firebase from 'firebase'
import { useEffect } from "react";

export default function Index() {
 
  
  return (
    <>
      <ProfileContextProvider>
          <DoctorLogin/>
      </ProfileContextProvider>
    </>
  );
}
