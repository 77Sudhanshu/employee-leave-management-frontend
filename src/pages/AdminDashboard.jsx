import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getDashboardStats } from "../services/dashboardService";
import "./AdminDashboard.css";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import RecentLeaveRequests from "../components/dashboard/RecentLeaveRequests";

import {
    FaUsers,
    FaClock,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement
);

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalEmployees: 0,
        pendingLeaves: 0,
        approvedLeaves: 0,
        rejectedLeaves: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboardStats();

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const pieData = {
        labels: ["Pending", "Approved", "Rejected"],
        datasets: [
            {
                data: [
                    stats.pendingLeaves,
                    stats.approvedLeaves,
                    stats.rejectedLeaves
                ],
                backgroundColor: [
                    "#ffc107",
                    "#198754",
                    "#dc3545"
                ]
            }
        ]
    };

    const barData = {
        labels: ["Pending", "Approved", "Rejected"],
        datasets: [
            {
                label: "Leave Requests",
                data: [
                    stats.pendingLeaves,
                    stats.approvedLeaves,
                    stats.rejectedLeaves
                ],
                backgroundColor: [
                    "#ffc107",
                    "#198754",
                    "#dc3545"
                ]
            }
        ]
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (

        <DashboardLayout>

            <h2 className="mb-4">
                Admin Dashboard
            </h2>

            <div className="row g-4">

                <div className="col-md-3">

                    <div className="card dashboard-card employee-card">

                        <div className="card-body text-center">

                            <FaUsers size={40} className="text-primary mb-3" />

                            <h5>Total Employees</h5>

                            <h2>{stats.totalEmployees}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card dashboard-card pending-card">

                        <div className="card-body text-center">

                            <FaClock size={40} className="text-warning mb-3" />

                            <h5>Pending Leaves</h5>

                            <h2>{stats.pendingLeaves}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card dashboard-card approved-card">

                        <div className="card-body text-center">

                            <FaCheckCircle size={40} className="text-success mb-3" />

                            <h5>Approved Leaves</h5>

                            <h2>{stats.approvedLeaves}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card dashboard-card rejected-card">

                        <div className="card-body text-center">

                            <FaTimesCircle size={40} className="text-danger mb-3" />

                            <h5>Rejected Leaves</h5>

                            <h2>{stats.rejectedLeaves}</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row mt-5">

                <div className="col-lg-6">

                    <div className="card shadow p-4">

                        <h4 className="text-center mb-4">
                            Leave Status Distribution
                        </h4>

                        <Pie data={pieData} />

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow p-4">

                        <h4 className="text-center mb-4">
                            Leave Statistics
                        </h4>

                        <Bar
                            data={barData}
                            options={barOptions}
                        />

                    </div>

                </div>

            </div>

            <div className="mt-5">
    <RecentLeaveRequests />
</div>

        </DashboardLayout>

    );

}

export default AdminDashboard;