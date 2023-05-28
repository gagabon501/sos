import StatsChart from "./StatsChart";
import randomColor from "../helpers/randomColor";
export default function UnsafeActs() {
  let COLORS = [];
  for (let i = 0; i < 8; i++) {
    COLORS.push(randomColor());
  }
  console.log(COLORS);

  const url = "/api/sos/stats2";
  return <StatsChart color={COLORS} url={url} text="By Unsafe Acts" />;
}
