import React, { useContext } from 'react';
import { useForm } from "react-hook-form";

import '../styles/Auth.scss';
import Input from './Forms/Input';

import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Main';
import { useEffect } from 'react';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(user != null) navigate("/profile")
    }, [user])
    
    const onSubmit = (data) => {
        AuthService.login(data)
            .then((res) => {
                if(res.data.status == "OK") {
                    localStorage.setItem("token", `Bearer ${res.data.token}`)
                    updateUser().then(() => {
                        navigate("/profile");
                    })
                } else {
                    alert("Błędny login lub hasło!");
                }
            })
    }

    if(user != null) return (<></>)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="authForm">
                <Input type="text" field="email" label="E-Mail" register={register} />
                <Input type="password" field="password" label="Hasło" register={register} />
                <input type="submit" value="Zaloguj się" />
            </div>
        </form>
    );
};

export default Login;