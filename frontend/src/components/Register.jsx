import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

import '../styles/Auth.scss';
import Input from './Forms/Input';

import AuthService from '../services/AuthService';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        AuthService.register(data)
            .then((res) => {
                if(res.data.status == "err") alert(res.data.err)
                else navigate("/login")
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="authForm">
                <Input type="text" field="nickname" label="Pseudonim" register={register} />
                <Input type="text" field="email" label="E-Mail" register={register} />
                <Input type="password" field="password" label="Hasło" register={register} />
                <Input type="password" field="passwordrepeat" label="Powtórz Hasło" register={register} />
                <input type="submit" value="Zarejestruj się!" />
            </div>
        </form>
    );
};

export default Register;