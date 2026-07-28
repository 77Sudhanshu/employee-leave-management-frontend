import { useEffect, useState } from "react";
import { getRecentLeaveRequests } from "../../services/leaveRequestService";

function RecentLeaveRequests() {

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        loadRecentLeaves();
    }, []);

    async function loadRecentLeaves() {
        try {
            const response = await getRecentLeaveRequests();
            setLeaves(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const badgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "bg-success";
            case "rejected":
                return "bg-danger";
            default:
                return "bg-warning text-dark";
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Recent Leave Requests</h5>
            </div>

            <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">

                    <thead className="table-light">
                        <tr>
                            <th>Employee</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {leaves.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No recent leave requests found.
                                </td>
                            </tr>
                        ) : (

                            leaves.map((leave) => (

                                <tr key={leave.id}>

                                    <td>{leave.employee?.fullName}</td>

                                    <td>{leave.leaveType}</td>

                                    <td>{leave.startDate}</td>

                                    <td>{leave.endDate}</td>

                                    <td>
                                        <span className={`badge ${badgeClass(leave.status)}`}>
                                            {leave.status}
                                        </span>
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default RecentLeaveRequests;