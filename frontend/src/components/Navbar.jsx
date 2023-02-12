import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
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
                <Link to="/profile">
                    <AccountBoxIcon />Profil
                </Link>
                <Link to="/login">
                    <LoginIcon />Logowanie
                </Link>
                <Link to="/register">
                    <PeopleIcon />Rejestracja
                </Link>
                <Link to="/logout">
                    <LogoutIcon />Wyloguj się
                </Link>
            </div>
        </div>
    );
};

export default Navbar;