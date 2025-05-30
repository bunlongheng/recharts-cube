import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const CUBE_API_URL = "http://localhost:4000/cubejs-api/v1/load";
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

export default function AppointmentsByType() {
    const [data, setData] = useState([]);
    const [range, setRange] = useState("next 4 weeks");

    useEffect(() => {
        const query = {
            measures: ["appointments.count"],
            dimensions: ["appointments.type", "appointments.price"],
            timeDimensions: [
                {
                    dimension: "appointments.date",
                    dateRange: range,
                },
            ],
        };

        console.log("Cube Query:", query);

        axios
            .post(
                CUBE_API_URL,
                { query },
                {
                    headers: { Authorization: `Bearer ${CUBE_API_TOKEN}` },
                }
            )
            .then(({ data: { data } }) => {
                const summary = {};
                data.forEach(row => {
                    const type = row["appointments.type"];
                    const count = +row["appointments.count"];
                    summary[type] = (summary[type] || 0) + count;
                });
                setData(Object.entries(summary).map(([type, count]) => ({ type, count })));
            })
            .catch(() => setData([]));
    }, [range]);

    return (
        <div style={{ textAlign: "center", padding: 20 }}>
            <h3>Appointments by Type</h3>
            <div style={{ marginBottom: 16 }}>
                {ranges.map(r => (
                    <button
                        key={r.value}
                        onClick={() => setRange(r.value)}
                        style={{
                            margin: "0 4px",
                            padding: "4px 8px",
                            background: r.value === range ? "#1E88E5" : "#eee",
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
                    <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="type" type="category" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#1E88E5" isAnimationActive />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
