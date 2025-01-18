import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from 'react-toastify';
import '../assets/css/Dashboard.css'; // Import your custom CSS for styling

const Navbar = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [userDetails, setUserDetails] = useState(null); // State for storing user data
    const [state, setState] = React.useState({
        left: false,
    });

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
                    setUserDetails(data); // Store user data in state
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                toast.error("Error fetching user data: " + err.message);
            }
        };

        fetchUserData();
    }, [navigate]); // Only run once when the component mounts

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleItemClick = (path) => {
        navigate(path); // Navigate to the specified route
    };

    async function handleLogout() {
        try {
            localStorage.removeItem("token"); // Remove token from localStorage
            toast.success('Successfully logged out!', {
                position: 'top-center',
                autoClose: 2000
            });

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000); // Delay of 2000ms (2 seconds)
        } catch (error) {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 5000
            });
        }
    };

    const list = (anchor) => (
        <Box
            className="navbar-box"
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* Header with Welcome Message and Close Button */}
            <Box className="navbar-header">
                <Typography variant="h6">{`Welcome, ${userDetails ? userDetails.fname : 'User'}`}</Typography>
                <IconButton onClick={toggleDrawer(anchor, false)} className="navbar-close-btn">
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider className="navbar-divider" />
            {/* Navigation List */}
            <List className="navbar-list">
                {[
                    { text: 'Map', path: '/dashboard', icon: <MapIcon /> },
                    { text: 'Report History', path: '/history', icon: <HistoryIcon /> },
                    { text: 'Profile', path: '/user', icon: <EditIcon /> },
                    { text: 'Edit Profile', path: '/map', icon: <EditIcon /> },
                ].map(({ text, path, icon }) => (
                    <ListItem key={text} disablePadding className="navbar-item">
                        <ListItemButton onClick={() => handleItemClick(path)}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider className="navbar-divider" />
            {/* Logout and User Info */}
            <List className="navbar-list-logout">
                {[
                    { text: `${userDetails ? userDetails.role : 'User'}`, icon: <PersonIcon /> },
                    { text: `${userDetails ? userDetails.customUid : 'User'}`, icon: <NumbersIcon /> },
                    { text: 'Logout', path: '/all-mail', icon: <LogoutIcon />, onClick: handleLogout },
                ].map(({ text, path, icon, onClick }) => (
                    <ListItem key={text} disablePadding className="navbar-item">
                        <ListItemButton onClick={onClick ? onClick : () => handleItemClick(path)}>
                            <ListItemIcon className="navbar-item-icon">{icon}</ListItemIcon>
                            <ListItemText primary={text} className="navbar-logout-text" />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div className="Navbar">
            <React.Fragment>
                <MenuIcon
                    onClick={toggleDrawer('left', true)}
                    style={{ cursor: 'pointer' }}
                />
                <Drawer
                    anchor="left"
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
};

export default Navbar;
