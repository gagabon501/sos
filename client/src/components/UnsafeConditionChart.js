import StatsChart from "./StatsChart";

export default function UnsafeConditionChart() {
  const COLORS = [
    "#4169e1",
    "#FFE5B4",
    "#0000FF",
    "#FFC0CB",
    "#36454F",
    "#6447A6",
    "#FFAA00",
    "#32CD32",
    "#ba578c",
    "#9e3a44",
  ];

  const url = "/api/sos/stats1";
  return <StatsChart color={COLORS} url={url} text="By Unsafe Conditions" />;
}
