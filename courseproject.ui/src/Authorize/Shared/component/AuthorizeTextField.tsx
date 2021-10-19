import React from 'react';
import {TextField, TextFieldProps} from '@mui/material';
import {FieldProps} from "formik";

const AuthorizeTextField: React.FC<FieldProps & TextFieldProps> = ({error, autoFocus, helperText, autoComplete, type, label,field}) => {
    return (
        <TextField
            error={error}
            margin="normal"
            fullWidth
            type={type}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            label={label}
            helperText={helperText}
            {...field}
        />
    );
}


export default AuthorizeTextField;
