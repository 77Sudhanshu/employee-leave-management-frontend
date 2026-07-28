import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

export function loginUser(email, password) {
    return API.post("/auth/login", {
        email,
        password,
    });
}