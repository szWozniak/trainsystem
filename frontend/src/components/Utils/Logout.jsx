import React, { useEffect, useContext    } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Main';

const Logout = () => {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    useEffect(() => {
        localStorage.removeItem("token");
        updateUser().then(() => {
            navigate("/login");
        })
    }, [])

    return (<></>);
};

export default Logout;