import React from 'react';
import { useForm } from "react-hook-form";

import '../styles/Auth.scss';
import Input from './Forms/Input';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
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