import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { addEmployee } from "../services/employeeService";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        fullName: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        role: "EMPLOYEE"
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addEmployee(employee);

            alert("Employee added successfully!");

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert("Failed to add employee.");

        }

    };

    return (

        <DashboardLayout>

            <div className="container">

                <h2 className="mb-4">Add Employee</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Designation</label>
                        <input
                            type="text"
                            name="designation"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Role</label>

                        <select
                            name="role"
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>

                    </div>

                    <button className="btn btn-success">
                        Save Employee
                    </button>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default AddEmployee;