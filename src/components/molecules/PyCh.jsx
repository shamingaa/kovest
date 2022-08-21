import { useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { appContext } from "../template/Layout";

const PyCh = () => {
  const [user, balance, themeCheck, loading, error, token, goalsShare] =
    useContext(appContext);
  const [goals, setGoals] = goalsShare;

  let totalTarget = goals
    .map(({ amount_to_save }) => amount_to_save)
    .reduce((currentvalue, laterValue) => currentvalue + laterValue, 0);

  let totalSaved = goals
    .map(({ amount_saved }) => amount_saved)
    .reduce((currentvalue, laterValue) => currentvalue + laterValue, 0);

  return (
    <div className="pych">
      <PieChart
        data={
          totalTarget === 0
            ? [{ title: "Savings Goal", value: 100, color: "#BFC5D1" }]
            : [
                { title: "Savings Goal", value: totalTarget, color: "#033D71" },
                {
                  title: "Current Savings",
                  value: totalSaved,
                  color: "#F12760",
                },
              ]
        }
        lineWidth={50}
        radius={PieChart.defaultProps.radius - 7}
        segmentsShift="1"
      />
    </div>
  );
};

export default PyCh;
