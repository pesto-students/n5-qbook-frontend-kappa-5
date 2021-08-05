import React,{useEffect, useState} from "react";
import { Bar } from "react-chartjs-2";

export default function CardBarChart() {
  const [chartData,setChartData] = useState({});
  const chart = () =>{
    let empSal = [];
    //let empAge = [];
    // axios
    //   .get("http://dummy.restapiexample.com/api/v1/employees")
    //   .then(res => {
    //     console.log(res);
    //     for (const dataObj of res.data.data) {
    //       empSal.push(parseInt(dataObj.employee_salary));
    //       empAge.push(parseInt(dataObj.employee_age));
    //     }
    setChartData({
      labels:["monday","tuesday","wednesday","thursday","friday"],
      datasets:[
        {
          label:"Appointments",
          data:[32,45,12,76,69],

          borderWidth:1,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 0.6)",
          barThickness: 8,
        }
      ]
    });
    
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-700 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Appointments
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
          <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins:{            
            legend: {
              position:'bottom',
              labels:{
              color: "rgba(0,0,0,.4)",
              }
            }},
            scales: {
              y: 
                {                  
                  ticks: {
                    color: "rgba(0,0,0,.4)",
                    beginAtZero: true
                  },
                  display: true,                  
                  grid: {
                    drawBorder: false,
                    color: "rgba(0,0,0,.4)",
              },
                }
              ,
              x: 
                {
                  ticks: {
                    color: "rgba(0,0,0,.4)",
                  },
                  display: true,
                  grid: {
                    display: false,
              },
                }
              
            }
          }}
        />
          </div>
        </div>
      </div>
    </>
  );
}
