import React,{useEffect} from "react";
import CardSettings from "components/Cards/CardSettings.js";
import DoctorLayout from "layouts/DoctorLayout.js";
import CardConfig from "components/Cards/CardConfig";
import { useDispatch } from 'react-redux';
import { updateConfig } from '../../slices/settingsSlice';

export default function Settings() {
  const dispatch = useDispatch();
  useEffect(() => {
    //get the dashboard data from api
    const response = {
      "record": {
          "createdAt": 1627318466653,
          "updatedAt": 1628240250763,
          "id": "60fee8c26343f4eba4aaa963",
          "firstname": "Gaurav",
          "lastname": "Tayal",
          "email": "abc@gmail.com",
          "googleAuthId": "dsdsd24234sadasdasdsd",
          "image": "http://google.com/abc.jpeg",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjBmZWU4YzI2MzQzZjRlYmE0YWFhOTYzIiwiaWF0IjoxNjI4MjQwMjUwLCJleHAiOjE2Mjg4NDUwNTB9.19ML11B6bMIH64KCOvb4p3AenMAQmTC4Q-Qxc-TK3MY"
      },
      "setting": {
          "createdAt": 1627700780186,
          "updatedAt": 1627700780186,
          "id": "6104be2c71fb14712b4d88c1",
          "title": "MBBS MS",
          "brief": "Got Gold Medal in throat infection",
          "fees": 500,
          "userId": "60fee8c26343f4eba4aaa963",         
          "startTime":{hours:"00",minutes:"00",period:"AM"},
          "endTime":{hours:"00",minutes:"00",period:"AM"},
          "is_duty": false,
          "is_notification": false
      }
  };
  dispatch(updateConfig(response));
  }, [])
  return (
    <>   
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardConfig />
        </div>
      </div>
    </>
  );
}

Settings.layout = DoctorLayout;
