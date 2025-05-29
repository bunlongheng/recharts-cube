import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const CUBE_API_URL = "http://localhost:4000/cubejs-api/v1/load";
const CUBE_API_TOKEN = process.env.REACT_APP_CUBEJS_API_TOKEN;

export default function AppointmentsCustomerTypes() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const query = {
            measures: ["appointments.count"],
            dimensions: ["appointments.customer_status"],
            timeDimensions: [
                {
                    dimension: "appointments.date",
                    dateRange: "next 4 weeks",
                },
            ],
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Scheduled"],
                },
            ],
        };

        axios
            .post(
                CUBE_API_URL,
                { query },
                {
                    headers: { Authorization: `Bearer ${CUBE_API_TOKEN}` },
                }
            )
            .then(({ data: { data } }) => {
                const result = data.map(row => ({
                    type: row["appointments.customer_status"],
                    count: +row["appointments.count"],
                }));
                setData(result);
            })
            .catch(() => setData([]));
    }, []);

    return (
        <div style={{ textAlign: "center", padding: 20 }}>
            <h3>Appointments by Customer Type</h3>
            {data.length === 0 ? (
                <div style={{ color: "#666", marginTop: 50 }}>No data</div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="type" type="category" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#FB8C00" isAnimationActive />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
