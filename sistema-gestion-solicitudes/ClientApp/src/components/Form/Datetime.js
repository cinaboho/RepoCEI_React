import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Typography, Box, TextField, Container } from "@mui/material"

const DateTimePicker = (props) => {
    const { label, name, defaultValue, ...rest } = props;
    //const { form: { setFieldValue } } = props;




    return (
        <>
            <Field as={TextField} id={name} name={name}  {...rest} size="small" sx={{ pl: 1, pr: 1, verticalAlign: 'super' }} />

        </>


    );
};

export default DateTimePicker;


//sx={{ pr: 3 , pb:1}}