import React from 'react';
import Navbar from './Navbar';

import '../styles/Main.scss';
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Logout from './Utils/Logout';

const Main = () => {
    return (
        <div className="main">
            <Navbar />
            <Routes> 
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default Main;