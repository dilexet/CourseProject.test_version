import React, {useState} from 'react';
import Register from '../component/Register';
import {RegisterContainerProps} from "../types/RegisterContainerProps";

const RegisterContainer: React.FC<RegisterContainerProps> = ({t}) => {

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            name: data.get('name'),
            password: data.get('password'),
            passwordConfirm: data.get('password-confirm'),
        });
        setRedirect(true)
    }

    return (
        <Register t={t} redirect={redirect} handleSubmit={handleSubmit}/>
    );
}


export default RegisterContainer;
