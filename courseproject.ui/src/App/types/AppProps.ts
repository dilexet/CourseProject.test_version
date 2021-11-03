import {TFunction} from "react-i18next";
import React from "react";
import {Theme} from "@mui/material";
import {CookieSetOptions} from "universal-cookie";
import {i18n} from "i18next";

export type AppProps = {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    darkTheme: Theme;
    lightTheme: Theme;
    setCookie: (name: string, value: any, options?: (CookieSetOptions | undefined)) => void
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>
    t: TFunction;
    i18n: i18n;
}