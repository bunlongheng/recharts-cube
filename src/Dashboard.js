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
        },
        {
            title: "Appointments by Staff",
            measure: "appointments.count",
            dimension: "appointments.staffName",
            timeDimension: "appointments.date",
            chartType: "bar",
        },
        {
            title: "Appointments by Customer Type",
            measure: "appointments.count",
            dimension: "appointments.customerType",
            timeDimension: "appointments.date",
            chartType: "bar",
        },
        {
            title: "Appointments by Type",
            measure: "appointments.count",
            dimension: "appointments.type",
            timeDimension: "appointments.date",
            chartType: "bar",
        },
        {
            title: "Cancelled Appointments",
            measure: "appointments.cancelledCount", // or use a filter variant if needed
            dimension: "appointments.date",
            timeDimension: "appointments.date",
            chartType: "line",
        },
        {
            title: "Rescheduled Appointments",
            measure: "appointments.rescheduledCount", // or adapt to your schema
            dimension: "appointments.date",
            timeDimension: "appointments.date",
            chartType: "line",
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
