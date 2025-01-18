import React, { useState, useEffect } from "react";
import profile from '../assets/images/rabbit.png';
import Navbar from '../components/Navbar'; // Ensure you import Navbar
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import axios from "axios"; // Axios for API calls
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    Paper,
    Snackbar,
    Alert
} from "@mui/material";
import { styled } from "@mui/system";
import { FaUser, FaEnvelope, FaIdCard, FaUserTag } from "react-icons/fa";
import { componentStyles } from '../assets/css/Theme'; // Import the styles and theme

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    backgroundColor: "#A8DADC",
    opacity: 0.8
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2)
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
    color: "#1D3557"
}));

const User = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        role: "",
        customUid: ""
    });

    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_BASE_URL = "http://localhost:8800"; // Replace with your backend URL

    // Fetch user data from backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
                const response = await axios.get(`${API_BASE_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userData = response.data;
                setFormData({
                    name: userData.fname,
                    lastName: userData.lname,
                    email: userData.email,
                    role: userData.role,
                    customUid: userData.customUid
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                setSnackbar({
                    open: true,
                    message: "Failed to fetch user data. Please try again.",
                    severity: "error"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "First Name is required";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last Name is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const token = localStorage.getItem("token");
                await axios.put(
                    `${API_BASE_URL}/user`,
                    {
                        fname: formData.name,
                        lname: formData.lastName
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setSnackbar({
                    open: true,
                    message: "Profile updated successfully!",
                    severity: "success"
                });
            } catch (error) {
                console.error("Error updating user data:", error);
                setSnackbar({
                    open: true,
                    message: "Failed to update profile. Please try again.",
                    severity: "error"
                });
            }
        }
    };

    const handleNavigate = () => {
        navigate("/dashboard");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="md">
            <Navbar userDetails={formData} />
            <StyledPaper elevation={3}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <StyledAvatar src={profile} alt="Profile Picture" />
                    <Typography variant="h4" gutterBottom>
                        User Profile
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* Render Form Fields */}
                    <Grid item xs={12} sm={6}>
                        <Box sx={componentStyles.box}>
                            <IconWrapper>
                                <FaUser />
                            </IconWrapper>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                required
                                sx={componentStyles.textField}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <IconWrapper>
                                <FaUser />
                            </IconWrapper>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                error={Boolean(errors.lastName)}
                                helperText={errors.lastName}
                                required
                            />
                        </Box>
                    </Grid>
                    {/* Other Fields */}
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <IconWrapper>
                                <FaEnvelope />
                            </IconWrapper>
                            <TextField
                                fullWidth
                                label="Email"
                                value={formData.email}
                                inputProps={{ readOnly: true }}
                                sx={{ "& .MuiInputBase-input.Mui-disabled": { opacity: 0.8 } }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <IconWrapper>
                                <FaUserTag />
                            </IconWrapper>
                            <TextField
                                fullWidth
                                label="Role"
                                value={formData.role}
                                inputProps={{ readOnly: true }}
                                sx={{ "& .MuiInputBase-input.Mui-disabled": { opacity: 0.8 } }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <IconWrapper>
                                <FaIdCard />
                            </IconWrapper>
                            <TextField
                                fullWidth
                                label="UID"
                                value={formData.customUid}
                                inputProps={{ readOnly: true }}
                                sx={{ "& .MuiInputBase-input.Mui-disabled": { opacity: 0.8 } }}
                            />
                        </Box>
                    </Grid>
                    {/* Buttons */}
                    <Grid item xs={12}>
                        <Box sx={componentStyles.box}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleNavigate}
                            >
                                Back To Map
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </StyledPaper>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default User;
