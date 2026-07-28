import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { applyLeave, uploadCertificate } from "../services/leaveRequestService";

function ApplyLeave() {

    const [leave, setLeave] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
    });
    
    const [certificate, setCertificate] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setLeave({
            ...leave,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
    
            // Step 1: Apply leave
            const response = await applyLeave(leave);
    
            // Step 2: Upload certificate if selected
            if (certificate) {
                await uploadCertificate(response.id, certificate);
            }
    
            toast.success("Leave applied successfully!");
    
            setLeave({
                leaveType: "",
                startDate: "",
                endDate: "",
                reason: ""
            });
    
            setCertificate(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
    
        } catch (error) {
            console.error(error);
            toast.error("Failed to apply leave.");
        }
    };
    

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>Apply Leave</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Leave Type
                            </label>

                            <select
                                className="form-select"
                                name="leaveType"
                                value={leave.leaveType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Leave</option>
<option value="Sick">Sick Leave</option>
<option value="Casual">Casual Leave</option>
<option value="Earned">Earned Leave</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Start Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                value={leave.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                End Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={leave.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Reason
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                name="reason"
                                value={leave.reason}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
    <label className="form-label">
        Medical Certificate (Optional)
    </label>

    <input
    ref={fileInputRef}
    type="file"
    className="form-control"
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={(e) => setCertificate(e.target.files[0])}
/>
</div>
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Submit Leave Request
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ApplyLeave;