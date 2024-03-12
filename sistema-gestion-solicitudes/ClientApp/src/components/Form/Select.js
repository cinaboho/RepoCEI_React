import React from "react";
import TextError from "./TextError";
import { Box, MenuItem, Typography, Select, Chip } from "@mui/material"
import { Field, ErrorMessage } from "formik";
import CancelIcon from '@mui/icons-material/Cancel';




const SelectComponent = ({ name, options, value, onChange, label, placeholder, ...props }) => {


    const handleDelete = (e, value) => {
       
    }


    return (
        <>
            <Box sx={{display:'flex', flexDirection:'column', width:'100%', pb:1}}>
                <Typography variant="subtitle2" htmlFor={name}>{label}</Typography>
                <Select
                    size="small"
                    multiple
                    value={value}
                    name={name}
                    onChange={onChange}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                            {selected.map((value) => (
                                <>
                                    <Chip key={value} label={value}
                                        onDelete={handleDelete}
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        } 
                                    >   
                                    </Chip>
                                </>
                            ))}
                        </Box>
                    )}

                >   
                    <MenuItem key={0} value="">
                      Seleccionar Todos
                    </MenuItem>
                    {options.map((option) => {
                        return (
                            <MenuItem key={option.key} value={option.value}>
                                {option.value}
                            </MenuItem>
                        );
                    })}
                </Select>
                <ErrorMessage name={name} component={TextError} />

            </Box>

            </>
    )
};
export default SelectComponent;
