import {
    Grid, Box, AppBar, Toolbar, Button,
    Typography, CardMedia, Divider
} from "@mui/material"
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { ButtonStyled } from "../../Utils/CustomStyles";
import logo from "../../assets/logo.png";
import FormikControl from "../../components/Form/FormControl";
import { Formik, Form } from "formik";
import * as yup from "yup";
import banner from "../../assets/banner.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SnackbarComponent from "../../components/Snackbar";
import { API_URL } from "../../Utils/Variables";
import { useNavigate,useParams } from 'react-router-dom';
import React from 'react';



async function  getEmailByCode(code){
    //make http request
    let res = await fetch(API_URL + "/getEmailByCode?code="+code, {
        method: "GET",
    })
    console.log('res.status: ',res.status)
    if (res.status === 200) {
        let data=await res.text();
        console.log('data: ',data)
        return [true,data]
    }
    else {
        return [false,"error"]
    }

}

const RegisterPage = () => {
    let { code } = useParams();
    const [correo, setCorreo] = useState("");
    const [enableDisabled, setEnableDisabled] = useState(false);
    const formikRef = React.useRef(); // Añade esta línea


    const [initialValues, setInitialValues] = useState({
        nombres: "",
        apellidos: "",
        cedula: "",
        username: "",
        correo: "", // Este es el valor predeterminado que quieres actualizar
        contrasena: "",
        confirmacion: "",
        universidad: "",
        acepto1: "",
        acepto2: ""

      });


    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
          if (code) {
            try {
              let [success, email] = await getEmailByCode(code);
              if (success) {
                setCorreo(email); // Actualiza el estado de correo
                setEnableDisabled(true); // Actualiza el estado de enableDisabled
                console.log('Antes de setInitialValues', initialValues);

                setInitialValues(prevValues => ({
                    ...prevValues,
                    nombres: "", // Actualiza nombres aquí
                    correo: email,    // Actualiza correo aquí
                  }));
                  console.log('Después de setInitialValues', { nombres: "diego", correo: email });
                
                  if (formikRef.current) {
                    formikRef.current.resetForm({
                      values: {
                        ...formikRef.current.initialValues,
                        nombres: "",
                        correo: email,
                      },
                    });
                }

              } else {
                setCorreo(""); // Actualiza el estado de correo
                setEnableDisabled(false); // Actualiza el estado de enableDisabled
              }
            } catch (error) {
              console.error("Error al obtener el correo: ", error);
            }
          }
        };
    
        fetchData();
      }, [code]); // Dependencias del efecto

      useEffect(() => {
        // Este efecto se ejecutará cada vez que `correo` se actualice.
        console.log('correo after: ', correo);
      }, [correo]);
    
        
    
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [open, setOpen] = useState(false);
   

    
      useEffect(() => {
        console.log('correo after: ', correo);
        // Actualiza los valores iniciales del formulario con el nuevo correo
        setInitialValues(currentValues => ({ ...currentValues, correo }));
      }, [correo]);


      const handleBack = () => {
        // Esto te llevará a la página anterior en el historial del navegador
        navigate(-1);
    };

    const onSubmit = async (values, { resetForm }) => {

        if(values.acepto1==[]){
            setMessage('Debe aceptar el uso de datos')
            setSeverity('error');
            setOpen(true);
        }else{
            values.acepto1=true;
        }

        if(values.acepto2==[]){
            setMessage('Debe aceptar terminos y condiciones')
            setSeverity('error');
            setOpen(true);
        }else{
            values.acepto2=true;
        }

        if(values.acepto1 && values.acepto2){
            const dataRegistro = JSON.stringify({
                Nombres: values.nombres,
                Apellidos: values.apellidos,
                Cedula: values.cedula,
                Username: values.correo,
                Correo: values.correo,
                ContrasenaHash: values.contrasena,
                Estado: true,
                IsInvited: enableDisabled,
                universidad: values.universidad,
                aceptoUsoApp: values.acepto1,
                aceptoTerminos: values.acepto2
    
            })
    
            console.log("data user before register: ",dataRegistro);
            
    
            let res = await fetch(API_URL + "/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataRegistro,
            })
            if (res.status === 200) {
                setMessage('Usuario registrado exitosamente')
                setSeverity('success');
                setOpen(true);
                resetForm({});
    
                setTimeout(()=>{
                    navigate('/');
                },3000)
            }
            else {
                setMessage('Error al crear usuario')
                setSeverity('error');
                setOpen(true);
    
                res.json().then((value)=>{
                    console.log('value: ',value)
                })
                
            }
        }

    }

    const validationSchema = yup.object({
        nombres: yup
            .string()
            .min(2, "Ingrese más de 2 caracteres")
            .required("Nombre requerido"),
        apellidos: yup
            .string()
            .min(2, "Ingrese más de 2 caracteres")
            .required("Apellido requerido"),
        cedula: yup
            .string()
            .required('Campo requerido')
            .matches(/^[0-9]+$/, "Debe ingresar solo numeros")
            .length(10, 'Campo debe contener 10 caracteres'),
        // username: yup
        //     .string()
        //     .required('Campo requerido'),
        correo: yup
            .string()
            .email('Formato de email incorrecto')
            .required('Campo requerido'),
        contrasena: yup
            .string()
            .required('Campo requerido'),
        confirmacion: yup
            .string()
            .required('Campo requerido')
            .oneOf([yup.ref('contrasena')], 'Contrasenas deben coincidir'),
        universidad: yup
            .string()
            .required('Campo requerido')
    });


    const handleCloseSnackBar = (event, reason) => {

        setOpen(false);
    };

    

    return (

        <>
            <Box sx={{
                display: 'grid',
                height: '100vh',
                gridTemplateRows: 'auto 85% 15%',
                gridTemplateAreas: `"header header header header"
                                          "main  right right right"
                                          "footer footer footer footer"`,

                                          gridArea: 'main', display: 'flex',
                                          alignItems: 'center',   
                                          backgroundColor:'#2d3b45'                         
            }}>
               

                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sx={{ width: '70%', backgroundColor: "#fff", p: 2, backgroundColor:'#2d3b45', color: 'white' }} >
                            <Grid item sx={{ m: { xs: 1, sm: 2 } }}>
                                <Divider  sx={{ mb:3, fontSize: '2.5rem'}}>
                                    REGISTRO USUARIO EXTERNO
                                </Divider>
                                <Formik

                                    initialValues={initialValues}
                                    onSubmit={onSubmit}
                                    validationSchema={validationSchema}
                                    innerRef={formikRef} // Añade la propiedad innerRef aquí

                                >
                                    {(formik) => {
                                        return ( 
                                            <Form>
                                                <Grid container direction="column">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Nombres"
                                                                name="nombres"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Apellidos"
                                                                name="apellidos"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Cédula"
                                                                name="cedula"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        {/* <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Username"
                                                                name="username"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid> */}
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Universidad de origen"
                                                                name="universidad"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="text"
                                                                label="Correo Electrónico"
                                                                name="correo"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="password"
                                                                label="Contraseña"
                                                                name="contrasena"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                                control="input"
                                                                type="password"
                                                                label="Confirmar contraseña"
                                                                name="confirmacion"
                                                                target="Forms"
                                                                style={{ backgroundColor: 'white', border: '1px solid grey', borderRadius: '4px', width: '90%'}}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                            control="checkbox"
                                                            label="acepto estoy de acuerdo con que usen mis datos en este app"
                                                            name="acepto1"
                                                            options={[{ key: 'Acepto', value: 'Acepto el uso de mis datos' }]} // 'options' debe ser un array de objetos con 'key' y 'value'
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <FormikControl
                                                            control="checkbox"
                                                            label="acepto termino y condiciones"
                                                            name="acepto2"
                                                            options={[{ key: 'Acepto', value: 'Acepto los terminos y condiciones' }]} // 'options' debe ser un array de objetos con 'key' y 'value'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container justifyContent="center" spacing={2}>
                                                        <Grid item>
                                                            <ButtonStyled variant="contained" type="submit"  sx={{ mt: 2 }} >
                                                                Registrar
                                                            </ButtonStyled>
                                                            <ButtonStyled variant="contained" onClick={handleBack} sx={{ mt: 2, ml: 5 }}>
                                                                Volver
                                                            </ButtonStyled>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                
                                            </Form>
                                          
                                        );
                                    }}
                                </Formik>


                            </Grid>


                        </Grid>
                    </Grid>
                </Box>

            <SnackbarComponent message={message} open={open} severity={severity} onClose={handleCloseSnackBar} />

        </>
    )
}

export default RegisterPage;
