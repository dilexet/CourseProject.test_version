/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import Login from "../component/Login";
import {LoginContainerProps} from "../types/LoginContainerProps";
import * as yup from 'yup';
import {SchemaOf} from "yup";
import {LoginFormValues} from "../types/LoginFormValues";
import {useActions} from "../hooks/useActions";
import {useTypeSelector} from "../../../Shared/hooks/useTypeSelector";
import {useActions as useTokenVerifyAction} from "../../TokenVerify/hooks/useActions";

const LoginContainer: React.FC<LoginContainerProps> = ({t}) => {
    const [redirect, setRedirect] = useState<boolean>(false);

    const {SignIn} = useActions();
    const {TokenVerify} = useTokenVerifyAction();

    const loginState = useTypeSelector(x => x.login);

    const validationSchema: SchemaOf<LoginFormValues> = yup.object({
        Login: yup
            .string()
            .min(3, 'Login should be of minimum 5 characters length')
            .max(40, 'Login is too long')
            .required('Please enter your login'),
        Password: yup
            .string()
            .min(3, 'Password should be of minimum 5 characters length')
            .max(40, 'Password is too long')
            .required('Please enter your password'),
    });

    const handleSubmit = async (values: LoginFormValues) => {
        await SignIn(values)
        await TokenVerify();
        setRedirect(true)
    }

    return (
        <Login handleSubmit={handleSubmit} loginState={loginState} validation={validationSchema} t={t}
               redirect={redirect}/>
    );
}

export default LoginContainer;
