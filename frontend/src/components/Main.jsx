import React, {createContext} from 'react';
import Navbar from './Navbar';

import '../styles/Main.scss';
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Logout from './Utils/Logout';
import { useState } from 'react';
import { useEffect } from 'react';
import UserService from '../services/UserService';

export const UserContext = createContext();

const Main = () => {
    const [user, setUser] = useState(null);

    const updateUser = () => {
        return new Promise((resolve, reject) => {
            UserService.getProfile().then((res) => {
                if(res.data.status == "OK") setUser(res.data.user);
                else setUser(null)
                resolve();
            })
        })
    }

    useEffect(() => {
        updateUser();
    }, [])

    return (
        <div className="main">
            <UserContext.Provider value={{ user, updateUser }}>
                <Navbar />
                <Routes> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </UserContext.Provider>
        </div>
    );
};

export default Main;