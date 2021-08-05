/* eslint-disable react/jsx-no-target-blank */
import DoctorLogin from "./auth/doctorlogin";
import { ProfileContext } from "Context/ProfileContext"
import { useContext } from "react";
import Appointments from "./doctor/appointments";
import  AppointmentsLayout from "layouts/AppointmentsLayout";
import  LoginLayout from "layouts/LoginLayout";
export default function Index() {
  const {doctorLoginInfo} = useContext(ProfileContext)
  return (
    <>
    {!doctorLoginInfo.firstname?(
      <LoginLayout>
        <DoctorLogin/>
      </LoginLayout>
    ):(    
      <AppointmentsLayout>
        <Appointments/>
      </AppointmentsLayout>
    )}     
    </>
  );
}
