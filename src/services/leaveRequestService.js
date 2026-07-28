import axios from "axios";
import { getToken } from "../utils/auth";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
});

export function getLeaveRequests() {
    return API.get("/leaveRequests");
}

export function approveLeave(id) {
    return API.put(`/leaveRequests/${id}/approve`);
}

export function rejectLeave(id) {
    return API.put(`/leaveRequests/${id}/reject`);
}

export function deleteLeave(id) {
    return API.delete(`/leaveRequests/${id}`);
}
export const applyLeave = async (leaveData) => {
    const response = await API.post(
        "/leaveRequests",
        leaveData
    );

    return response.data;
};

export function getMyLeaves() {
    return API.get("/leaveRequests/my-leaves");
}
export function uploadCertificate(leaveId, file) {

    const formData = new FormData();

    formData.append("file", file);

    return API.post(
        `/leaveRequests/${leaveId}/upload-certificate`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
}
    export const downloadCertificate = async (leaveId) => {
        return API.get(
            `/leaveRequests/${leaveId}/download-certificate`,
            {
                responseType: "blob"
            }
        );
    }
    export function getRecentLeaveRequests() {
        return API.get("/leaveRequests/recent");
    }