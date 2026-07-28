import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
    baseURL: "https://employee-leave-management-backend-a61a.onrender.com",
});

export function getDashboardStats() {
    return API.get("/dashboard/stats", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}