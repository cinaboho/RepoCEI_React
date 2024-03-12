import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import {
    Box, Typography, Radio,
    RadioGroup, FormControlLabel
} from "@mui/material";


const RadioButtonCustom = (props) => {
    const { label, name, options, disabled, value, onChange, field, ...rest } = props;
    const { form: { setTouched, setFieldValue } } = props;

    const onSelect = (event) => {
        console.log(event.currentTarget.value)
        setFieldValue(field.name, event.currentTarget.value)
        onChange(event.currentTarget.value)
    }

    return (
        <RadioGroup name={name}  {...props} value={value}
            onChange={onSelect} sx={{ ml: 3 }}
        >
                {options.map((option) => {
                    return (
                                <FormControlLabel
                                    key={option.key}
                                    value={option.value}
                                    label={option.value}
                                    control={<Radio />}
                                    disabled={disabled}

                                    
                            />

                )})

                }
        </RadioGroup>

    );
};


const RadioButton = (props) => {

    return(
        <Box >
            <Field
                {...props}
                variant="outlined"
                component={RadioButtonCustom}
                style={{
                    display: "flex",

                }}


            />
            <ErrorMessage name={props.name} component={TextError} />

        </Box>
    )

}



export default RadioButton;



