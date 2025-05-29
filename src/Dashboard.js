import React from "react";
import AppointmentsByStatus from "./components/AppointmentsByStatus";
import AppointmentsPerStaff from "./components/AppointmentsPerStaff";
import AppointmentsCustomerTypes from "./components/AppointmentsCustomerTypes";

export default function Dashboard() {
    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ textAlign: "center", marginBottom: 40 }}>Appointments Dashboard</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 40 }}>
                <div style={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
                    <AppointmentsByStatus />
                </div>
                <div style={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
                    <AppointmentsPerStaff />
                </div>

                <div style={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
                    <AppointmentsCustomerTypes />
                </div>
            </div>
        </div>
    );
}
