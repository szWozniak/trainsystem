import React from 'react';
import { useForm } from "react-hook-form";

import '../styles/Auth.scss';
import Input from './Forms/Input';

import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        AuthService.login(data)
            .then((res) => {
                if(res.data.status == "OK") {
                    localStorage.setItem("token", `Bearer ${res.data.token}`)
                    navigate("/profile");
                } else {
                    alert("Błędny login lub hasło!");
                }
            })
    }

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