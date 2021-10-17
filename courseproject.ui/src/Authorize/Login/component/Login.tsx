import React from 'react';
import {Avatar, Button, Grid, TextField, Typography} from '@mui/material';
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LinkMaterial from '@mui/material/Link';
import {Link, Redirect} from 'react-router-dom';
import {LoginProps} from "../types/LoginProps";

const Login: React.FC<LoginProps> = ({values, handleInputChange, resetForm, t, redirect, handleSubmit}) => {
    if (redirect) {
        return <Redirect to='/'/>
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {t("login.signIn")}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}} maxWidth="500px">
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label={t("login.email")}
                    name="Login"
                    autoComplete="email"
                    autoFocus
                    value={values.Login}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Password"
                    label={t("login.password")}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.Password}
                    onChange={handleInputChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {t("login.signIn")}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Typography>
                            {t("login.forgotPassword")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <LinkMaterial color='inherit' component={Link} to='/register'>
                            {t("login.notHaveAccount")}
                        </LinkMaterial>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
}


export default Login;
