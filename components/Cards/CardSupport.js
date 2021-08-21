import React,{useState} from "react";
import { useForm } from "react-hook-form";
import {getAsyncPostData} from '../../utils/ApiRequests';
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from 'react-toastify';
export default function CardSupport() {
  const[queries,setQueries] = useState({});
  const [loading,setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const sendQuery = async(data,e) =>{
    e.preventDefault();
    setLoading(true);
    const queryData = {
      subject:data?.question,
      query:data?.queryDescription,
    }
    try{
      const response = await getAsyncPostData('/user/support',queryData);
      setLoading(false);
      if(response){
        return toast("Query Sent successfully!!",{type:"success"})
      }
      if(!response){
        return toast("Unable to send the query..",{type:"error"})
      }
    }
    catch{
      return toast("Unable to send the query..",{type:"error"})
    }
  }
  const handleInput = (e) =>{
    let propName = e.target.name;
    let propValue = e.target.value;
    setQueries({...queries,[propName]:propValue})
  }
  return (
    <>
      <ToastContainer position="top-right" />
      <LoadingOverlay active={loading} spinner text="">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl  font-bold">Contact for Support</h6> 
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(sendQuery)}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Query</label>
                  <input  type="text" name="question" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput} {...register('question', { required: true })}  value={queries?.question}
                  />
                  {errors?.question && <p className="text-xs text-red-500 pt-2 font-semibold">Query is Required!</p>} 
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Description</label>
                  <textarea rows={5} cols={5} name="queryDescription" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput} {...register('queryDescription', { required: true })}  value={queries?.queryDescription}
                  />  
                  {errors?.queryDescription && <p className="text-xs text-red-500 pt-2 font-semibold">Query Description is Required!</p>}                  
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
      </LoadingOverlay>
      </>
  );
}