import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function SosChart() {
  const COLORS = [
    "#0088FE",
    "#A6479D",
    "#FFBB28",
    "#FF8042",
    "#47a66b",
    "#6447A6",
    "#a67847",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}% `}
      </text>
    );
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/sos/stats");
        console.log("Client side: ", response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
        // setError(err.response.data.msg);
      }
    };

    fetchStats();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Legend verticalAlign="bottom" layout="horizontal" />

        <text
          x={200}
          y={0}
          dominantBaseline="hanging"
          fontSize="36"
          fontWeight="bold"
        >
          By Observation Type
        </text>

        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
