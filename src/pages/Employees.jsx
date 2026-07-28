import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
    getEmployeesWithPagination,
    deleteEmployee,
    searchEmployees
} from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async (page = 0) => {

        try {
    
            const response = await getEmployeesWithPagination(page, 5);
    
            setEmployees(response.data.content);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);
    
        } catch (error) {
    
            console.log(error);
    
        }
    
    };
    const handleSearch = async (value) => {

        setKeyword(value);
    
        if (value.trim() === "") {
            loadEmployees();
            return;
        }
    
        try {
    
            const response = await searchEmployees(value);
    
            setEmployees(response.data);
    
        } catch (error) {
    
            console.log(error);
    
        }
    
    };
    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Delete Employee?",
            text: "You won't be able to undo this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel"
        });
        
        if (!result.isConfirmed) {
            return;
        }

        try {

            await deleteEmployee(id);

            await Swal.fire({
                title: "Deleted!",
                text: "Employee deleted successfully.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false
            });

            loadEmployees();

        } catch (error) {

            console.log(error);

            Swal.fire({
                title: "Error",
                text: "Failed to delete employee.",
                icon: "error"
            });

        }

    };

    return (
    

        <DashboardLayout>

<div className="d-flex justify-content-between align-items-center mb-4">

    <h2>Employees</h2>

    <button
        className="btn btn-primary"
        onClick={() => navigate("/employees/add")}
    >
        Add Employee
    </button>

</div>

<div className="mb-4">

    <input
        type="text"
        className="form-control"
        placeholder="Search by Name or Email..."
        value={keyword}
        onChange={(e) => handleSearch(e.target.value)}
    />

</div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                    <th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Designation</th>
<th>Role</th>
<th>Actions</th>

                    </tr>

                </thead>

                <tbody>

    {employees.map(employee => (

        <tr key={employee.id}>

            <td>{employee.id}</td>
            <td>{employee.fullName}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>{employee.designation}</td>
            <td>{employee.role}</td>

            <td>

    <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => navigate(`/employees/edit/${employee.id}`)}
    >
        Edit
    </button>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(employee.id)}
    >
        Delete
    </button>

</td>

        </tr>

    ))}

</tbody>

            </table>
            <div className="d-flex justify-content-center mt-4">

    <button
        className="btn btn-secondary me-2"
        disabled={currentPage === 0}
        onClick={() => loadEmployees(currentPage - 1)}
    >
        Previous
    </button>

    <span className="align-self-center">
        Page {currentPage + 1} of {totalPages}
    </span>

    <button
        className="btn btn-secondary ms-2"
        disabled={currentPage + 1 === totalPages}
        onClick={() => loadEmployees(currentPage + 1)}
    >
        Next
    </button>

</div>

        </DashboardLayout>

    );

}

export default Employees;