import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/css/Theme';

// Import all components at the top
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import History from './pages/History';
import Map from './components/Map';
import Report from './components/Report'; // Updated import to match the correct path
import DraggablePin from './components/DraggablePin';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/history" element={<History />} />
          <Route path="/map" element={<Map />} />
          <Route path="/report" element={<Report />} />
          <Route path="/pin" element={<DraggablePin />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
