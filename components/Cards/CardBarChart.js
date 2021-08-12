import React,{useEffect, useState} from "react";

import BarChart from "components/Sidebar/BarChart";

export default function CardBarChart() {
  const [chartData,setChartData] = useState({});
  let weekLabels = ["monday","tuesday","wednesday","thursday","friday"];
  const [selectedChart,setSelectedChart] = useState(weekLabels);
  const [chartFrequency,setChartFrequency] = useState("");
  useEffect(() => {
    setChartData({
      labels:selectedChart,
      datasets:[
        {
          data:[32,45,12,76,69],
          borderWidth:1,
          backgroundColor:  "rgba(75, 192, 192, 0.6)",
          borderColor:  "rgba(75, 192, 192, 0.6)",
          barThickness: 8,
        },      
      ]
    }); 
    }, [selectedChart]);
    useEffect(() => {
      //chart();
      setSelectedChart(weekLabels);
      setChartFrequency('weekly');
    }, []);
    const handleChartData =(e) =>{
      let weekLabels = ["monday","tuesday","wednesday","thursday","friday"];
      let monthLabels = ["Jan","Feb","Mar","Apr","May"];
      const yearLabels=["2000","2001","2002","2003","2004"];
      setChartFrequency(e.target.name)
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
  // const chart = () =>{
  //   setChartData({
  //     labels:["monday","tuesday","wednesday","thursday","friday"],
  //     datasets:[
  //       {
  //         label:"Appointments",
  //         data:[32,45,12,76,69],

  //         borderWidth:1,
  //         backgroundColor: "rgba(75, 192, 192, 0.6)",
  //         borderColor: "rgba(75, 192, 192, 0.6)",
  //         barThickness: 8,
  //       }
  //     ]
  //   });
    
  // };
  // useEffect(() => {
  //   chart();
  // }, []);
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
        <button name="yearly" 
        className={"text-xs uppercase py-3 font-bold block focus:outline-none " +
                      (chartFrequency === "yearly"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-700")
                    }
         onClick={handleChartData}>Yearly</button>
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
