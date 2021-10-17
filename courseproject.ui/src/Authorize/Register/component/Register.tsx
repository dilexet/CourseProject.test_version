import React from 'react';
import {Avatar, Button, Grid, TextField, Typography} from '@mui/material';
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LinkMaterial from '@mui/material/Link';
import {Link, Redirect} from 'react-router-dom';
import {RegisterProps} from "../types/RegisterProps";

const Register: React.FC<RegisterProps> = ({t, redirect, handleSubmit}) => {
    if (redirect) {
        return <Redirect to='/login'/>
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
                {t("register.signUp")}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}} maxWidth="500px">
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t("register.email")}
                    name="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    label={t("register.name")}
                    name="name"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={t("register.password")}
                    type="password"
                    id="password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password-confirm"
                    label={t("register.passwordConfirm")}
                    type="password"
                    id="password-confirm"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {t("register.signUp")}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <LinkMaterial color='inherit' component={Link} to='/login'>
                            {t("register.HaveAccount")}
                        </LinkMaterial>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
}


export default Register;
