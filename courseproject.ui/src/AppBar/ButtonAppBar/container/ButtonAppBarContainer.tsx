import {SelectChangeEvent} from '@mui/material/Select';
import ButtonAppBar from "../component/ButtonAppBar";
import {ButtonAppBarContainerProps} from "../types/ButtonAppBarContainerProps";
import React from "react";
import {useTypeSelector} from "../../../Shared/hooks/useTypeSelector";
import {useActions as useLogoutAction} from "../../../Authorize/Logout/hooks/useActions";
import {useActions as useTokenVerifyAction} from "../../../Authorize/TokenVerify/hooks/useActions";


const ButtonAppBarContainer: React.FC<ButtonAppBarContainerProps> = ({
                                                                         t,
                                                                         i18n,
                                                                         language,
                                                                         setLanguage,
                                                                         darkMode,
                                                                         setDarkMode,
                                                                         setCookie
                                                                     }) => {
    const {Logout} = useLogoutAction();
    const {TokenVerify} = useTokenVerifyAction();


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

    const handleLogoutClick = async () => {
        await Logout();
        await TokenVerify();
    }

    const isAuthorize = useTypeSelector(x => x.token_verify.isAuthorize)

    return (
        <ButtonAppBar t={t} isAuthorize={isAuthorize} language={language} darkMode={darkMode}
                      onChangeLanguage={onChangeLanguage}
                      onChangeTheme={onChangeTheme}
                      handleLogoutClick={handleLogoutClick}
        />
    );
}

export default ButtonAppBarContainer;