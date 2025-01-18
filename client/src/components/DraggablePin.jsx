// src/ParentComponent.js
import React, { useState, useEffect } from "react";
import Report from "../components/Report"; // Import the Report form component

const ParentComponent = () => {
    // Get the initial dialog state from localStorage or default to true (open)
    const [open, setOpen] = useState(localStorage.getItem("dialogOpen") === "true");

    // Effect to store the dialog state in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("dialogOpen", open); // Save dialog state to localStorage
    }, [open]);

    // Function to close the form (both from Cancel and after form submission)
    const closeForm = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* Pass the open state and closeForm function to the Report component */}
            <Report open={open} closeForm={closeForm} />
        </div>
    );
};

export default ParentComponent;
