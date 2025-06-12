import React from "react";
import CubeChart from "./components/CubeChart";

export default function Dashboard() {
    const chartConfigs = [
        {
            title: "Appointments by Status",
            measure: "appointments.count",
            dimension: "appointments.status",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "vertical",
        },
        {
            title: "Appointments by Staff (Next 4 Weeks)",
            measure: "appointments.count",
            dimension: "appointments.staff_name",
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "horizontal",
            transformData: null,
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
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Scheduled"],
                },
            ],
        },
        {
            title: "Appointments by Type and Price",
            measure: "appointments.count",
            dimension: "appointments.type", // only showing type (price used in query but not chart axis)
            timeDimension: "appointments.date",
            chartType: "bar",
        },
        {
            title: "Cancelled Appointments",
            measure: "appointments.count",
            dimension: "appointments.date",
            timeDimension: "appointments.date",
            chartType: "line",
            layout: "horizontal",
            filters: [
                {
                    dimension: "appointments.status",
                    operator: "equals",
                    values: ["Cancelled"],
                },
            ],
        },
        {
            title: "Completed Appointments (by Staff + Price)",
            measure: "appointments.count",
            dimension: "appointments.staff_name", // only one axis shown; price used in query
            timeDimension: "appointments.date",
            chartType: "bar",
            layout: "horizontal",
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
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 40 }}>
                {chartConfigs.map((cfg, idx) => (
                    <div key={idx} style={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
                        <CubeChart {...cfg} />
                    </div>
                ))}
            </div>
        </div>
    );
}
