/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './Home';
import ButtonAppBarContainer from "./AppBar/ButtonAppBar/container/ButtonAppBarContainer";
import LoginContainer from "./Authorize/Login/container/LoginContainer";
import RegisterContainer from "./Authorize/Register/container/RegisterContainer";

import {ThemeProvider, CssBaseline, createTheme} from '@mui/material';
import {useCookies} from "react-cookie";
import {useTranslation} from "react-i18next";


// TODO: создать обёртку для компонента App( к примеру Main, и сделать для Main контейнер с функциональностью)
// TODO: можно создать интерфейсы с полями как на беке, и принимать массив этого интерфейса
const App: React.FC = () => {
    const [cookie, setCookie] = useCookies();

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
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline>
                <ButtonAppBarContainer setDarkMode={setDarkMode} darkMode={darkMode} setCookie={setCookie}
                                       setLanguage={setLanguage} language={language}
                                       t={t} i18n={i18n}
                />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' render={() => <LoginContainer t={t}/>}/>
                    <Route path='/register' render={() => <RegisterContainer t={t}/>}/>
                </Switch>
            </CssBaseline>
        </ThemeProvider>
    );
}


export default App;
