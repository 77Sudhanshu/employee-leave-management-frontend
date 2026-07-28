import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

function Sidebar() {

    const role = localStorage.getItem("role");

    return (
        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh"
            }}
        >
            <h3 className="mb-4">ELMS</h3>

            <ul className="nav flex-column">

                {role === "ADMIN" && (
                    <>
                        <li className="nav-item mb-3">
                            <Link className="nav-link text-white" to="/admin/dashboard">
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item mb-3">
                            <Link className="nav-link text-white" to="/employees">
                                Employees
                            </Link>
                        </li>

                        <li className="nav-item mb-3">
                            <Link className="nav-link text-white" to="/leave-requests">
                                Leave Requests
                            </Link>
                        </li>
                    </>
                )}

                {role === "EMPLOYEE" && (
                    <>
                        <li className="nav-item mb-3">
                            <Link className="nav-link text-white" to="/employee-dashboard">
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item mb-3">
                            <Link className="nav-link text-white" to="/apply-leave">
                                Apply Leave
                            </Link>
                        </li>

                        <li className="nav-item mb-3">
                            <Link className="nav-link text-white" to="/my-leaves">
                                My Leave Requests
                            </Link>
                        </li>
                    </>
                )}

                <li className="nav-item mb-3">
                    <Link className="nav-link text-white" to="/profile">
                        Profile
                    </Link>
                </li>

                <li className="nav-item mt-5">
                    <button
                        className="btn btn-danger w-100"
                        onClick={() => {
                            logout();
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </button>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;