import React,{useEffect, useState} from "react";
import BarChart from "../Sidebar/BarChart";
export default function CardLineChart(props) {
  const [chartData,setChartData] = useState({});
  const [chartFrequency,setChartFrequency] = useState("");
  const [weeklyDataSet,setWeeklyDataSet] = useState();
  const [weeklyLabels,setWeeklyLabels] = useState();
  const [monthlyDataSet,setMonthlyDataSet] = useState();
  const [monthlyLabels,setMonthlyLabels] = useState();
  useEffect(() => {
    getChartData();
  }, [props])
  const getChartData=async()=>{
      if(props.appointment){
        let arrayFW=[];
        let labelsFW=[];
        let arrayFM=[];
        let labelsFM=[];
        for (const [key, value] of Object.entries(props.appointment)) {
          arrayFW.push(value);
          labelsFW.push(key)
        }
        for (const [key, value] of Object.entries(props.appointmentM)) {
          arrayFM.push(value);
          labelsFM.push(key)
        }
        setChartData({
          labels:labelsFW,
          datasets:[
            {
              data:arrayFW,
              borderWidth:1,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 0.6)",
              barThickness: 8,
            },      
          ]
        }); 
        setWeeklyDataSet(arrayFW);
        setWeeklyLabels(labelsFW);
        setMonthlyDataSet(arrayFM);
        setMonthlyLabels(labelsFM);
      }
     
  
  }
  useEffect(() => {
    setChartFrequency('weekly');
    getChartData();
  }, []);

  const handleChartData =(e) =>{
    setChartFrequency(e.target.name)
    if(e.target.name==='weekly'){
         setChartData({
          labels:weeklyLabels,
          datasets:[
            {
              data:weeklyDataSet,
              borderWidth:1,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 0.6)",
              barThickness: 8,
            },      
          ]
        }); 
    }
      else if(e.target.name==='monthly'){
         setChartData({
          labels:monthlyLabels,
          datasets:[
            {
              data:monthlyDataSet,
              borderWidth:1,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 0.6)",
              barThickness: 8,
            },      
          ]
        }); 
      }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
            <h2 className="text-blueGray-700 text-xl font-semibold">
                Appointments
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
        <div className="p-4 flex justify-evenly">
        <button name="weekly" 
        className={"text-xs uppercase py-3 font-bold block focus:outline-none " +
                      (chartFrequency === "weekly"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-700")
                    }
        onClick={handleChartData}>Weekly</button>
        <button name="monthly" 
        className={"text-xs uppercase py-3 font-bold block focus:outline-none " +
                      (chartFrequency === "monthly"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-700")
                    }
         onClick={handleChartData}>Monthly</button>
        </div>
          {/* Chart */}
          <div className="relative h-350-px">
          <BarChart chartData={chartData}/>        
          </div>
        </div>
      </div>
    </>
  );
}
