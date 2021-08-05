import Chart from "components/Sidebar/Chart";
import React,{useEffect, useState} from "react";
export default function CardLineChart() {
  const [chartData,setChartData] = useState({});
  let weekLabels = ["monday","tuesday","wednesday","thursday","friday"];
  const [selectedChart,setSelectedChart] = useState(weekLabels);
  const [chartType,setChartType] = useState("");
  // const chart = () =>{
  //   let empSal = [];
  //   //let empAge = [];
  //   // axios
  //   //   .get("")
  //   //   .then(res => {
  //   //     console.log(res);}
  // useEffect(() => {
  //   chart();
  // }, []);
useEffect(() => {
  setChartData({
    labels:selectedChart,
    datasets:[
      {
        //label:"Weekly",
        data:[32,45,12,76,69],
        borderWidth:1,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        barThickness: 8,
      },      
    ]
  }); 
  }, [selectedChart]);
  const handleChartData =(e) =>{
    let weekLabels = ["monday","tuesday","wednesday","thursday","friday"];
    let monthLabels = ["Jan","Feb","Mar","Apr","May"];
    const yearLabels=["2000","2001","2002","2003","2004"];
    e.target.style.color = "yellow"
    if(e.target.name==='weekly'){
         setSelectedChart(weekLabels);
    }
      else if(e.target.name==='monthly'){
         setSelectedChart(monthLabels);
      }
      else if(e.target.name==='yearly'){
         setSelectedChart(yearLabels);  
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
        className="text-white text-xs uppercase py-3 font-bold block border-none outline-none" 
        onClick={handleChartData}>Weekly</button>
        <button name="monthly" className="text-white text-xs uppercase py-3 font-bold block" onClick={handleChartData}>Monthly</button>
        <button name="yearly" className="text-white text-xs uppercase py-3 font-bold block" onClick={handleChartData}>Yearly</button>
        </div>
          {/* Chart */}
          <div className="relative h-350-px">
          <Chart chartData={chartData} selectedChart={selectedChart}/>        
          </div>
        </div>
      </div>
    </>
  );
}
