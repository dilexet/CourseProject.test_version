import React from 'react';
import {Avatar, Button, Grid, Typography} from '@mui/material';
import Box from "@mui/material/Box";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LinkMaterial from '@mui/material/Link';
import {Link, Redirect} from 'react-router-dom';
import {RegisterProps} from "../types/RegisterProps";
import {Formik, Form, Field} from 'formik';
import {RegisterFormValues} from "../types/RegisterFormValues";
import {initialRegisterFieldValues} from "../constants/InitialFieldValues";
import AuthorizeTextField from "../../Shared/component/AuthorizeTextField";

const Register: React.FC<RegisterProps> = ({
                                               registerState,
                                               handleSubmit,
                                               validation,
                                               t,
                                               redirect
                                           }) => {

    if (!registerState.loading && registerState.data?.status === "success" && redirect) {
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

            <Typography component="h1" variant="h5" fontStyle={{color: "red"}}>
                {registerState.error ? registerState.error.message : ""}
            </Typography>

            <Formik
                initialValues={initialRegisterFieldValues}
                validationSchema={validation}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values: RegisterFormValues, {validateForm}) => {
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
                                type='email'
                                name="Email"
                                autoComplete="email"
                                label={t("register.email")}
                                {...(((errors.Email && touched.Email) ||
                                    (registerState.error?.errors?.Email)) && {
                                    error: true,
                                    helperText: errors.Email || registerState.error?.errors?.Email
                                })}
                            />
                            <Field
                                component={AuthorizeTextField}
                                autoComplete="name"
                                type="text"
                                name="Name"
                                label={t("register.name")}
                                {...(((errors.Name && touched.Name) ||
                                    (registerState.error?.errors?.Name)) && {
                                    error: true,
                                    helperText: errors.Name || registerState.error?.errors?.Name
                                })}
                            />
                            <Field
                                component={AuthorizeTextField}
                                type="password"
                                name="Password"
                                autoComplete="current-password"
                                label={t("register.password")}
                                {...(((errors.Password && touched.Password) ||
                                    (errors.ConfirmPassword && touched.ConfirmPassword) ||
                                    (registerState.error?.errors?.Password || registerState.error?.errors?.ConfirmPassword)
                                ) && {
                                    error: true,
                                    helperText: errors.Password || registerState.error?.errors?.Password
                                })}
                            />
                            <Field
                                component={AuthorizeTextField}
                                type="password"
                                name="ConfirmPassword"
                                label={t("register.passwordConfirm")}
                                {...(((errors.ConfirmPassword && touched.ConfirmPassword) ||
                                    (registerState.error?.errors?.ConfirmPassword)) && {
                                    error: true,
                                    helperText: errors.ConfirmPassword || registerState.error?.errors?.ConfirmPassword
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
                    )

                }
            </Formik>
        </Box>
    );
}


export default Register;
