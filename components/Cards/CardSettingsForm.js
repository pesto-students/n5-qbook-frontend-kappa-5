
import TimePicker from "components/Sidebar/TimePicker";

function CardSettingsForm({updateProfile,profileInfo,handleInput,errors,handleStartTime,handleEndTime}) {
    return (
        <>
           <form onSubmit={updateProfile}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Doctor Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Preferred Name<span className="text-xs text-red-500 px-1">*</span></label>
                  <input  type="text" data-id="record" name="firstname" value={profileInfo?.firstname} required className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 " 
                     onChange={handleInput}/>
                     {errors?.firstname && <p className="text-xs text-red-500 pt-1 font-semibold">{errors?.firstname}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Specialization<span className="text-xs text-red-500 px-1">*</span></label>
                  <input  type="text" data-id="setting"  name="title" value={profileInfo?.title} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors?.title && <p className="text-xs text-red-500 pt-1 font-semibold">{errors?.title}</p>}
                </div>
              </div>   
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Short Bio<span className="text-xs text-red-500 px-1">*</span></label>
                  <input  type="text" data-id="setting" name="brief" value={profileInfo?.brief} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors?.brief && <p className="text-xs text-red-500 pt-1 font-semibold">{errors?.brief}</p>}
                </div>
              </div>         
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Consultation Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Consultation Fees<span className="text-xs text-red-500 px-1">*</span></label>
                  <input  type="number" min={0} data-id="setting" name="fees" value={profileInfo?.fees} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors?.fees && <p className="text-xs pt-1 font-semibold text-red-500 ">{errors?.fees}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Start Time<span className="text-xs text-red-500 px-1">*</span></label>
                  <TimePicker  name="startTime" nested="nested" id="startTime" setTime={handleStartTime} selectedHours={profileInfo?.startTime?.hours} selectedMins={profileInfo?.startTime?.minutes}/>
                  {errors?.startTime && <h6 className="text-xs  pt-1 font-semibold text-red-500 ">{errors?.startTime}</h6>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">End Time<span className="text-xs text-red-500 px-1">*</span></label>
                  <TimePicker data-nested="nested" name="endTime" nested="nested" id="endTime" setTime={handleEndTime} selectedHours={profileInfo?.endTime?.hours} selectedMins={profileInfo?.endTime?.minutes}/>
                </div>
              </div>             
              <div className="w-full lg:w-6/12 px-4 mt-3">
                <div className="relative w-full mb-3">
                  <button  className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="submit" onClick={updateProfile}>Update</button>
                </div>
              </div>          
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />        
          </form> 
        </>
    )
}

export default CardSettingsForm
