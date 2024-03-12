import React from "react";
import { Formik, Field, Form, FieldArray} from "formik";
import { Box, Typography , IconButton, TextField} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { TypographyTitle } from "../../../../Utils/CustomStyles";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const FormikFieldArrayForm = ({ parameters , handleSubmit}) => (
    <Box>
        <Formik
            enableReinitialize 
            initialValues={parameters}
            onSubmit={values =>
                ///handleSubmit(values)
                console.log(values)
            }
        >
            {({ values }) => (
                <Form>
                    <FieldArray
                        name="paramLists"
                        render={arrayHelpers => (
                            <Box sx={{ display: 'flex' , flexDirection:'column'}}>
                                <Box sx={{ display: 'flex', alignItems: 'self-End' }}>
                                    <TypographyTitle>Observaciones reuniones</TypographyTitle>
                                    <IconButton sx={{ mr: 3 }} >
                                        <AddCircleIcon onClick={() =>
                                            arrayHelpers.push({ observacion: "" })
                                        } />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {console.log(values.paramLists)}
                                    {values.paramLists.length > 0 ?
                                        <>
                                            {values.paramLists.map((paramList, index) => (
                                                <Box key={index}>
                                                    {Object.keys(paramList).map(param => (
                                                        <>
                                                            <Field
                                                                as={TextField}
                                                                key={`${param}`}
                                                                name={`paramLists.${index}.${param}`}
                                                                placeholder={`${index}.${param}`}
                                                                size='small'
                                                               
                                                            />
                                                            <IconButton
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>
                                                    ))}

                                                </Box>

                                            ))
                                            }
                                        </>
                                        :
                                        <>
                                            <Box sx={{
                                                display: 'flex', justifyContent: 'center', width: '100%', border: '1px dashed grey',
                                                backgroundColor: '#2532600f', py: 2
                                            }}>
                                             
                                                    <Typography variant="subtitle2">
                                                        Ninguna observación realizada
                                                    </Typography>


                                                
                                            </Box>


                                    </>
                                    }
                                </Box>

                        </Box>

                        )}
                    />
                   

                </Form>
            )}
        </Formik>
    </Box>
);
export default FormikFieldArrayForm;