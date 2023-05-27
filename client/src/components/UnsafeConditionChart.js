import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

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

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    count,
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
        {`${(percent * 100).toFixed(0)}%-${count}`}
      </text>
    );
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/sos/stats1");
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
    <>
      <ResponsiveContainer>
        <PieChart>
          <Legend verticalAlign="bottom" layout="horizontal" />

          <text
            x={200}
            dominantBaseline="hanging"
            fontSize="36"
            fontWeight="bold"
          >
            By Unsafe Conditions
          </text>

          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
