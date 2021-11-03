import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ButtonAppBarProps} from "../types/ButtonAppBarProps";


const ButtonAppBar: React.FC<ButtonAppBarProps> = ({
                                                       t,
                                                       isAuthorize,
                                                       language,
                                                       darkMode,
                                                       onChangeLanguage,
                                                       onChangeTheme,
                                                       handleLogoutClick
                                                   }) => {

    const isAuth = (
        <Box>
            <Button color="inherit" onClick={handleLogoutClick.bind(this)}>
                {t("description.logout")}
            </Button>
        </Box>
    )

    const isNotAuth = (
        <Box>
            <Button color="inherit" component={Link} to='/login'>
                {t("description.login")}
            </Button>
            <Button color="inherit" component={Link} to='/register'>
                {t("description.register")}
            </Button>
        </Box>
    )

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Button color="inherit" component={Link} to='/'>
                            {t("description.home")}
                        </Button>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <IconButton sx={{ml: 1}} onClick={onChangeTheme}
                                    color="inherit">
                            {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Typography>
                    {isAuthorize ? isAuth : isNotAuth}
                    <Box>
                        <FormControl sx={{m: 1, minWidth: 80}}>
                            <InputLabel id="demo-simple-select-autowidth-label"
                                        style={{color: "#FFFFFF"}}>Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={language}
                                onChange={onChangeLanguage}
                                autoWidth
                                label="Language"
                                style={{color: "#FFFFFF"}}
                            >
                                <MenuItem value={'ru'}>Русский</MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonAppBar;