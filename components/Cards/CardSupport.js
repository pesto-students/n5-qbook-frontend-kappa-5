import React,{useState,useContext} from "react";
import axios from "axios";
import {ProfileContext} from '../../Context/ProfileContext';
import validation from "components/utils/validation";

export default function CardSupport() {
  const {profileInfo} = useContext(ProfileContext)
  const [errors,setErrors] = useState({});
  const sendQuery = (e) =>{
    console.log("inside update ")
    e.preventDefault();
      setErrors(validation(profileInfo)) 
    //console.log("profile",profileInfo);
      // const apiUrl = 'http://ec2-13-126-203-170.ap-south-1.compute.amazonaws.com:1337/api/v1/user/login';
      // const response= await axios.post(apiUrl,profile);
      // console.log(response,"response")
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl uppercase font-bold">Contact for Support</h6> 
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={sendQuery}>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Query</label>
                  <input  type="text" name="name" value={profileInfo.name}  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Description</label>
                  <textarea rows={5} cols={5} name="specialization" value={profileInfo.specialization} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>                    
                </div>
              </div>           
            </div>           
            <div className="flex flex-wrap">           
              <div className="w-full lg:w-6/12 px-4 mt-3">
                <div className="relative w-full mb-3">
                  <button  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit">Send</button>
                </div>
              </div>          
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />        
          </form>
        </div>
      </div>
    </>
  );
}