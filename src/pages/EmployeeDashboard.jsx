import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getEmail } from "../utils/auth";
import { getEmployeeDashboard } from "../services/employeeService";

function EmployeeDashboard() {

    const [dashboard, setDashboard] = useState({
        fullName: "",
        email: "",
        department: "",
        designation: "",
        totalLeaves: 0,
        approvedLeaves: 0,
        pendingLeaves: 0,
        rejectedLeaves: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getEmployeeDashboard(getEmail());

            console.log(response.data);

            setDashboard(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <h2 className="mb-4 text-center">
                Employee Dashboard
            </h2>

            <div className="row">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h3 className="text-center mb-4">
                            Employee Information
                        </h3>

                        <hr />

                        <h4>
                            <strong>Name:</strong> {dashboard.fullName}
                        </h4>

                        <h4>
                            <strong>Email:</strong> {dashboard.email}
                        </h4>

                        <h4>
                            <strong>Department:</strong> {dashboard.department}
                        </h4>

                        <h4>
                            <strong>Designation:</strong> {dashboard.designation}
                        </h4>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h3 className="text-center mb-4">
                            Leave Summary
                        </h3>

                        <hr />

                        <h4>
                            <strong>Total Leaves:</strong> {dashboard.totalLeaves}
                        </h4>

                        <h4>
                            <strong>Approved:</strong> {dashboard.approvedLeaves}
                        </h4>

                        <h4>
                            <strong>Pending:</strong> {dashboard.pendingLeaves}
                        </h4>

                        <h4>
                            <strong>Rejected:</strong> {dashboard.rejectedLeaves}
                        </h4>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default EmployeeDashboard;