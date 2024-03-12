import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { BtnCancel, ButtonStyled, SwitchStyled } from "../../../Utils/CustomStyles";
import { Box, Typography } from "@mui/material"
import FormikControl from "../../../components/Form/FormControl";
import { useState } from 'react';
import { API_URL } from "../../../Utils/Variables";
import FormDialog from "../../../components/Dialog/Dialogo";

const EditEspecialidad = ({ open, handleClose, handleSnackBar,data }) => {
    const [toggle, setToggle] = useState(true);

    const initialValues = {
        id: data?.id,
        nombre: data?.nombre || "", // Usar el nombre de la especialidad si está disponible
        estado: data?.estado || true, // Usar el estado de la especialidad si está disponible
    };
    const  onSubmit = async (values) => {

        const data = JSON.stringify({
            id: values.id,
            nombre: values.nombre,
            estado: toggle,
        })
        let res = await fetch(API_URL + `/Especialidad/${values.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: data,
        })
        if (res.status === 200) {
            handleSnackBar(true, "Especialidad editado exitosamente");
            
        }
        else {
            handleSnackBar(false,"Error al editar especialidad");
        }

    }

    const handleToggle = () => {
        setToggle(!toggle);
    
        
    };

    return (
        <>
            <FormDialog title={"Editar Especialidad"} open={open} handleClose={handleClose}>

                <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                
            >
                {(formik) => {
                    return (
                        <Form>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <FormikControl
                                    control="input"
                                    type="text"
                                    label="Nombre"
                                    name="nombre"
                                    target="Forms"
                                />
                                <Typography> Estado </Typography>  
                                <SwitchStyled
                                    name="Estado"
                                    onChange={handleToggle}
                                    checked={toggle}
                                    
                                />
                                
                                <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                                    <ButtonStyled variant="contained" type="submit" sx={{ mt: 2 }} >
                                        Actualizar
                                    </ButtonStyled>
                                    <BtnCancel variant="outlined" color="error" type="button" sx={{ mt: 2 }} onClick={handleClose} >
                                        Cancelar
                                    </BtnCancel>

                                </Box>
                            </Box>



                        </Form>
                    );
                }}
                </Formik>
            </FormDialog>
        </>
    );
};
export default EditEspecialidad;