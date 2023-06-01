import StatsChart from "./StatsChart";
import randomColor from "../helpers/randomColor";

export default function SosChart() {
  let COLORS = [];
  for (let i = 0; i < 7; i++) {
    COLORS.push(randomColor());
  }
  console.log(COLORS);

  const url = "/api/sos/stats";
  return (
    <StatsChart
      color={COLORS}
      url={url}
      text="By Observation Type"
      offset={120}
    />
  );
}
