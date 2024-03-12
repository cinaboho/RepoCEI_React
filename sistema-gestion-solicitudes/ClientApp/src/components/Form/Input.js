import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Typography, Box, TextField, Container } from "@mui/material"

const Input = (props) => {
    const { label, name, type, target, disabled, ...rest } = props;
    return (
        <>
            {target === "Forms" ?
                <Box sx={{ pb: 2 }}>
                    <Typography variant="subtitle2" htmlFor={name}>{label}</Typography>
                    <Field as={TextField} id={name} name={name} {...rest} type={type} size="small" disabled={disabled}/>
                    <ErrorMessage name={name} component={TextError} />
                </Box>
                :
                <Field as={TextField} id={name} name={name}
                    type={type} {...rest} size="small" variant="standard"
                    placeholder={label}
                    sx={{ pl: 1, pr: 1, verticalAlign: 'super' }} inputProps={{ min: 0, style: { textAlign: 'center' } }} disabled={disabled} />

        }
        </>
        
       
    );
};

export default Input;


//sx={{ pr: 3 , pb:1}}