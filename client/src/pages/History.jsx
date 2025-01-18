import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Grid,
    Container,
    Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaTrash } from "react-icons/fa";
import { useTheme } from '@mui/material/styles';
import Navbar from '../components/Navbar';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: "1rem",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },
}));

const History = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        role: "",
        customUid: "",
    });

    const [reports, setReports] = useState([]); // Ensure it's initialized as an empty array
    const theme = useTheme();

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch("http://localhost:8800/user", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login"; // Redirect to login
                }

                const data = await response.json();
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    name: `${data.fname} ${data.lname}`,
                    customUid: data.customUid,
                }));
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []); // No need to include formData as a dependency

    // Fetch reports from the backend
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:8800/reports", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login"; // Redirect to login
                }

                const data = await response.json();
                console.log("Fetched Reports:", data); // Debug fetched reports
                setReports(Array.isArray(data) ? data : []); // Ensure data is an array
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []); // Empty array ensures this runs only once when the component mounts

    const handleDeleteReport = async (id) => {
        try {
            const response = await fetch(`http://localhost:8800/reports/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                setReports((prevReports) => prevReports.filter(report => report.id !== id));
            } else {
                console.error("Failed to delete report:", await response.json());
            }
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "resolved": return "success";
            case "pending": return "warning";
            case "in progress": return "info";
            default: return "default";
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Navbar userDetails={formData} />
            <Box sx={theme.components.MuiBox?.styleOverrides?.root || {}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Report History
                </Typography>
                <Typography variant="subtitle1">
                    User: {formData.name} | UID: {formData.customUid}
                </Typography>
            </Box>

            {reports.length === 0 ? (
                <Typography variant="body1" color="textSecondary" sx={{ mt: 4 }}>
                    No reports available.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {Array.isArray(reports) && reports.map((report, index) => (
                        <Grid item xs={12} key={index}>
                            <StyledCard>
                                <Grid container>
                                    <Grid item xs={12} md={4}>
                                        {/* Render image only if available */}
                                        {report.image ? (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={`http://localhost:8800/uploads/${report.image}`}
                                                alt={report.title}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => window.open(`http://localhost:8800/uploads/${report.image}`, "_blank")}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    height: 200,
                                                    backgroundColor: "#f0f0f0",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "#888",
                                                }}
                                            >
                                                No Image Available
                                            </Box>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <CardContent>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                                <Typography variant="h6" component="h2">
                                                    {report.title}
                                                </Typography>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<FaTrash />}
                                                    onClick={() => handleDeleteReport(report.id)}
                                                    aria-label={`Delete report ${report.title}`}
                                                >
                                                    Delete Report
                                                </Button>
                                            </Box>
                                            <Typography variant="body1" paragraph>
                                                {report.details}
                                            </Typography>
                                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                                <Chip label={`Type: ${report.type}`} variant="outlined" />
                                                <Chip label={`Status: ${report.status}`} color={getStatusColor(report.status)} />
                                                <Chip label={`Name: ${report.name}`} variant="outlined" />
                                            </Box>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default History;
