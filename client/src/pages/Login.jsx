import React, { useState } from 'react';
import '../assets/css/Register.css';
import { Link } from 'react-router-dom';
import showPass from '../assets/images/show.svg';
import hidePass from '../assets/images/hide.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login data to backend
            const response = await fetch("http://localhost:8800/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Welcome back, ${email}!`);
                // Store JWT token in localStorage or cookies
                localStorage.setItem("token", data.token);
                window.location.href = "/dashboard";
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Error: " + err.message);
        }
    };


    const PasswordToggle = ({ isPasswordVisible, togglePasswordVisibility }) => {
        return (
            <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
            >
                <img
                    src={isPasswordVisible ? hidePass : showPass}
                    alt="Toggle Password Visibility"
                />
            </button>
        );
    };



    return (
        <div className="wrapper">
            <h1>Login</h1>
            <form id="form" className="form" onSubmit={handleSubmit}>
                {/* <form ref={registerForm} onSubmit={handleSubmit}> */}
                <div>
                    <label htmlFor="email">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                        >
                            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z" />
                        </svg>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email-input"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password-input">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                        >
                            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
                        </svg>
                    </label>
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        id="password-input"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Password visibility toggle button */}
                    <PasswordToggle
                        isPasswordVisible={isPasswordVisible}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Signup</Link> here.
            </p>
            {/* ToastContainer added here */}
            <ToastContainer />
        </div>
    );
};

export default App;
