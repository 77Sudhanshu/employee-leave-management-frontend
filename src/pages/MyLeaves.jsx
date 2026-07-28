import { useEffect, useState } from "react";
import { getMyLeaves } from "../services/leaveRequestService";

function MyLeaves() {

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        loadLeaves();
    }, []);

    const loadLeaves = async () => {
        try {
            const response = await getMyLeaves();
            setLeaves(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>My Leave Requests</h3>
                </div>

                <div className="card-body">

                    <table className="table table-bordered">

                        <thead className="table-dark">
                            <tr>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {leaves.map((leave) => (

                                <tr key={leave.id}>

                                    <td>{leave.leaveType}</td>

                                    <td>{leave.startDate}</td>

                                    <td>{leave.endDate}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                leave.status === "Approved"
                                                    ? "bg-success"
                                                    : leave.status === "Rejected"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                            }`}
                                        >
                                            {leave.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default MyLeaves;