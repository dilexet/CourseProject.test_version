import {TFunction} from "react-i18next";
import {SchemaOf} from "yup";
import {LoginFormValues} from "./LoginFormValues";
import {LoginState} from "../store/types/LoginTypes";

export type LoginProps = {
    t: TFunction;
    loginState: LoginState;
    redirect: boolean;
    validation: SchemaOf<LoginFormValues>;
    handleSubmit: (values: LoginFormValues) => void;
}