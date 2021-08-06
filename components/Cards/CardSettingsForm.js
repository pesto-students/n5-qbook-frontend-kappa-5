
import TimePicker from "components/Sidebar/TimePicker";

function CardSettingsForm({updateProfile,profileInfo,handleInput,errors}) {
    return (
        <>
           <form onSubmit={updateProfile}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Doctor Information</h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Preferred Name</label>
                  <input  type="text" data-id="record" name="firstname" value={profileInfo?.record.firstname} required className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                     
                     onChange={handleInput}/>
                     {errors?.name && <p className="text-xs text-red-600 px-2">{errors?.name}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Specialization</label>
                  <input  type="text" data-id="setting"  name="title" value={profileInfo?.setting.title} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors?.specialization && <p className="text-xs text-red-600 px-2">{errors?.specialization}</p>}
                </div>
              </div>           
            </div>
            <hr className="mt-4 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Consultation Information</h6>
            <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Short Bio</label>
                  <input  type="text" data-id="setting" name="brief" value={profileInfo?.setting.brief} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors?.maxAppointments && <p className="text-xs text-red-600 px-2">{errors?.maxAppointments}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label  className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Consultation Fees</label>
                  <input  type="number" data-id="setting" name="fees" value={profileInfo?.setting.fees} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleInput}/>
                    {errors?.fees && <p className="text-xs text-red-600 px-2">{errors?.fees}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Start Time</label>
                  <TimePicker  name="startTime" nested="nested" id="startTime" setTime={handleInput}/>
                  {errors.startTime && <h6 className="text-xs text-red-600 px-2">{errors.startTime}</h6>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">End Time</label>
                  <TimePicker data-nested="nested" name="endTime" nested="nested" id="endTime" setTime={handleInput}/>
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
