
import Time from "./Time"

function TimePicker({nested,id,setTime,selectedHours,selectedMins}) {

    const optionsHours = [];
    const optionsMinutes = [];
    for (let i=1;i<=24;i++){
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
                <Time options={optionsHours} setTime={setTime} nested={nested} id={id}  name="hours" selected={selectedHours}/>               
                <span className="px-3">:</span>
                <Time options={optionsMinutes} setTime={setTime} nested={nested} id={id} name="minutes" selected={selectedMins}/>              
            </div>
        </div>
    )
}
export default TimePicker
