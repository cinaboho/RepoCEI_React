import { Formik, Form } from "formik";
import * as yup from "yup";
import FormDialog from "../../../../components/Dialog/Dialogo";
import { Box , Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import FormikControl from "../../../../components/Form/FormControl";
import { ButtonStyled, BtnCancel } from "../../../../Utils/CustomStyles";
import { API_URL } from "../../../../Utils/Variables";
import { useEffect, useState } from "react";

const InvitationForm = (props) => {

    const { openDialog, handleCloseDialog } = props;

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [open, setOpen] = useState(false);

    const initialValues = {
        correo: '',
        mensaje:'',
    }

    const validationSchema = yup.object({
        correo: yup
            .string()
            .email('Formato de email incorrecto')
            .required('Correo requerido'),

        mensaje: yup
            .string()
            .required('Mensaje requerido')
    });

    const onSubmit = async (values, { resetForm }) => {
        const dataInvitacion = JSON.stringify({
            Email: values.correo,
            Mensaje: values.mensaje,
        })

        console.log("dataInvitacion: ",dataInvitacion);

        let res = await fetch(API_URL + "/NewInvitation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataInvitacion,
        })
        if (res.status === 200) {
            setMessage('Invitacion enviada exitosamente')
            setSeverity('success');
            setOpen(true);
            resetForm({});

        }
        else {
            setMessage('Error al enviar invitacion')
            setSeverity('error');
            setOpen(true);

            res.json().then((value)=>{
                console.log('value: ',value)
            })
            
        }


    }


    

    return (
        <>
            <FormDialog title={"Invitación"} open={openDialog} handleClose={handleCloseDialog}>

                <Box sx={{ display: 'flex', flexDirection:'column'}}>
                    <Box sx={{display:'flex', mb:2, alignItems:'center'}}>
                        <EmailIcon sx={{mr:2}} />
                        <Typography variant="subtitle2">
                            Correo Electrónico
                        </Typography>    
                    </Box>
                    
                    <Box>
                        
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}

                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box sx={{ display: "flex" , flexDirection:'column'}}>
                                                <FormikControl
                                                    control="input"
                                                    type="email"
                                                    label="Correo Agente externo"
                                                    name="correo"
                                                    target="Forms"
                                                />

                                                <FormikControl
                                                    control="textarea"
                                                    type="text"
                                                    label="Mensaje"
                                                    name="mensaje"
                                                    placeholder="Mensaje invitación"
                                                />



                                            </Box>

                                            <Box sx={{ display: "flex", justifyContent: "space-around" }} >
                                                <ButtonStyled variant="contained" type="submit" sx={{ mt: 2 }} >
                                                    Invitar
                                                </ButtonStyled>
                                                <BtnCancel variant="outlined" color="error" type="button" sx={{ mt: 2 }} onClick={handleCloseDialog} >
                                                    Cancelar
                                                </BtnCancel>

                                            </Box>
                                        </Box>



                                    </Form>
                                );
                            }}
                        </Formik>


                    </Box>
                </Box>
                
                
              
            



            </FormDialog>

        </>

    )


}; export default InvitationForm;
