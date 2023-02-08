import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom"

import '../styles/Navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar">
            <div>
                <Link to="/">
                    <h2 className="title">TrainSystem</h2>
                </Link>
            </div>
            <div className="right">
                <Link to="/login">
                    <LoginIcon />Logowanie
                </Link>
                <Link to="/register">
                    <PeopleIcon />Rejestracja
                </Link>
            </div>
        </div>
    );
};

export default Navbar;