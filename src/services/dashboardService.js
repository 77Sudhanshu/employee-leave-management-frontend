import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

export function getDashboardStats() {
    return API.get("/dashboard/stats", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}