import {TFunction} from "react-i18next";
import {LoginState} from "../store/types/LoginTypes";
import {LoginFormValues} from "./LoginFormValues";

export type LoginContainerProps = {
    t: TFunction;
    loginState: LoginState;
    signIn: (data: LoginFormValues) => void;
}