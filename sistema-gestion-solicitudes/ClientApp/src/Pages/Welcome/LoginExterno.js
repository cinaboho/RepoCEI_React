import { Grid, Box, AppBar, Toolbar, Button, Typography, CardMedia, Divider } from "@mui/material"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { ButtonStyled } from "../../Utils/CustomStyles";
import logo from "../../assets/logo.png";
import FormikControl from "../../components/Form/FormControl";
import { Formik, Form } from "formik";
import * as yup from "yup";
import banner from "../../assets/banner.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { API_URL } from "../../Utils/Variables";

const LoginPage = () => {

    const navigate = useNavigate();

    const initialValues = {
        correo: "",
        contrasena: "",


    };

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // Puede ser 'success' o 'error'


    
    const onSubmit = async (values) => {

        let dataObjLogin={
            Correo: values.correo,
            ContrasenaHash: values.contrasena,
            username: "",
        }
        const dataLogin = JSON.stringify(dataObjLogin)
       
        let res = await fetch(API_URL + `/User/api/Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataLogin,
        })
        
        
        console.log('respuesta login: ',res.status)
        
        if (res.status === 200) {
            console.log('login exitoso')
            setAlertMessage('Login exitoso!');
            setAlertSeverity('success');
            setOpenSnackbar(true);
            
            let responseContent = await res.json();
            console.log('responseContent: ',responseContent)
            
            const selectOptions = responseContent.roles.map(role => `<option value="${role.nombre}">${role.nombre}</option>`).join(''); // Generar opciones del select

            Swal.fire({
            title: 'Selecciona tu rol',
            html: `<select id="swal-input2" class="swal2-input">${selectOptions}</select>`, // Usar las opciones generadas
            focusConfirm: false,
            allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera
            preConfirm: () => {
                return document.getElementById('swal-input2').value; // Obtener el valor seleccionado
            }
            }).then((result) => {
            if (result.value) {
                console.log('Seleccionaste:', result.value);

                for(let i = 0; i < responseContent.roles.length; i++) {
                    let objRol=responseContent.roles[i];
                    console.log(objRol['nombre'])
                    if(objRol['nombre']==result.value) {
                        console.log('bien')
                        responseContent.roles=[objRol]
                        console.log('responseContent: ',responseContent)
                        localStorage.setItem('userEspol', JSON.stringify(responseContent));

                        setTimeout(()=>{
                            navigate('/solicitudes');
                        },3000)
                    }
                }
            }
            });

            
            

        }
        else {
            console.log('login fallido')
            setAlertMessage('Login fallido, Credenciales inválidas');
            setAlertSeverity('error');
            setOpenSnackbar(true);
        }
       
    }

    
    const validationSchema = yup.object({
        correo: yup
            .string()
            .email('Formato de email incorrecto')
            .required('Correo es requerido'),
        contrasena: yup
            .string()
            .max(20)
            .required('Contraseña requerido'),
    });


    return (

        <>
            <Box sx={{
                display: 'grid',
                height: '100vh',
                gridTemplateRows: 'auto 50% 15%',
                gridTemplateAreas: `"header header header header"
                                          "main  right right right"
                                          `,
                gridArea: 'main', display: 'flex',
                alignItems: 'center',    
                backgroundColor:'#2d3b45'              
            }}>

           
               

                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        
                        <Grid item xs={12} sx={{ width: '100%', backgroundColor: "#fff", p: 2, backgroundColor:'#2d3b45'}} >
                            
                            <Grid item sx={{ m: {xs: 1, sm: 2  } }}>
                                
                                
                                <Formik
                                        initialValues={initialValues}
                                        onSubmit={onSubmit}
                                        validationSchema={validationSchema}

                                    >
                                        
                                        {(formik) => {
                                        return (
                                            
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p:3, color: 'white'}}>
                                                    
                                                    
                                                    <Form>   
                                                        <Divider  sx={{ mb:3, fontSize: '2.5rem'}}>
                                                            INICIO SESIÓN USUARIO EXTERNO
                                                        </Divider>

                                                        <FormikControl
                                                            control="input"
                                                            type="text"
                                                            label="Correo Electrónico"
                                                            name="correo"
                                                            target="Forms"
                                                            style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '100%' }}
                                                        />

                                                        <FormikControl
                                                            control="input"
                                                            type="password"
                                                            label="Contraseña"
                                                            name="contrasena"
                                                            target="Forms"
                                                            style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px' , width: '100%' }}
                                                    />

                                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pr: 3}} >
                                                        <ButtonStyled variant="contained" type="submit" sx={{ mt: 2, width: '40%', backgroundColor: '#2d3b45', border: '2.5px solid white' }} >
                                                                Iniciar Sesión
                                                        </ButtonStyled>

                                                        <ButtonStyled variant="contained" component={Link} to="/" sx={{ mt: 2, width: '40%', backgroundColor: '#2d3b45', border: '2.5px solid white' }} >
                                                                Salir
                                                        </ButtonStyled>
                                                        
                                                        <Typography sx={{ mt: 1, textDecoration: 'underline',  color: 'white' }} component={Link} to="/Registro" variant="subtitle2">
                                                            Crear cuenta
                                                        </Typography>
                                                       
                                                    </Box>
                                                   

                                                    </Form>
                                                </Box>
                                            );
                                        }}
                                </Formik>

                                  
                            </Grid>
                           
                           
                        </Grid>
                    </Grid>
                </Box>


        </>

        
    )
}

export default LoginPage;
