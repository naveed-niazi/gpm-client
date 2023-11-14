import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "right",
    },
  },
};

const data = {
  labels: ["Completed", "In Process", "Pending"],
  datasets: [
    {
      label: " # of Orders",
      data: [100, 10, 5],
      backgroundColor: ["#52c41a", "#ffb901", "#607d8b40"],
      borderColor: ["#ffff"],
      borderWidth: 2,
      hoverBackgroundColor: ["#469a15", "#e6a701", "#607d8b"],
      offset: 25,
      spacing: 2,
      cutout: 55,
    },
  ],
};

export default function OrderStatistics() {
  return (
    <div className="canvas">
      <Doughnut data={data} options={options} height={200} />
    </div>
  );
}
