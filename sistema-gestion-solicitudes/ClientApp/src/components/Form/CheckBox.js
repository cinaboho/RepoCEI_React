import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import {
    Box, Typography,

} from "@mui/material"



const Checkbox = (props) => {

    const { label, name, options, disabled, ...rest } = props;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml:3}}>
            <Field name={name} {...rest} >
                {({ field }) => {
                    return options.map(({ key, value }, index) => {

                        return (
                            <Box sx={{ display: 'flex', alignItems: 'center' , m:0.6}} key={key}>
                                <input
                                    
                                    type="checkbox"
                                    id={key}
                                    {...field}
                                    value={index} 
                                    disabled={disabled}
                                />
                                <Typography variant="subtitle1" htmlFor={value} style={{ marginLeft: '7px' }}>{value}</Typography>
                            </Box>
                        );
                    });
                }}
            </Field>
            <ErrorMessage name={props.name} component={TextError} />
        </Box>
    );
};

export default Checkbox;


/*
import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import {
    Box, Typography, Checkbox ,
    FormGroup, FormControlLabel
} from "@mui/material";
import { useState, useEffect } from "react";


const CheckField = (props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }}>
            <Field
                {...props}
                variant="outlined"
                name={props.name }
                component={CheckBoxGroup}
                style={{
                    display: "flex",

                }}

            />
            <ErrorMessage name={props.name} component={TextError} />

        </Box>



    )


}; export default CheckField;




const CheckBoxGroup = (props) => {
    const { label, options, field, values, form, array, setArray, ...rest } = props;
    const { form: { setTouched, setFieldValue } } = props;

    const [checked, setChecked] = useState([]);

  



    return (
        <FormGroup >
            {options.map(({ key, value, nombre }, index) => { 
                return(
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox name={field.name} />
                        }
                        label={nombre}
                        name={field.name}
                        value={key}

                       

                    />
                    )
                })
            }


        </FormGroup>



    );
};


*/
/*

<Box sx={{ display: 'flex', m: 1 }}>
            {options.map((option) => {
                return (
                    <>
                        <input
                            type="checkbox"
                            id={option.value}
                            value={option}
                            key={option.value}
                            onChange={handleChange}
                            name={field.name}

                        />
                        <Typography htmlFor={option.value} style={{ marginLeft: '7px' }}>{option.key}</Typography>
                    
                    
                    </>
                                 

                )



            })}

        </Box>

        */
