import {TFunction} from "react-i18next";
import {SchemaOf} from "yup";
import {RegisterFormValues} from "./RegisterFormValues";
import {RegisterState} from "../store/types/RegisterTypes";

export type RegisterProps = {
    t: TFunction;
    registerState: RegisterState;
    redirect: boolean;
    validation: SchemaOf<RegisterFormValues>;
    handleSubmit: (values: RegisterFormValues) => void;
}