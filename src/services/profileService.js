import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL =
"https://employee-leave-management-backend-a61a.onrender.com/profile";

export const getProfile = () => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const uploadProfileImage = (file) => {

    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_URL}/upload-image`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data"
        }
    });
};