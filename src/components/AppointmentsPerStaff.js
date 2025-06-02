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

export default function AppointmentsPerStaff() {
    const [data, setData] = useState([]);
    const [range, setRange] = useState("next 4 weeks");

    useEffect(() => {
        const query = {
            measures: ["appointments.count"],
            dimensions: ["appointments.staff_name", "appointments.price"],
            timeDimensions: [
                {
                    dimension: "appointments.date",
                    dateRange: range,
                },
            ],
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Scheduled", "Completed"],
                },
            ],
        };

        console.log("AppointmentsPerStaff:", query);

        axios
            .post(
                CUBE_API_URL,
                { query: query },
                {
                    headers: { Authorization: `Bearer ${CUBE_API_TOKEN}` },
                }
            )
            .then(({ data: { data } }) => {
                const summary = {};
                data.forEach(row => {
                    const staff = row["appointments.staff_name"];
                    const count = +row["appointments.count"];
                    summary[staff] = (summary[staff] || 0) + count;
                });
                setData(Object.entries(summary).map(([staff, count]) => ({ staff, count })));
            })
            .catch(() => setData([]));
    }, [range]);

    return (
        <div style={{ textAlign: "center", padding: 20 }}>
            <h3>Appointments Per Staff</h3>
            <div style={{ marginBottom: 16 }}>
                {ranges.map(r => (
                    <button
                        key={r.value}
                        onClick={() => setRange(r.value)}
                        style={{
                            margin: "0 4px",
                            padding: "4px 8px",
                            background: r.value === range ? "#43A047" : "#eee",
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
                        <YAxis dataKey="staff" type="category" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#43A047" isAnimationActive />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
