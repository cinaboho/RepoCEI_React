import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { BtnCancel, ButtonStyled } from "../../../Utils/CustomStyles";
import { Box } from "@mui/material"
import FormikControl from "../../../components/Form/FormControl";
import { API_URL } from "../../../Utils/Variables";
import { useNavigate } from "react-router-dom";
import FormDialog from "../../../components/Dialog/Dialogo";


const CreateSolicitud = ({ open, handleClose, handleSnackBar }) => {
    const navigate = useNavigate();

    const initialValues = {
        titulo: "",  
    };

    const onSubmit = async (values) => {

        const user = localStorage.getItem('userEspol');
        const objUser= JSON.parse(user)


        const data = JSON.stringify({
            Titulo: values.titulo,
            UsuarioId: objUser.userId,
        })

        const response = await fetch(API_URL + "/Solicitud/Create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
        })

        if (response.ok) {
            const data = await response.json();
            handleSnackBar(true, "Solicitud generada exitosamente");
            navigate("/Solicitud/" + data.id);

        }
        else {
            handleSnackBar(false, "Error al generar solicitud");
        }
    }


    const validationSchema = yup.object({
        titulo: yup
            .string()
            .min(3, "Ingrese más de 3 caracteres")
            .required("Campo requerido")
    });

    return (
        <>
            <FormDialog title={"Nueva Solicitud"} open={open} handleClose={handleClose}>

                <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}

            >
                {(formik) => {
                    return (
                        <Form>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box sx={{ display: "flex" }}>
                                    <FormikControl
                                        control="input"
                                        type="text"
                                        label="Titulo Proyecto"
                                        name="titulo"
                                        target="Forms"
                                    />



                                 
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "space-around" }} >
                                    <ButtonStyled variant="contained" type="submit" sx={{ mt: 2 }} >
                                        Crear 
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
export default CreateSolicitud;