import React, { useState } from 'react';
import '../assets/css/Register.css';
import { Link } from 'react-router-dom';
import showPass from '../assets/images/show.svg';
import hidePass from '../assets/images/hide.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const App = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to register the user
            const response = await axios.post("http://localhost:8800/register", {
                fname,
                lname,
                email,
                password
            });

            // Show success toast
            toast.success(response.data.message, {
                position: 'top-center',
                autoClose: 3000,
            });

            // Clear the form fields
            setFname('');
            setLname('');
            setEmail('');
            setPassword('');

            // Redirect to login page after a delay
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong", {
                position: 'top-center',
                autoClose: 5000,
            });
        }
    };


    return (
        <>
            <div className="wrapper">
                <h1>Signup</h1>
                <form id="form" className="form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fname">
                            <svg className='icon' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                            </svg>
                        </label>
                        <input className='fname-input'
                            type="text"
                            name="fname"
                            id="fname-input"
                            placeholder="Enter First Name"
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lname">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                            </svg>
                        </label>
                        <input
                            type="text"
                            name="lname"
                            id="lname-input"
                            placeholder="Enter Last Name"
                            onChange={(e) => setLname(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
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
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            <img
                                src={isPasswordVisible ? hidePass : showPass}
                                alt="Toggle Password Visibility"
                            />
                        </button>
                    </div>
                    <button type="submit" className="submit-btn">
                        Signup
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link> here.
                </p>
            </div>
        </>
    );
};

export default App;
