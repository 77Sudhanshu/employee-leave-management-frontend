import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { getFullName } from "../utils/auth";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "../services/notificationService";

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await getNotifications();
      setNotifications(response.data);

      const unread = await getUnreadCount();
      setUnreadCount(unread.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNotificationClick = async (id) => {
    try {
      await markAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 d-flex justify-content-between">
      <h4 className="m-0">Employee Leave Management System</h4>

      <div className="d-flex align-items-center">

        <div className="position-relative me-4">

          <FaBell
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {unreadCount > 0 && (
            <span
              className="badge bg-danger position-absolute top-0 start-100 translate-middle"
            >
              {unreadCount}
            </span>
          )}

          {showDropdown && (
            <div
              className="card position-absolute end-0 mt-3 shadow"
              style={{
                width: "350px",
                maxHeight: "400px",
                overflowY: "auto",
                zIndex: 9999,
              }}
            >
              <div className="card-header d-flex justify-content-between align-items-center">
  <strong>Notifications</strong>

  {notifications.length > 0 && (
    <button
      className="btn btn-sm btn-primary"
      onClick={handleMarkAllRead}
    >
      Mark All
    </button>
  )}
</div>

              <div className="list-group list-group-flush">

                {notifications.length === 0 ? (
                  <div className="p-3 text-center">
                    No Notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
  key={notification.id}
  className={`list-group-item ${notification.read ? "" : "list-group-item-warning"}`}
  style={{ cursor: "pointer" }}
  onClick={() => handleNotificationClick(notification.id)}
>
                      <strong>{notification.title}</strong>

                      <br />

                      <small>{notification.message}</small>

                      <br />

                      <small className="text-muted">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </small>
                    </div>
                  ))
                )}

              </div>
            </div>
          )}

        </div>

        <strong>{getFullName()}</strong>

      </div>
    </nav>
  );
}

export default Navbar;