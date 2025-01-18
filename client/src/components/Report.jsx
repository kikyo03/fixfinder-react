import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Upload, Visibility, VisibilityOff, Cancel, CheckCircle } from '@mui/icons-material'; // Import icons
import 'typeface-poppins';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from "prop-types"; // Prop types for validation



const Report = ({ pin }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [report, setReport] = useState({
        title: "",
        details: "",
        type: "",
        status: "Pending",
        user_uid: userData?.customUid || "",
        name: userData ? `${userData.fname} ${userData.lname}` : "",
        coordinates: "",
        floor: "",
        pinId: "",
        image: "",
    });

    const [error, setError] = useState(false);
    const [open, setOpen] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [showAllFields, setShowAllFields] = useState(false);

    const handleChange = (e) => {
        setReport((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setReport((prev) => ({ ...prev, image: file }));
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Check if required fields are filled (excluding image)
        if (!report.title || !report.details || !report.type || !report.coordinates || !report.floor || !report.pinId) {
            setError(true);
            return; // Stop submission if validation fails
        }

        // If validation passes, create FormData and submit
        const formData = new FormData();
        Object.keys(report).forEach((key) => {
            formData.append(key, report[key]);
        });

        try {
            await axios.post("http://localhost:8800/report", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setOpen(false);
            setOpenSnackbar(true);
            setError(false); // Reset error state if submission is successful
            resetForm(); // Reset form after submiss
        } catch (err) {
            console.log(err);
            setError(true); // If error occurs during submission
        }
    };

    const resetForm = () => {
        setReport({
            title: "",
            details: "",
            type: "",
            status: "Pending",
            user_uid: userData?.customUid || "",
            name: userData ? `${userData.fname} ${userData.lname}` : "",
            coordinates: "",
            floor: "",
            pinId: "",
            image: "",
        });
    };

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

    useEffect(() => {
        if (userData) {
            setReport((prevData) => ({
                ...prevData,
                user_uid: userData.customUid || "",
                name: `${userData.fname} ${userData.lname}` || "",
            }));
        }
    }, [userData]);



    useEffect(() => {
        localStorage.setItem("dialogOpen", open);
    }, [open]);

    const handleCancel = () => {
        setOpen(false); // Close the dialog
    };

    useEffect(() => {
        setReport((prev) => ({
            ...prev,
            pinId: pin || "", // Populate pinId with the selected pin
            type: pin.type,
        }));
    }, [pin]);


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            {/* <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    backgroundColor: "#457b9d",
                    color: "#f1faee",
                    padding: "10px 20px",
                    borderRadius: "5px",
                }}
            >
                Open Report Form
            </Button> */}

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle style={{ fontFamily: "'Poppins', sans-serif", color: "#fae6cfff", backgroundColor: "#1d3557", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FmdBadIcon style={{ marginRight: '10px', color: '#f1faee', fontSize: '35px' }} /> {/* Map pin icon */}
                        Submit a New Report
                    </div>
                    {/* Clear Button */}
                    <Button
                        onClick={resetForm}
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            color: "#e63946",
                            backgroundColor: "#f1faee",
                        }}
                    >
                        <DeleteIcon />
                        Clear
                    </Button>
                </DialogTitle>

                <DialogContent style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#a8dadc", padding: "20px", color: "#1d3557" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Report Title"
                        type="text"
                        fullWidth
                        name="title"
                        value={report.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Report Details"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        name="details"
                        value={report.details}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Report Type"
                        type="text"
                        fullWidth
                        name="type"
                        value={report.type}
                        onChange={handleChange}
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        id="file-upload"
                        style={{ display: "none" }}
                    />
                    <label htmlFor="file-upload">
                        <Button
                            variant="contained"
                            component="span"
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#457b9d",
                                color: "#f1faee",
                                fontFamily: "'Poppins', sans-serif",
                                padding: "8px 20px",
                                borderRadius: "5px",
                                textTransform: "none"
                            }}
                            startIcon={<Upload />}
                        >
                            Upload Report Image
                        </Button>
                    </label>
                    {report.image && (
                        <p style={{ fontFamily: "'Poppins', sans-serif", color: "#1d3557" }}>
                            {report.image.name}
                        </p>
                    )}

                    {showAllFields && (
                        <>
                            <TextField
                                margin="dense"
                                label="Floor"
                                type="text"
                                fullWidth
                                name="floor"
                                value={report.floor}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                label="Coordinates"
                                type="text"
                                fullWidth
                                name="coordinates"
                                value={report.coordinates}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="dense"
                                label="Pin ID"
                                type="text"
                                fullWidth
                                name="pinId"
                                value={report.pinId}
                                onChange={handleChange}
                            />
                            {/* Immutable Fields */}
                            <TextField
                                margin="dense"
                                label="User UID"
                                type="text"
                                fullWidth
                                value={userData.customUid}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                value={`${userData.fname} ${userData.lname}`}
                                disabled
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                margin="dense"
                                label="Status"
                                type="text"
                                fullWidth
                                value={report.status}
                                InputProps={{ readOnly: true }}
                            />
                        </>
                    )}
                    {/* {error && (
                        <p style={{ color: "red", marginTop: "10px" }}>
                            Something went wrong!
                        </p>
                    )} */}
                    {error && (
                        <p style={{ color: "red", marginTop: "10px" }}>
                            All fields must be filled out.
                        </p>
                    )}

                </DialogContent>
                <DialogActions style={{ backgroundColor: "#1d3557", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button
                        onClick={() => setShowAllFields(!showAllFields)}
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            backgroundColor: "#457b9d",
                            color: "#f1faee",
                            alignSelf: "flex-start",
                        }}
                        startIcon={showAllFields ? <VisibilityOff /> : <Visibility />}
                    >
                        {showAllFields ? "Hide All Fields" : "Show All Fields"}
                    </Button>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <Button
                            onClick={handleCancel}
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                color: "#e63946",
                                backgroundColor: "#f1faee",
                            }}
                            startIcon={<Cancel />}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleClick}
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                color: "#f1faee",
                                backgroundColor: "#457b9d",
                            }}
                            startIcon={<CheckCircle />}
                        >
                            Submit Report
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Report submitted successfully!
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

Report.propTypes = {
    pin: PropTypes.string, // Ensure pin is a string
};

export default Report;

