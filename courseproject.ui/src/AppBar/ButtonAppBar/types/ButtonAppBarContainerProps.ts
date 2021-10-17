import {TFunction} from "react-i18next";
import i18n from "../../../i18n";

import {CookieSetOptions} from 'universal-cookie';

export type ButtonAppBarContainerProps = {
    t: TFunction;
    i18n: typeof i18n;

    language: string;
    setLanguage: (language: string) => void;

    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;

    setCookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void;
}