
import Time from "./Time"

function TimePicker({setTime}) {

    const optionsHours = [];
    const optionsMinutes = [];
    for (let i=1;i<=12;i++){
        let min = i < 10 ? '0'+i : i;
        optionsHours.push(min)
    }
    for (let i=0;i<=59;i++){
        let min = i < 10 ? '0'+i : i;
        optionsMinutes.push(min)
    }
    return (
       <div>
            <div className="inline-flex text-lg border rounded-md shadow-lg p-2">
                <Time options={optionsHours} setTime={setTime} name="hours" />               
                <span className="px-3">:</span>
                <Time options={optionsMinutes} setTime={setTime} name="minutes"/>              
                <select name="period" className="pl-2 pr-9 outline-none appearance-none bg-transparent border-none"
                onChange={(e)=>setTime(e)}
                >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
                </select>
            </div>
        </div>
    )
}
export default TimePicker
