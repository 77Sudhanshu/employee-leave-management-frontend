import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL =
"https://employee-leave-management-backend-a61a.onrender.com/notifications";

export const getNotifications = () =>
  axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

export const getUnreadCount = () =>
  axios.get(`${API_URL}/unread-count`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  export const markAsRead = (id) =>
    axios.put(`${API_URL}/${id}/read`, {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
  
  export const markAllAsRead = () =>
    axios.put(`${API_URL}/read-all`, {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });