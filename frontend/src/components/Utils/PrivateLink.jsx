import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { UserContext } from '../Main';

const PrivateLink = ({route, label, icon, loggedIn, ...props}) => {
    const { user } = useContext(UserContext);

    if((user == null && loggedIn) || (user != null && !loggedIn)) {
        return (<></>);
    }

    return (
        <Link to={route}>
            {icon} {label}
        </Link>
    );
};

export default PrivateLink;