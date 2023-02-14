import React, { useContext } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"

import '../styles/Navbar.scss';
import { UserContext } from './Main';
import PrivateLink from './Utils/PrivateLink';

const Navbar = () => {
    const user = useContext(UserContext);

    return (
        <div className="navbar">
            <div>
                <Link to="/">
                    <h2 className="title">TrainSystem</h2>
                </Link>
            </div>
            <div className="right">
                <PrivateLink route="/profile" label="Profil" icon={<AccountBoxIcon />} loggedIn={true} />
                <PrivateLink route="/login" label="Logowanie" icon={<LoginIcon />} loggedIn={false}/>
                <PrivateLink route="/register" label="Rejestracja" icon={<PeopleIcon />} loggedIn={false}/>
                <PrivateLink route="/logout" label="Wyloguj się" icon={<LogoutIcon />} loggedIn={true}/>
            </div>
        </div>
    );
};

export default Navbar;