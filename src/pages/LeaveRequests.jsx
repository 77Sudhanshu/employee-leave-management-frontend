import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { toast } from "react-toastify";
import {
    getLeaveRequests,
    approveLeave,
    rejectLeave,
    downloadCertificate
} from "../services/leaveRequestService";

const role = localStorage.getItem("role");

function LeaveRequests() {

    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        loadLeaveRequests();
    }, []);

    const loadLeaveRequests = async () => {
        try {
            const response = await getLeaveRequests();
            setLeaveRequests(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveLeave(id);

            toast.success("Leave Approved Successfully!");

            loadLeaveRequests();

        } catch (error) {

            console.error(error);

            toast.error("Failed to approve leave.");
        }
    };

    const handleReject = async (id) => {

        try {

            await rejectLeave(id);

            toast.success("Leave Rejected Successfully!");

            loadLeaveRequests();

        } catch (error) {

            console.error(error);

            toast.error("Failed to reject leave.");
        }
    };

    const handleDownload = async (id) => {

        try {

            const response = await downloadCertificate(id);

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "Medical_Certificate";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(error);

            toast.error("Failed to download certificate.");
        }
    };

    return (

        <DashboardLayout>

            <h2 className="mb-4">Leave Requests</h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Certificate</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {leaveRequests.map((leave) => (

                        <tr key={leave.id}>

                            <td>{leave.id}</td>

                            <td>
                                {leave.employee
                                    ? leave.employee.fullName
                                    : "N/A"}
                            </td>

                            <td>{leave.leaveType}</td>

                            <td>{leave.startDate}</td>

                            <td>{leave.endDate}</td>

                            <td>
                                <span
                                    className={`badge ${
                                        leave.status?.toLowerCase() === "approved"
                                            ? "bg-success"
                                            : leave.status?.toLowerCase() === "rejected"
                                            ? "bg-danger"
                                            : "bg-warning text-dark"
                                    }`}
                                >
                                    {leave.status}
                                </span>
                            </td>

                            <td>
                                {leave.medicalCertificate ? (
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => handleDownload(leave.id)}
                                    >
                                        📄 Download
                                    </button>
                                ) : (
                                    <span className="text-muted">
                                        No File
                                    </span>
                                )}
                            </td>

                            <td>

                                {(role === "ADMIN" || role === "ROLE_ADMIN") &&
                                    leave.status?.toLowerCase() === "pending" && (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    handleApprove(leave.id)
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleReject(leave.id)
                                                }
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </DashboardLayout>

    );
}

export default LeaveRequests;