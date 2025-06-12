import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const CUBE_API_URL = process.env.REACT_APP_CUBE_API_URL;
const CUBE_API_TOKEN = process.env.REACT_APP_CUBEJS_API_TOKEN;

const ranges = [
    { label: "1D", value: "last 1 day" },
    { label: "7D", value: "last 7 days" },
    { label: "4W", value: "last 4 weeks" },
    { label: "12W", value: "last 12 weeks" },
    { label: "6M", value: "last 6 months" },
    { label: "12M", value: "last 12 months" },
    { label: "36M", value: "last 36 months" },
    { label: "Next 4W", value: "next 4 weeks" },
];

export default function AppointmentsCancelled() {
    const [data, setData] = useState([]);
    const [range, setRange] = useState("next 4 weeks");

    useEffect(() => {
        const query = {
            measures: ["appointments.count"],
            timeDimensions: [
                {
                    dimension: "appointments.date",
                    granularity: "day",
                    dateRange: range,
                },
            ],
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Cancelled"],
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
                const formatted = data.map(row => ({
                    date: row["appointments.date"],
                    count: +row["appointments.count"],
                }));
                setData(formatted);
            })
            .catch(() => setData([]));
    }, [range]);

    return (
        <div style={{ textAlign: "center", padding: 20 }}>
            <h3>Cancelled Appointments</h3>
            <div style={{ marginBottom: 16 }}>
                {ranges.map(r => (
                    <button
                        key={r.value}
                        onClick={() => setRange(r.value)}
                        style={{
                            margin: "0 4px",
                            padding: "4px 8px",
                            background: r.value === range ? "#D81B60" : "#eee",
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
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#D81B60" strokeWidth={2} dot />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
