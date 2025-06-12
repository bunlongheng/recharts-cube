import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ResponsiveContainer, BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const CUBE_API_URL = process.env.REACT_APP_CUBE_API_URL;
const CUBE_API_TOKEN = process.env.REACT_APP_CUBEJS_API_TOKEN;

const ranges = [
    { label: "7D", value: "last 7 days" },
    { label: "4W", value: "last 4 weeks" },
    { label: "12W", value: "last 12 weeks" },
    { label: "6M", value: "last 6 months" },
    { label: "12M", value: "last 12 months" },
    { label: "Next 4W", value: "next 4 weeks" },
];

export default function CubeChart({
    title,
    measure,
    dimension,
    timeDimension,
    chartType = "bar",
    color = "#3949AB",
    layout = "horizontal",
    transformData = null,
    filters = [],
    defaultRange = "next 4 weeks", // New prop for default range
}) {
    const [data, setData] = useState([]);
    const [range, setRange] = useState(defaultRange); // Use the prop as default

    const measureKey = measure?.split(".")[1] || "value";
    const dimensionKey = dimension?.split(".")[1] || "label";

    const memoizedTransformData = useCallback(transformData, [transformData]);

    useEffect(() => {
        const source = axios.CancelToken.source();

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
            filters,
        };

        axios
            .post(
                CUBE_API_URL,
                { query },
                {
                    headers: { Authorization: `Bearer ${CUBE_API_TOKEN}` },
                    cancelToken: source.token,
                }
            )
            .then(({ data: { data } }) => {
                if (memoizedTransformData) {
                    setData(memoizedTransformData(data));
                } else {
                    const normalized = data.map(row => ({
                        [dimensionKey]: row[dimension],
                        [measureKey]: row[measure],
                    }));
                    setData(normalized);
                }
            })
            .catch(err => {
                if (!axios.isCancel(err)) {
                    setData([]);
                }
            });

        return () => source.cancel("Component unmounted");
    }, [measure, dimension, timeDimension, range, memoizedTransformData, JSON.stringify(filters)]);

    const ChartComponent = chartType === "line" ? LineChart : BarChart;
    const ChartElement = chartType === "line" ? <Line type="monotone" dataKey={measureKey} stroke={color} strokeWidth={2} /> : <Bar dataKey={measureKey} fill={color} radius={[4, 4, 0, 0]} />;

    return (
        <div style={{ textAlign: "center" }}>
            <h3 style={{ color: color, marginBottom: "15px" }}>{title}</h3>
            <div style={{ marginBottom: 16 }}>
                {ranges.map(r => (
                    <button
                        key={r.value}
                        onClick={() => setRange(r.value)}
                        style={{
                            margin: "0 4px",
                            padding: "4px 8px",
                            background: r.value === range ? color : "#f0f0f0",
                            color: r.value === range ? "white" : "#555",
                            border: "none",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: r.value === range ? "bold" : "normal",
                            transition: "all 0.2s",
                        }}
                    >
                        {r.label}
                    </button>
                ))}
            </div>

            {data.length === 0 ? (
                <div style={{ color: "#999", marginTop: 50, fontStyle: "italic" }}>Loading data...</div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <ChartComponent data={data} layout={layout} margin={{ top: 20, right: 30, left: layout === "vertical" ? 20 : 100, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <Legend />
                        {layout === "vertical" ? (
                            <>
                                <XAxis type="number" tick={{ fill: "#666" }} />
                                <YAxis dataKey={dimensionKey} type="category" width={80} tick={{ fill: "#666" }} />
                            </>
                        ) : (
                            <>
                                <XAxis dataKey={dimensionKey} tick={{ fill: "#666" }} />
                                <YAxis tick={{ fill: "#666" }} />
                            </>
                        )}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: `1px solid ${color}`,
                                borderRadius: "4px",
                            }}
                        />
                        {ChartElement}
                    </ChartComponent>
                </ResponsiveContainer>
            )}
        </div>
    );
}
