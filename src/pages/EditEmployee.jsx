import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { getEmployeeById, updateEmployee } from "../services/employeeService";

function EditEmployee() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        fullName: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        role: ""
    });

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {

        try {

            const response = await getEmployeeById(id);

            setEmployee(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateEmployee(id, employee);

            alert("Employee updated successfully!");

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert("Failed to update employee.");

        }

    };

    return (

        <DashboardLayout>

            <div className="container">

                <h2 className="mb-4">Edit Employee</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={employee.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Department</label>
                        <input
                            type="text"
                            className="form-control"
                            name="department"
                            value={employee.department}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Designation</label>
                        <input
                            type="text"
                            className="form-control"
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Role</label>

                        <select
                            className="form-control"
                            name="role"
                            value={employee.role}
                            onChange={handleChange}
                        >
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>

                    </div>

                    <button className="btn btn-success">
                        Update Employee
                    </button>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default EditEmployee;