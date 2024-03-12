import {
    TextField, Autocomplete,
    Box,
    Paper,
    Checkbox,
    FormControlLabel,
    Divider, Typography

} from '@mui/material'
import { useState } from "react";
import TextError from "./TextError";
import {Field, ErrorMessage } from "formik";


const AutoCompleteComponent = (props) => {

    const { label, options, name, value, onSelect, selectAllLabel, field } = props;
    const { form: { setTouched, setFieldValue } } = props;
    const [selectAll, setSelectAll] = useState(false);


    const handleToggleSelectAll = () => {
        setSelectAll((prev) => {
            if (!prev) {
                onSelect([...options]);
                setFieldValue(field.name, options);

            }
            else {
                onSelect([]);
                setFieldValue(field.name, []);
                
            }
            return !prev;
        });
    };


    return (
        <>  
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', py: 2 }}>
                <Autocomplete
                  
                    multiple
                    options={options}
                    onChange={(_e, value, reason) => {
                        if (reason === "clear" || reason === "removeOption")
                            setSelectAll(false);
                        if (reason === "selectOption" && value.length === options.length)
                            setSelectAll(true);
                        onSelect(value);
                        setFieldValue(field.name,value);
                       
                    }}
                    fullWidth
                    value={value}
                    disableCloseOnSelect
                    filterSelectedOptions
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                        <>
                            <TextField {...params} name={name } label={label} />
                            
                        </>
                        
                     )}
                    PaperComponent={(paperProps) => {
                        const { children, ...restPaperProps } = paperProps;
                        return (
                            <Paper {...restPaperProps}>
                                <Box
                                    onMouseDown={(e) => e.preventDefault()} // prevent blur
                                    pl={1.5}
                                    py={0.5}
                                >
                                    <FormControlLabel
                                        onClick={(e) => {
                                            e.preventDefault(); // prevent blur
                                            handleToggleSelectAll();
                                        }}
                                        label={selectAllLabel}
                                        control={
                                            <Checkbox id="select-all-checkbox" checked={selectAll} />
                                        }
                                    />
                                </Box>
                                <Divider />
                                {children}
                            </Paper>

                        )
                    }}

                    
                />
                
        </Box>     


        </>
    )

};

const FormikAutocomplete = (props) => {
    

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }}>
            <Field
                {...props}
                variant="outlined"
                component={AutoCompleteComponent}
                style={{
                    display: "flex",

                }}

                          
            />
            <ErrorMessage name={props.name} component={TextError} />

        </Box>



    )


}; export default FormikAutocomplete; 