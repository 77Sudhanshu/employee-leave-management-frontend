export function saveUser(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("fullName", data.fullName);
    localStorage.setItem("email", data.email);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function getRole() {
    return localStorage.getItem("role");
}

export function getFullName() {
    return localStorage.getItem("fullName");
}

export function getEmail() {
    return localStorage.getItem("email");
}

export function logout() {
    localStorage.clear();
}