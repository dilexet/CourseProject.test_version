import React from 'react';
import {Avatar, Button, Grid, Typography} from '@mui/material';
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LinkMaterial from '@mui/material/Link';
import {Link, Redirect} from 'react-router-dom';
import {LoginProps} from "../types/LoginProps";
import {Formik, Form, Field} from 'formik';
import {initialLoginFieldValues} from "../constants/InitialFieldValues";
import AuthorizeTextField from "../../Shared/component/AuthorizeTextField";
import {LoginFormValues} from '../types/LoginFormValues';

const Login: React.FC<LoginProps> = ({
                                         loginState,
                                         handleSubmit,
                                         validation,
                                         t,
                                         redirect
                                     }) => {

    if (!loginState.loading && loginState.data?.status === "success" && redirect) {
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

            <Typography component="h1" variant="h5" fontStyle={{color: "red"}}>
                {loginState.error ? loginState.error.message : ""}
            </Typography>

            <Formik
                initialValues={initialLoginFieldValues}
                validationSchema={validation}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values: LoginFormValues, {validateForm}) => {
                    validateForm(values)
                    handleSubmit(values)
                }}
            >
                {
                    ({values, errors, touched}) => (
                        <Box component={Form} sx={{mt: 1}} maxWidth="500px">
                            <Field
                                component={AuthorizeTextField}
                                autoFocus
                                autoComplete="login"
                                label={t("login.login")}
                                name="Login"
                                {...(((errors.Login && touched.Login) ||
                                    (loginState.error?.errors?.Login)) && {
                                    error: true,
                                    helperText: errors.Login || loginState.error?.errors?.Login
                                })}
                            />
                            <Field
                                component={AuthorizeTextField}
                                autoComplete="current-password"
                                type="password"
                                name="Password"
                                label={t("login.password")}
                                {...(((errors.Password && touched.Password) ||
                                    (loginState.error?.errors?.Password)) && {
                                    error: true,
                                    helperText: errors.Password || loginState.error?.errors?.Password
                                })}
                            />
                            <pre>
                                {JSON.stringify(values, null, 2)}
                            </pre>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={loginState.loading}
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
                    )
                }
            </Formik>
        </Box>
    );
}


export default Login;
