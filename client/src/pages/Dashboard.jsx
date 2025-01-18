import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import Report from '../components/Report';
import PinSidebar from '../components/PinSidebar';
import Map from '../components/Map';


const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:8800/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUserData(data);
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                toast.error("Error fetching user data: " + err.message);
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div>
            <Navbar />
            <PinSidebar />
            <Map />
            <ToastContainer />
        </div>
    );
};

export default Dashboard;


// {userData ? (
//     <div>
//         <p>Welcome back, {userData.fname} {userData.lname}!</p>
//         <p>Email: {userData.email}</p>
//         <p>Role: {userData.role}</p>
//         <p>UID: {userData.customUid}</p>
//         <Report />
//         {/* Add more user data as needed */}
//     </div>
// ) : (
//     <p>Loading...</p>
// )}