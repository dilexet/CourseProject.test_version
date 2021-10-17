/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import Login from "../component/Login";
import {LoginContainerProps} from "../types/LoginContainerProps";
import {useTypeSelector} from "../../../Shared/hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";
import {ILoginModel} from "../store/types/ILoginModel";

const initialFieldValues: ILoginModel = {
    Login: '',
    Password: ''
}


const LoginContainer: React.FC<LoginContainerProps> = ({t}) => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [values, setValues] = useState<ILoginModel>(initialFieldValues);
    const {sendLogin} = useActions();

    const state = useTypeSelector(state => state.login);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values)
        sendLogin(values)
        setRedirect(true)
        resetForm()
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        const fieldValue = {[name]: value}
        setValues({
            ...values,
            ...fieldValue
        })
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
    }

    console.log(state);

    return (
        <Login values={values} handleInputChange={handleInputChange} resetForm={resetForm} t={t} redirect={redirect} handleSubmit={handleSubmit}/>
    );
}


export default LoginContainer;
