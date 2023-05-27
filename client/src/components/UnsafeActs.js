import StatsChart from "./StatsChart";
export default function UnsafeActs() {
  const COLORS = [
    "#0088FE",
    "#A6479D",
    "#FFBB28",
    "#FF8042",
    "#47a66b",
    "#6447A6",
    "#a67847",
  ];

  const url = "/api/sos/stats2";
  return <StatsChart color={COLORS} url={url} text="By Unsafe Acts" />;
}
