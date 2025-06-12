import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const CUBE_API_URL = process.env.REACT_APP_CUBE_API_URL;
const CUBE_API_TOKEN = process.env.REACT_APP_CUBEJS_API_TOKEN;

const ranges = [
    { label: "7D", value: "last 7 days" },
    { label: "4W", value: "last 4 weeks" },
    { label: "12W", value: "last 12 weeks" },
    { label: "6M", value: "last 6 months" },
    { label: "12M", value: "last 12 months" },
    { label: "36M", value: "last 36 months" },
    { label: "Next 4W", value: "next 4 weeks" },
];

export default function CubeChart({
    title,
    measure,
    dimension,
    timeDimension,
    chartType = "bar",
    color = "#3949AB",
    layout = "horizontal", // or 'vertical'
    transformData = null, // optional post-processing function
}) {
    const [data, setData] = useState([]);
    const [range, setRange] = useState("last 36 months");

    useEffect(() => {
        const query = {
            measures: [measure],
            dimensions: [dimension],
            timeDimensions: [
                {
                    dimension: timeDimension,
                    granularity: "day",
                    dateRange: range,
                },
            ],
        };

        axios
            .post(CUBE_API_URL, { query }, { headers: { Authorization: `Bearer ${CUBE_API_TOKEN}` } })
            .then(({ data: { data } }) => {
                if (transformData) {
                    setData(transformData(data));
                } else {
                    setData(data);
                }
            })
            .catch(() => setData([]));
    }, [measure, dimension, timeDimension, range, transformData]);

    const dataKey = measure.split(".")[1];
    const xKey = dimension.split(".")[1];

    const Chart = chartType === "line" ? LineChart : BarChart;
    const ChartElement = chartType === "line" ? <Line type="monotone" dataKey="count" stroke={color} /> : <Bar dataKey="count" fill={color} isAnimationActive />;

    return (
        <div style={{ textAlign: "center", padding: 20 }}>
            <h3>{title}</h3>
            <div style={{ marginBottom: 16 }}>
                {ranges.map(r => (
                    <button
                        key={r.value}
                        onClick={() => setRange(r.value)}
                        style={{
                            margin: "0 4px",
                            padding: "4px 8px",
                            background: r.value === range ? color : "#eee",
                            color: r.value === range ? "#fff" : "#000",
                            border: "none",
                            borderRadius: 4,
                            cursor: "pointer",
                        }}
                    >
                        {r.label}
                    </button>
                ))}
            </div>

            {data.length === 0 ? (
                <div style={{ color: "#666", marginTop: 50 }}>No data</div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <Chart data={data} layout={layout} margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        {layout === "vertical" ? (
                            <>
                                <XAxis type="number" />
                                <YAxis dataKey="status" type="category" />
                            </>
                        ) : (
                            <>
                                <XAxis dataKey="status" />
                                <YAxis />
                            </>
                        )}
                        <Tooltip />
                        {ChartElement}
                    </Chart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
