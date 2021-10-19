/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import Login from "../component/Login";
import {LoginContainerProps} from "../types/LoginContainerProps";
import * as yup from 'yup';
import {SchemaOf} from "yup";
import {LoginFormValues} from "../types/LoginFormValues";
import {useActions} from "../hooks/useActions";
import * as actions from "../store/action-creator/loginActions";
import {useTypeSelector} from "../../../Shared/hooks/useTypeSelector";
import {RootState} from "../../../Shared/store/redusers";
import {connect} from "react-redux";

const LoginContainer: React.FC<LoginContainerProps> = ({t, signIn, loginState}) => {
    const [redirect, setRedirect] = useState<boolean>(false);

    // const {sendLogin} = useActions();
    // const loginState = useTypeSelector(x => x.login);




    // TODO: add regular expression from ./constants/RegularExpression
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

    function handleSubmit (values: LoginFormValues) {
        signIn(values)
        // setRedirect(true)
        console.log("handleSubmit:")
        console.log(loginState)
    }

    return (
        <Login handleSubmit={handleSubmit} loginState={loginState} validation={validationSchema} t={t}
               redirect={redirect}/>
    );
}

const mapStateToProps = (state: RootState) => ({
    loginState: state.login,
})

const mapActionToProps = {
    signIn: actions.SignIn,
}

export default connect(mapStateToProps, mapActionToProps)(LoginContainer);
