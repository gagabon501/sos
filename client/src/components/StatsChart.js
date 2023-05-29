import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

export default function StatsChart(props) {
  const COLORS = props.color;
  console.log(COLORS);

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
        const response = await axios.get(props.url);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, [props.url]); //included props.url in the depedency since React is giving a warning suggesting to include this in the dependency: 28-May-23

  return (
    <>
      <ResponsiveContainer>
        <PieChart>
          <Legend verticalAlign="bottom" layout="horizontal" />

          <text
            x={props.offset}
            dominantBaseline="hanging"
            fontSize="28"
            fontWeight="bold"
            fill="white" //fill for the chart title
          >
            {props.text}
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
