import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({chartData}) {  
    return (
        <Line
        data={chartData}
        options={{
          responsive: true,        
          plugins:{            
          legend: {
            display:false,
            labels:{
            color: "white",
            }
          }},
          scales: {
            y: 
              {                  
                ticks: {
                  color: "white",
                  beginAtZero: true
                },
                display: true,                  
                grid: {
                  drawBorder: false,
                  color: "#ffffff",
            },
              }
            ,
            x: 
              {
                ticks: {
                  color: "white",
                },
                display: true,
                grid: {
                  display: false,
            },
              }           
          }
        }}
      />
    )
}

export default LineChart
