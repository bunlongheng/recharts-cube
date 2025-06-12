import React from "react";
import CubeChart from "./components/CubeChart";

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
            defaultRange: "last 36 months",
            color: chartThemes.business,
            granularity: "day",
        },
        {
            title: "Appointments Per Staff",
            measure: "appointments.count",
            dimension: "appointments.staff_name",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "horizontal",
            defaultRange: "next 4 weeks",
            color: chartThemes.healthcare,
            granularity: "day",
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
            defaultRange: "next 4 weeks",
            color: chartThemes.secondary,
            granularity: "day",
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
            layout: "horizontal",
            defaultRange: "next 4 weeks",
            color: chartThemes.default,
            granularity: "day",
        },
        {
            title: "Cancelled Appointments",
            measure: "appointments.count",
            dimension: "appointments.date",
            timeDimension: "appointments.date",
            chartType: "line",
            layout: "horizontal",
            defaultRange: "last 36 months",
            color: chartThemes.danger,
            granularity: "day",
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Cancelled"],
                },
            ],
        },
        {
            title: "Rescheduled Appointments",
            measure: "appointments.count",
            dimension: "appointments.staff_name",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "horizontal",
            defaultRange: "last 12 weeks",
            color: chartThemes.warning,
            granularity: "day",
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
                    backgroundColor: "#f8f9fc",
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
