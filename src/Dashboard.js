import React from "react";
import CubeChart from "./components/CubeChart";

// Define color themes
const chartThemes = {
    default: "#3949AB",
    business: "#4E73DF",
    healthcare: "#1CC88A",
    warning: "#F6C23E",
    danger: "#E74A3B",
    secondary: "#858796",
};

export default function Dashboard() {
    const chartConfigs = [
        {
            title: "Appointments by Status",
            measure: "appointments.count",
            dimension: "appointments.status",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "vertical",
            defaultRange: "last 12 months", // Custom default range
            color: chartThemes.business, // Custom color
            transformData: rows => {
                const summary = {};
                rows.forEach(row => {
                    const key = row["appointments.status"];
                    const val = +row["appointments.count"];
                    summary[key] = (summary[key] || 0) + val;
                });
                return Object.entries(summary).map(([status, count]) => ({ status, count }));
            },
        },
        {
            title: "Appointments by Staff",
            measure: "appointments.count",
            dimension: "appointments.staff_name",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "horizontal",
            defaultRange: "next 4 weeks", // Different default
            color: chartThemes.healthcare,
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Scheduled", "Completed"],
                },
            ],
        },
        {
            title: "Appointments by Customer Status",
            measure: "appointments.count",
            dimension: "appointments.customer_status",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "horizontal",
            defaultRange: "last 12 months",
            color: chartThemes.secondary,
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Scheduled"],
                },
            ],
        },
        {
            title: "Appointments by Type",
            measure: "appointments.count",
            dimension: "appointments.type",
            timeDimension: "appointments.date",
            chartType: "bar",
            defaultRange: "last 12 months",
            color: chartThemes.default,
        },
        {
            title: "Cancelled Appointments",
            measure: "appointments.count",
            dimension: "appointments.date",
            timeDimension: "appointments.date",
            chartType: "line",
            layout: "horizontal",
            defaultRange: "last 12 months",
            color: chartThemes.danger,
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Cancelled"],
                },
            ],
        },
        {
            title: "Completed Appointments",
            measure: "appointments.count",
            dimension: "appointments.staff_name",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "horizontal",
            defaultRange: "last 4 weeks",
            color: chartThemes.warning,
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Completed"],
                },
            ],
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    gap: 40,
                    backgroundColor: "#f8f9fc", // Light background
                    padding: "20px",
                    borderRadius: "8px",
                }}
            >
                {chartConfigs.map((cfg, idx) => (
                    <div
                        key={idx}
                        style={{
                            flex: 1,
                            minWidth: 400,
                            maxWidth: 600,
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            padding: "15px",
                        }}
                    >
                        <CubeChart {...cfg} />
                    </div>
                ))}
            </div>
        </div>
    );
}
