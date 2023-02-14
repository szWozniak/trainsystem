import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import { UserContext } from './Main';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(user == null) return navigate("/login");
    }, [user]);

    if(user == null) return (<></>)

    return (
        <div>
            Profil Użytkownika <b>{user.nickname}</b><br />
            ID: {user.id} <br />
            EMAIL: {user.email}
        </div>
    );
};

export default Profile;