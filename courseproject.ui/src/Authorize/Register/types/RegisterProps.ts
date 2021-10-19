import {TFunction} from "react-i18next";
import {SchemaOf} from "yup";
import {RegisterFormValues} from "./RegisterFormValues";

export type RegisterProps = {
    t: TFunction;
    redirect: boolean;
    validation: SchemaOf<RegisterFormValues>;
    handleSubmit: (values: RegisterFormValues) => void;
}