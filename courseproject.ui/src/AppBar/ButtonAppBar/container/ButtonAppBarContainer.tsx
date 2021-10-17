import {SelectChangeEvent} from '@mui/material/Select';
import ButtonAppBar from "../component/ButtonAppBar";
import {ButtonAppBarContainerProps} from "../types/ButtonAppBarContainerProps";
import React from "react";


const ButtonAppBarContainer: React.FC<ButtonAppBarContainerProps> = ({
                                                                         t,
                                                                         i18n,
                                                                         language,
                                                                         setLanguage,
                                                                         darkMode,
                                                                         setDarkMode,
                                                                         setCookie
                                                                     }) => {

    const onChangeTheme = () => {
        setCookie('DarkMode', !darkMode, {
            path: '/',
            expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
        });
        setDarkMode(!darkMode);
    }

    const onChangeLanguage = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
        i18n.changeLanguage(event.target.value);
    };

    return (
        <ButtonAppBar t={t} language={language} darkMode={darkMode} onChangeLanguage={onChangeLanguage}
                      onChangeTheme={onChangeTheme}/>
    );
}

export default ButtonAppBarContainer;