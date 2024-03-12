import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import {
    Box, Typography
} from "@mui/material"

const TextArea = (props) => {
    const { label, name, placeholder, disabled, ...rest } = props;
    return (
        <Box sx={{ display: "flex", flexDirection: "column" , width:'100%', mb:1}}>
            {label && <Typography variant="subtitle2" htmlFor={name}>{label}</Typography> }
            <Field as="textarea" id={name} name={name} placeholder={placeholder} style={{ borderRadius: 3 }} disabled={disabled} />
            <ErrorMessage name={name} component={TextError} />
        </Box>
    );
};

export default TextArea;