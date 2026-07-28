import axios from "axios";

const API = axios.create({
    baseURL: "https://employee-leave-management-backend-a61a.onrender.com",
});

export function loginUser(email, password) {
    return API.post("/auth/login", {
        email,
        password,
    });
}