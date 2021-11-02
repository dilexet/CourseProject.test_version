import React, {useState} from 'react';
import Register from '../component/Register';
import {RegisterContainerProps} from "../types/RegisterContainerProps";
import {SchemaOf} from "yup";
import * as yup from "yup";
import {RegisterFormValues} from "../types/RegisterFormValues";
import {useActions} from "../hooks/useActions";
import {useTypeSelector} from "../../../Shared/hooks/useTypeSelector";

const RegisterContainer: React.FC<RegisterContainerProps> = ({t}) => {

    const [redirect, setRedirect] = useState(false);

    const {SignUp} = useActions();
    const registerState = useTypeSelector(x => x.register);

    // TODO: add regular expression from ./constants/RegularExpression
    const validationSchema: SchemaOf<RegisterFormValues> = yup.object({
        Email: yup
            .string()
            .email('Invalid email')
            .required('Please enter your email'),
        Name: yup
            .string()
            .min(5, 'Name should be of minimum 5 characters length')
            .max(40, 'Name is too long!')
            .required('Please enter your name'),
        Password: yup
            .string()
            .min(5, 'Password should be of minimum 5 characters length')
            .max(40, 'Password is too long!')
            .required('Please enter your password'),
        ConfirmPassword: yup
            .string()
            .oneOf([yup.ref("Password"), null], "Passwords must match")
            .required('Please confirm your password'),
    });

    const handleSubmit = (values: RegisterFormValues) => {
        SignUp(values)
        setRedirect(true)
    }

    return (
        <Register handleSubmit={handleSubmit} registerState={registerState} validation={validationSchema} t={t}
                  redirect={redirect}/>
    );
}


export default RegisterContainer;
