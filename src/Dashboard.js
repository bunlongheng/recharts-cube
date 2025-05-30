import React from "react";
import AppointmentsByStatus from "./components/AppointmentsByStatus";
import AppointmentsPerStaff from "./components/AppointmentsPerStaff";
import AppointmentsCustomerTypes from "./components/AppointmentsCustomerTypes";
import AppointmentsByType from "./components/AppointmentsByType";
import CancelledAppointments from "./components/CancelledAppointments";
import RescheduledAppointments from "./components/RescheduledAppointments";

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

                <div style={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
                    <AppointmentsByType />
                </div>

                <div style={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
                    <CancelledAppointments />
                </div>

                <div style={{ flex: 1, minWidth: 400, maxWidth: 600 }}>
                    <RescheduledAppointments />
                </div>
            </div>
        </div>
    );
}
