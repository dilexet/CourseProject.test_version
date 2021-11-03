/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {createTheme} from '@mui/material';
import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";
import {useActions} from "../../Authorize/TokenVerify/hooks/useActions";
import App from "../component/App";

const AppContainer: React.FC = () => {
    const [cookie, setCookie] = useCookies();

    const {TokenVerify} = useActions();

    const {t, i18n} = useTranslation();
    const [language, setLanguage] = React.useState<string>(cookie.i18next === undefined ? 'en' : cookie.i18next);
    const [darkMode, setDarkMode] = React.useState<boolean>(cookie.DarkMode === undefined ? false : Boolean(JSON.parse(cookie.DarkMode)));

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    useEffect(() => {
        TokenVerify();
        if (cookie.DarkMode === undefined) {
            setCookie('DarkMode', darkMode, {
                path: '/',
                expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
            });
        }
        if (cookie.i18next === undefined) {
            i18n.changeLanguage(language);
        }
    }, []);

    return (
        <App darkMode={darkMode}
             setDarkMode={setDarkMode}
             darkTheme={darkTheme}
             lightTheme={lightTheme}
             setCookie={setCookie}
             language={language}
             setLanguage={setLanguage}
             t={t}
             i18n={i18n}/>
    );
}


export default AppContainer;
