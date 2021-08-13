import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({chartData}) {
    return (
        <>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins:{            
            legend: {
              display:false,
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
        </>
    )
}

export default BarChart
