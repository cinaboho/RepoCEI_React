import {
    Grid, Box, AppBar, Toolbar, 
    CardContent, Typography, CardMedia
} from "@mui/material"
import { Link , Outlet} from "react-router-dom";
import { authUrl } from "../../Utils/Variables"
import Footer from "../../components/Footer/Footer";
import { ButtonStyled, CardLogin, TypographyTitle } from "../../Utils/CustomStyles";
import logo from "../../assets/logo.png";
import background from "../../assets/background.jpg";

import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { API_URL } from "../../Utils/Variables";

import MetodosAxios from '../../Servicios/MetodosAxios';


const redirectToLogout = () => {
    Cookies.remove(process.env.REACT_APP_ESPOL_COOKIE_JWT);
    //navigate('/account/login');
    window.location.href = process.env.REACT_APP_CAS_URL + "/logout";
    
};


async function loginInterno(correo){

    // Swal.fire({
    //     title: "Iniciando sesion",
    //     html: "Espere un momento",
    //     //timer: 10000,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //       Swal.showLoading();
    //     }
    //   }).then((result) => {
    //     /* Read more about handling dismissals below */
    //     if (result.dismiss === Swal.DismissReason.timer) {
    //       console.log("I was closed by the timer");
    //     }
    //   });

    let dataObjLogin={
        Correo: correo
    }
    const dataLogin = JSON.stringify(dataObjLogin)
   
    let res = await fetch(API_URL + `/User/api/LoginInterno`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataLogin,
    })
    
    
    console.log('respuesta login: ',res.status)
    
    if (res.status === 200) {
        console.log('login exitoso')
        //setAlertMessage('Login exitoso!');
        //setAlertSeverity('success');
        //setOpenSnackbar(true);
        
        let responseContent = await res.json();
        console.log('responseContent 1: ',responseContent)
        
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
                        localStorage.setItem('userEspol', JSON.stringify(responseContent));
                        localStorage.setItem('access','1')

                        setTimeout(()=>{
                            window.location.href = '/solicitudes';
                
                        },1000)
                    }
                }
            }
            });
        
        

    }
    else {
        console.log('login fallido')
        //setAlertMessage('Login fallido, Credenciales inválidas');
        //setAlertSeverity('error');
        //setOpenSnackbar(true);
    }
}
async function checkAuthentication() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let token = Cookies.get('ProduccionGTSIESPOLtoken');
    
    console.log('token: ',token)
    
    if (token) {
        //navigate('/counter');
        const tokendecode= jwt(token); 
        //console.log(tokendecode);
        let fechaActual = Math.floor(Date.now() / 1000);
        //console.log(fechaActual);
        if ((tokendecode.exp - fechaActual) > 0) {
            //setIsAuth(true);
            //setNombresUsuario(tokendecode.nombres);
            console.log('tiene login aun')
            let objUserEspolInterno=JSON.parse(localStorage.getItem('userEspolInterno'))
            loginInterno(objUserEspolInterno['emailId'])

            //redirectToLogout()

            return null;
        } else {                
            //setIsAuth(false);
            //setNombresUsuario("");
            //Swal.fire({
            //    title: 'Su sesi�n ha caducado. Vuelva a iniciar la sesi�n',
            //    icon: "error"
            //});
            console.log('sesion caducada, vuelta a iniciar sesion')
        }
    }


    if (!urlParams.has('ticket')) {
        console.log('nada')
        //redirectToLogout()

        return null;
    }

    console.log('ticket: ',urlParams.get('ticket'))
    //showLoading("Verificando credenciales...");
    MetodosAxios.autenticar({ ticket: urlParams.get('ticket') }); //JWT
    
}



const LoginPage = () => { 

        
        checkAuthentication();
        //redirectToLogout();
        
        return (

            <>
                <Box sx={{
                    display: 'grid',
                    height: '100vh',
                    gridTemplateRows: 'auto 85% 15%',
                    gridTemplateAreas: `"header header header header"
                                          "main main main main"
                                          "footer footer footer footer"`,
                } }>


                    <Grid sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>
                        <AppBar position="static">
                            <Toolbar sx={{ backgroundColor: '#253260' }}>
                                <Box sx={{ display: 'flex', alignItems:'center' }}>
                                    <CardMedia
                                        component="img"
                                        image={logo}
                                        title="logo espol"
                                        sx={{ width: '130px' }}

                                    />
                                    <Box sx={{ display: 'flex' , flexDirection:'column', pl:5}}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            Comité de Ética en Investigación
                                        </Typography>
                                    </Box>
                                    

                                </Box>
                                


                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Box sx={{
                        gridArea: 'main', display: 'flex',
                        alignItems: 'center', backgroundImage: `url(${background})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <Grid container spacing={15} sx={{p:25}}>
                            <Grid item xs={11} md={6}>
                                <CardLogin >
                                    <CardContent>
                                        <TypographyTitle >
                                            Usuario Espol

                                        </TypographyTitle>
                                        <ButtonStyled variant="contained" component={Link} to={authUrl}>
                                            Continuar
                                        </ButtonStyled>
                                    </CardContent>
                                </CardLogin>
                            </Grid>
                            <Grid item xs={11} md={6}>
                                <CardLogin>
                                    <CardContent>
                                        <TypographyTitle  >
                                            Usuario Externo
                                        </TypographyTitle>
                                        <ButtonStyled variant="contained" component={Link} to="/LoginExt">
                                            Continuar
                                        </ButtonStyled>
                                    </CardContent>
                                </CardLogin>

                            </Grid>      
                        </Grid>
                        <Outlet />
                    </Box>
                    <Box sx={{ gridArea: 'footer' }}>
                        <Grid item xs={12}>
                            <Footer></Footer>
                        </Grid>
                    </Box>
                        
                </Box>
       
               

            </>
        )
    }

export default LoginPage;
