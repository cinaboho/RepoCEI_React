import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { BtnCancel, ButtonStyled, SwitchStyled } from "../../../Utils/CustomStyles";
import { Box, Typography } from "@mui/material"
import FormikControl from "../../../components/Form/FormControl";
import { useState } from 'react';
import { API_URL } from "../../../Utils/Variables";
import FormDialog from "../../../components/Dialog/Dialogo";

const AddEspecialidad = ({ open, handleClose, handleSnackBar }) => {
    const [toggle, setToggle] = useState(true);

    const initialValues = {
        name: "",
        estado: true,
       
    };
    const onSubmit = async (values) => {

        const data = JSON.stringify({
            Nombre: values.name,
            Estado: toggle
        })
        let res = await fetch(API_URL + "/Especialidad/Create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
        })
        if (res.status === 200) {
            handleSnackBar(true,"Especialidad creada exitosamente");
        }
        else {
            handleSnackBar(false, "Error al crear especialidad");
        }
    }




    const validationSchema = yup.object({
        name: yup
            .string()
            .min(3, "Ingrese más de 3 caracteres")
            .required("Campo requerido"),
        
    });

    const handleToggle = () => {
        setToggle(!toggle);


    };



    return (
        <>  
            <FormDialog title={"Nueva Especialidad"} open={open} handleClose={handleClose}>

                <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <FormikControl
                                    control="input"
                                    type="text"
                                    label="Nombre"
                                    name="name"
                                    target="Forms"
                                />

                                <Typography> Estado  </Typography>
                                <SwitchStyled
                                    name="Estado"
                                    onChange={handleToggle}
                                    checked={toggle}

                                />



                                <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                                    <ButtonStyled variant="contained" type="submit" sx={{ mt: 2 }} >
                                        Agregar
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
export default AddEspecialidad;