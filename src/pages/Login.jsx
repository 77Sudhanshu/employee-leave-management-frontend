import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { saveUser } from "../utils/auth";

import "./Login.css";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        console.log("1. Login button clicked");
    
        try {
    
            const response = await loginUser(email, password);
    
            console.log("2. API Response:", response.data);
    
            saveUser(response.data);

toast.success("Login Successful!");

console.log("3. User saved");

console.log("4. Role =", response.data.role);

setTimeout(() => {

    if (response.data.role === "ADMIN") {

        console.log("5. Going to Admin Dashboard");

        navigate("/admin/dashboard");

    } else {

        console.log("5. Going to Employee Dashboard");

        navigate("/employee/dashboard");

    }

}, 1000);
    
        } catch (error) {
    
            console.log("ERROR:", error);
    
            toast.error("Invalid Email or Password");
    
        }
    
    };


    return (

        <div className="login-container">

            <div className="card login-card">

                <h2 className="login-title">
                    Employee Leave Management
                </h2>

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    text="Login"
                    onClick={handleLogin}
                />

            </div>

        </div>

    );
}

export default Login;