import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

API.interceptors.request.use((config) => {

    config.headers.Authorization = `Bearer ${getToken()}`;

    return config;

});

export function getEmployees() {
    return API.get("/employees");
}

export function addEmployee(employee) {
    return API.post("/employees", employee);
}

export function updateEmployee(id, employee) {
    return API.put(`/employees/${id}`, employee);
}

export function deleteEmployee(id) {
    return API.delete(`/employees/${id}`);
}
export function getEmployeeDashboard(email) {
    return API.get(`/employee-dashboard/${email}`);
}
export function getEmployeeById(id) {
    return API.get(`/employees/${id}`);
}
export function searchEmployees(keyword) {
    return API.get(`/employees/search?keyword=${keyword}`);
}
export function getEmployeesWithPagination(page, size) {
    return API.get(`/employees/page?page=${page}&size=${size}`);
}