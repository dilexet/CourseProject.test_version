import {TFunction} from "react-i18next";
import React from "react";

export type RegisterProps = {
    t: TFunction;
    redirect: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}