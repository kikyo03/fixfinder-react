// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import CautionIcon from '../assets/images/Caution_shadow.png';
// import CautionHoverIcon from '../assets/images/Caution_symbol.png'; // Add the hover icon image
// import CleaningIcon from '../assets/images/Cleaning_shadow.png';
// import CleaningHoverIcon from '../assets/images/Cleaning_symbol.png'; // Add the hover icon image
// import ElectricalIcon from '../assets/images/Electrical Hazard_shadow.png';
// import ElectricalHoverIcon from '../assets/images/Electrical Hazard_symbol.png'; // Add the hover icon image
// import ITIcon from '../assets/images/IT Maintenance_shadow.png';
// import ITHoverIcon from '../assets/images/IT Maintenance_symbol.png'; // Add the hover icon image
// import RepairIcon from '../assets/images/Repair_shadow.png';
// import RepairHoverIcon from '../assets/images/Repair_symbol.png'; // Add the hover icon image
// import RequestIcon from '../assets/images/Request_shadow.png';
// import RequestHoverIcon from '../assets/images/Request_symbol.png'; // Add the hover icon image
// import '@fontsource/poppins'; // Defaults to 400 weight
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//     typography: {
//         fontFamily: 'Poppins, Arial, sans-serif',
//     },
// });

// const PinSidebar = ({ isOpen, setIsOpen }) => {
//     const [hoveredPin, setHoveredPin] = useState(null);

//     const toggleDrawer = (open) => {
//         setIsOpen(open);  // Correctly toggle the state
//     };

//     const pinData = [
//         { id: 'cautionIcon', icon: CautionHoverIcon, hoverIcon: CautionIcon, label: 'Hazard Pin' },
//         { id: 'cleaningIcon', icon: CleaningHoverIcon, hoverIcon: CleaningIcon, label: 'Cleaning Pin' },
//         { id: 'electricalIcon', icon: ElectricalHoverIcon, hoverIcon: ElectricalIcon, label: 'Electrical Pin' },
//         { id: 'itIcon', icon: ITHoverIcon, hoverIcon: ITIcon, label: 'IT Maintenance Pin' },
//         { id: 'repairIcon', icon: RepairHoverIcon, hoverIcon: RepairIcon, label: 'Repair Pin' },
//         { id: 'requestIcon', icon: RequestHoverIcon, hoverIcon: RequestIcon, label: 'Request Pin' },
//     ];

//     return (
//         <ThemeProvider theme={theme}>
//             <Box>
//                 {/* <IconButton
//                     onClick={() => toggleDrawer(true)}  // Pass true to open the sidebar
//                     sx={{
//                         position: 'fixed',
//                         top: 20,
//                         right: 20,
//                         zIndex: 1200,
//                         color: 'black',
//                     }}
//                 >
//                     <MenuIcon />
//                 </IconButton> */}

//                 <Drawer
//                     anchor="right"
//                     open={isOpen}
//                     onClose={() => toggleDrawer(false)}  // Pass false to close the sidebar
//                     sx={{
//                         '& .MuiDrawer-paper': {
//                             width: 300,
//                             backgroundColor: '#A8DADC',
//                             color: '#fae6cfff',
//                         },
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             padding: '10px 20px',
//                             backgroundColor: '#1D3557',
//                             color: '#fae6cfff',
//                         }}
//                     >
//                         <Typography variant="h6" component="div" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
//                             PINS
//                         </Typography>
//                         <IconButton onClick={() => toggleDrawer(false)} sx={{ color: '#fae6cfff' }}>
//                             <CloseIcon />
//                         </IconButton>
//                     </Box>
//                     <Divider sx={{ backgroundColor: '#444' }} />

//                     <List sx={{ padding: '10px' }}>
//                         {pinData.map(({ id, icon, hoverIcon, label }) => (
//                             <ListItem
//                                 key={id}
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     padding: '15px 10px',
//                                     borderRadius: '10px',
//                                     marginBottom: '10px',
//                                     backgroundColor: '#1D3557',
//                                     opacity: 0.8,
//                                     '&:hover': {
//                                         backgroundColor: '#457B9D',
//                                     },
//                                 }}
//                                 onMouseEnter={() => setHoveredPin(id)}
//                                 onMouseLeave={() => setHoveredPin(null)}
//                             >
//                                 <ListItemIcon sx={{ minWidth: 'unset', marginRight: '15px' }}>
//                                     <img
//                                         src={hoveredPin === id ? hoverIcon : icon}
//                                         alt={label}
//                                         style={{ width: 50, height: 'auto', borderRadius: '5px' }}
//                                     />
//                                 </ListItemIcon>
//                                 <ListItemText
//                                     primary={label}
//                                     primaryTypographyProps={{
//                                         fontSize: '16px',
//                                         fontWeight: 'bold',
//                                         fontFamily: 'Poppins, Arial, sans-serif',
//                                         color: '#fae6cfff',
//                                     }}
//                                 />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Drawer>
//             </Box>
//         </ThemeProvider>
//     );
// };

// export default PinSidebar;

//end of orginal//




import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import '@fontsource/poppins'; // Defaults to 400 weight
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Report from './Report';

// Import your images here
import CautionIcon from '../assets/images/Caution_shadow.png';
import CautionHoverIcon from '../assets/images/Caution_symbol.png';
import CleaningIcon from '../assets/images/Cleaning_shadow.png';
import CleaningHoverIcon from '../assets/images/Cleaning_symbol.png';
import ElectricalIcon from '../assets/images/Electrical Hazard_shadow.png';
import ElectricalHoverIcon from '../assets/images/Electrical Hazard_symbol.png';
import ITIcon from '../assets/images/IT Maintenance_shadow.png';
import ITHoverIcon from '../assets/images/IT Maintenance_symbol.png';
import RepairIcon from '../assets/images/Repair_shadow.png';
import RepairHoverIcon from '../assets/images/Repair_symbol.png';
import RequestIcon from '../assets/images/Request_shadow.png';
import RequestHoverIcon from '../assets/images/Request_symbol.png';

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
});


const PinSidebar = ({ isOpen, setIsOpen }) => {
    const [hoveredPin, setHoveredPin] = useState(null);
    const [clonedPins, setClonedPins] = useState([]);
    const [selectedPin, setSelectedPin] = useState(null);  // State for selected pin
    const [showReportForm, setShowReportForm] = useState(false);  // State to control the visibility of the report form
    const isDragging = useRef(false);
    const startPosition = useRef({ x: 0, y: 0 });
    const draggingPinId = useRef(null);
    const isCloning = useRef(false);

    const toggleDrawer = (open) => {
        setIsOpen(open);
    };

    const pinData = [
        { id: 'Hazard', icon: CautionHoverIcon, hoverIcon: CautionIcon, label: 'Hazard Pin' },
        { id: 'Cleaning', icon: CleaningHoverIcon, hoverIcon: CleaningIcon, label: 'Cleaning Pin' },
        { id: 'Electical Hazard', icon: ElectricalHoverIcon, hoverIcon: ElectricalIcon, label: 'Electrical Pin' },
        { id: 'IT Maintenance', icon: ITHoverIcon, hoverIcon: ITIcon, label: 'IT Maintenance Pin' },
        { id: 'Repair', icon: RepairHoverIcon, hoverIcon: RepairIcon, label: 'Repair Pin' },
        { id: 'Request', icon: RequestHoverIcon, hoverIcon: RequestIcon, label: 'Request Pin' },
    ];

    const pinTypes = {
        cautionIcon: "Hazard",
        cleaningIcon: "Cleaning",
        electricalIcon: "Electrical Hazard",
        itIcon: "IT Maintenance",
        repairIcon: "Repair",
        requestIcon: "Request"
    };

    const handleMouseDown = (e, id) => {
        isDragging.current = true;
        draggingPinId.current = id;
        startPosition.current = { x: e.clientX - getPinPosition(id).x, y: e.clientY - getPinPosition(id).y };
        document.body.style.userSelect = 'none';

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            const newX = e.clientX - startPosition.current.x;
            const newY = e.clientY - startPosition.current.y;
            updatePinPosition(draggingPinId.current, newX, newY);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = 'auto';
    };

    // const handlePinClick = (id, isFromSidebar) => {
    //     if (isFromSidebar) {
    //         const userConfirmed = window.confirm(`${id} selected`);
    //         if (userConfirmed) {
    //             const newPin = {
    //                 id: Date.now(),
    //                 hoverIcon: getPinIcon(id).hoverIcon,
    //                 label: getPinIcon(id).label,
    //                 x: 100,
    //                 y: 100
    //             };
    //             setClonedPins((prevPins) => [...prevPins, newPin]);
    //         }
    //     } else {
    //         // If the pin is clicked after cloning
    //         const userConfirmed = window.confirm("Do you want to confirm the pin position?");
    //         if (userConfirmed) {
    //             setSelectedPin(id);  // Set the selected pin after confirmation
    //             setShowReportForm(true);  // Show the report form after confirmation
    //         }
    //     }
    // };

    // const handlePinClick = (id, isFromSidebar) => {
    //     if (isFromSidebar) {
    //         // Cloning a pin
    //         const userConfirmed = window.confirm(`${id} selected`);
    //         if (userConfirmed) {
    //             const newPin = {
    //                 id: `cloned-${Date.now()}`, // Ensure unique ID for cloned pins
    //                 hoverIcon: getPinIcon(id).hoverIcon,
    //                 label: getPinIcon(id).label,
    //                 x: 100, // Default position for the cloned pin
    //                 y: 100,
    //             };
    //             setClonedPins((prevPins) => [...prevPins, newPin]);
    //         }
    //     } else {
    //         // Handling click on cloned pin
    //         const clickedPin = clonedPins.find((pin) => pin.id === id);
    //         if (clickedPin) {
    //             const userConfirmed = window.confirm("Do you want to confirm the pin position?");
    //             if (userConfirmed) {
    //                 setSelectedPin(clickedPin); // Set the selected pin object
    //                 setShowReportForm(true); // Show the report form
    //             }
    //         }
    //     }
    // };

    const handlePinClick = (id, isFromSidebar, label) => {
        console.log("handlePinClick invoked with:", { id, isFromSidebar, label });

        if (isFromSidebar) {
            const userConfirmed = window.confirm(`${id} selected`);
            if (userConfirmed) {
                const newPin = {
                    id: Date.now().toString(), // Ensure unique ID using a string
                    hoverIcon: getPinIcon(id).hoverIcon,
                    label: getPinIcon(id).label,
                    x: 100,
                    y: 100,
                };
                setClonedPins((prevPins) => [...prevPins, newPin]);
                console.log("New pin created:", newPin);
            }
        } else {
            // If the pin is clicked after cloning
            const userConfirmed = window.confirm("Do you want to confirm the pin position?");
            if (userConfirmed) {
                // Log the label before finding the pin entry
                console.log("Searching for pin with label:", label);

                // Find the corresponding pin entry in pinData by its label
                const pinEntry = pinData.find((pin) => pin.label === label);

                // Log the pin entry found (or not found)
                console.log("Matching pin entry found:", pinEntry);

                // Extract the `id` from pinEntry, or fallback to a default type
                const reportType = pinEntry ? pinEntry.id : "General Issue";

                // Log the report type
                console.log("Determined report type:", reportType);

                // Set the selected pin and its type
                setSelectedPin({ id, type: reportType });
                console.log("Selected pin set:", { id, type: reportType });

                setShowReportForm(true); // Show the report form
            }
        }
    };





    const getPinPosition = (id) => {
        return clonedPins.find((pin) => pin.id === id) || { x: 0, y: 0 };
    };

    const getPinIcon = (id) => {
        return pinData.find((pin) => pin.id === id) || {};
    };

    const updatePinPosition = (id, x, y) => {
        setClonedPins((prevPins) =>
            prevPins.map((pin) => (pin.id === id ? { ...pin, x, y } : pin))
        );
    };

    return (
        <Box>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 300,
                        backgroundColor: '#A8DADC',
                        color: '#fae6cfff',
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#1D3557', color: '#fae6cfff' }}>
                    <Typography variant="h6" component="div" sx={{ fontSize: '30px', fontWeight: 'bold', color: '#fae6cfff' }}>
                        PINS
                    </Typography>
                    <IconButton onClick={() => toggleDrawer(false)} sx={{ color: '#fae6cfff' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ backgroundColor: '#444' }} />

                <List sx={{ padding: '10px' }}>
                    {pinData.map(({ id, icon, hoverIcon, label }) => (
                        <ListItem
                            key={id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px 10px',
                                borderRadius: '10px',
                                marginBottom: '10px',
                                backgroundColor: '#1D3557',
                                opacity: 0.8,
                                '&:hover': {
                                    backgroundColor: '#457B9D',
                                },
                            }}
                            onMouseEnter={() => setHoveredPin(id)}
                            onMouseLeave={() => setHoveredPin(null)}
                            onClick={() => handlePinClick(id, true, label)}


                        >
                            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '15px' }}>
                                <img
                                    src={hoveredPin === id ? hoverIcon : icon}
                                    alt={label}
                                    style={{ width: 50, height: 'auto', borderRadius: '5px' }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Poppins, Arial, sans-serif',
                                    color: '#fae6cfff',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Render cloned pins */}
            <Box sx={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {clonedPins.map((pin) => (
                    <Box
                        key={pin.id}
                        sx={{
                            position: 'absolute',
                            top: pin.y,
                            left: pin.x,
                            width: 60,
                            height: 60,
                            cursor: 'grab',
                        }}
                        onMouseDown={(e) => handleMouseDown(e, pin.id)}
                        onClick={() => handlePinClick(pin.id, false, label)}

                    >
                        <img
                            src={pin.hoverIcon}
                            alt={pin.label}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Box>
                ))}
            </Box>

            {/* Only show the report form if the user confirmed */}
            {showReportForm && <Report pin={selectedPin} />}
        </Box>
    );
};

export default PinSidebar;

