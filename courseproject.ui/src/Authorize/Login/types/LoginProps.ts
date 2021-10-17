import {TFunction} from "react-i18next";
import React from "react";
import {ILoginModel} from "../store/types/ILoginModel";

export type LoginProps = {
    values: ILoginModel,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    resetForm: () => void;
    t: TFunction;
    redirect: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}