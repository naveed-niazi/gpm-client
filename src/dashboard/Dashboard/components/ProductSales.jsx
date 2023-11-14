import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import moment from "moment";
import { PRODUCT_SALES } from "../../../utils/samples/product-sales";
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
let delayed;
const options = {
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
  },
  scales: {
    x: {
      title: { text: "Total Sales in last month", display: true },
      type: "time",
      time: {
        unit: "day",
      },
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 15,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
};

export const data = {
  datasets: [
    {
      fill: true,
      data: PRODUCT_SALES,
      borderColor: "#ffb901",
      pointBorderWidth: 1,
      pointRadius: 3,
      pointBorderColor: "#90a4ae",
      pointBackgroundColor: "#ffff",
      backgroundColor: "#ffb90140",
    },
  ],
};

export default function ProductSales() {
  return (
    <div className="canvas">
      <Line options={options} data={data} height={200} />
    </div>
  );
}
