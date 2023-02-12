import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({});

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token == null) return navigate("/login");

        UserService.getProfile().then((res) => {
            if(res.data.status != "OK") return navigate("/login");
            setUser(res.data.user)
        })
    }, [])

    return (
        <div>
            Profil Użytkownika <b>{user.nickname}</b><br />
            ID: {user.id} <br />
            EMAIL: {user.email}
        </div>
    );
};

export default Profile;