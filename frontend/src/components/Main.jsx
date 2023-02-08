import React from 'react';
import Navbar from './Navbar';

import '../styles/Main.scss';
import { Routes, Route } from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import Register from './Register';

const Main = () => {
    return (
        <div className="main">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default Main;