/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Switch, Route} from 'react-router-dom'
import ButtonAppBarContainer from "../../AppBar/ButtonAppBar/container/ButtonAppBarContainer";
import LoginContainer from "../../Authorize/Login/container/LoginContainer";
import RegisterContainer from "../../Authorize/Register/container/RegisterContainer";

import {ThemeProvider, CssBaseline} from '@mui/material';
import HomeContainer from "../../Home/container/HomeContainer";
import {AppProps} from "../types/AppProps";

const App: React.FC<AppProps> = ({
                           darkMode,
                           setDarkMode,
                           darkTheme,
                           lightTheme,
                           setCookie,
                           language,
                           setLanguage,
                           t,
                           i18n
                       }) => {
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline>
                <ButtonAppBarContainer setDarkMode={setDarkMode} darkMode={darkMode} setCookie={setCookie}
                                       setLanguage={setLanguage} language={language}
                                       t={t} i18n={i18n}
                />
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route path='/login' render={() => <LoginContainer t={t}/>}/>
                    <Route path='/register' render={() => <RegisterContainer t={t}/>}/>
                </Switch>
            </CssBaseline>
        </ThemeProvider>
    );
}


export default App;
