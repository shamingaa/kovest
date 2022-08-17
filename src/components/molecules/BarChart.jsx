import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { appContext } from "../template/Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




export function BaaChaat() {
  const [user, balance, themeCheck, loading, error, token, goalsShare] =
  useContext(appContext);
  const [goals, setGoals] = goalsShare;

  let totalTarget = goals
  .map(({ amount_to_save }) => amount_to_save)
  .reduce((currentvalue, laterValue) => currentvalue + laterValue, 0);

  let totalSaved = goals
  .map(({ amount_saved }) => amount_saved)
  .reduce((currentvalue, laterValue) => currentvalue + laterValue, 0);

 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Goal vs Current Savings",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Savings Goal",
        data: [0, 0, 0, 0, 0, 0, 0, totalTarget],
        backgroundColor: "#5F99CB",
      },
      {
        label: "Current Savings",
        data: [0, 0, 0, 0, 0, 0, 0, totalSaved],
        backgroundColor: "#77D0D8",
      },
    ],
  };

  return <Bar options={options} data={data} height={102} />;
}
