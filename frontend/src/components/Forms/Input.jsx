import React from 'react';

const Input = ({type, field, label, register}) => {
    return (
        <>
            {label}
            <input 
                type={type}
                placeholder={label}
                {...register(field, { required: true })}
            />
        </>
    );
};

export default Input;