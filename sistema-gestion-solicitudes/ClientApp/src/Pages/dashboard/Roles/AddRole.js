import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { BtnCancel, ButtonStyled, SwitchStyled } from "../../../Utils/CustomStyles";
import { Box, Typography } from "@mui/material"
import FormikControl from "../../../components/Form/FormControl";
import { useState } from 'react';
import { API_URL } from "../../../Utils/Variables";
import FormDialog from "../../../components/Dialog/Dialogo";

const AddRole = ({ open, handleClose, handleSnackBar }) => {
    const [toggle, setToggle] = useState(true);

    const initialValues = {
        nombre: "",
        maxUsers:"",
        estado:true,
    };
    const  onSubmit = async (values) => {

        const data = JSON.stringify({
            Nombre: values.nombre,
            Estado: toggle,
            MaxUsers: values.maxUsers,
        })
        let res = await fetch(API_URL + "/Roles/Create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
        })
        if (res.status === 200) {
            handleSnackBar(true, "Rol creado exitosamente");
            
        }
        else {
            handleSnackBar(false,"Error al crear rol");
        }

    }

    const validationSchema = yup.object({
        nombre: yup
            .string()
            .min(3, "Ingrese más de 3 caracteres")
            .required("Campo requerido"),
        maxUsers: yup
            .number()
            .positive('Ingrese un numero positivo')
            .required("Campo requerido"),

    });

    const handleToggle = () => {
        setToggle(!toggle);
    
        
    };

    return (
        <>
            <FormDialog title={"Nuevo Rol"} open={open} handleClose={handleClose}>

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
                                    name="nombre"
                                    target="Forms"
                                />
                                <FormikControl
                                    control="input"
                                    type="number"
                                    label="Número de Usuarios Permitidos"
                                    name="maxUsers"
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
export default AddRole;