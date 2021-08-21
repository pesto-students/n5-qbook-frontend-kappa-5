import LineChart from "components/Sidebar/LineChart";
import React,{useEffect, useState} from "react";

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
  const getChartData=()=>{
      if(props.finance){
        let arrayFW=[];
        let labelsFW=[];
        let arrayFM=[];
        let labelsFM=[];
        props.finance?.map((item)=>{
          arrayFW.push(item.payment);
          labelsFW.push(item.date)
        })
        props?.financeM?.map((item)=>{
          arrayFM.push(item.payment);
          labelsFM.push(item.month)
        })
        setChartData({
          labels:labelsFW,
          datasets:[
            {
              data:arrayFW,
              borderWidth:1,
              backgroundColor: "#ffffff",
              borderColor: "#ffffff",
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
              backgroundColor: "#ffffff",
              borderColor: "#ffffff",
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
              backgroundColor: "#ffffff",
              borderColor: "#ffffff",
              barThickness: 8,
            },      
          ]
        }); 
      }
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-blueGray-700 w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-white text-xl font-semibold">
                Finances
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
                        : "text-white hover:text-white")
                    }
        onClick={handleChartData}>Weekly</button>
        <button name="monthly" 
        className={"text-xs uppercase py-3 font-bold block focus:outline-none " +
                      (chartFrequency === "monthly"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-white hover:text-white")
                    }
         onClick={handleChartData}>Monthly</button>
        </div>
          {/* Chart */}
          <div className="relative h-350-px">
          <LineChart chartData={chartData}/>        
          </div>
        </div>
      </div>
    </>
  );
}
