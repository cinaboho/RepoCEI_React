import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { BtnCancel, ButtonStyled, SwitchStyled } from "../../../Utils/CustomStyles";
import { Grid, Typography } from "@mui/material"
import FormikControl from "../../../components/Form/FormControl";
import { API_URL } from "../../../Utils/Variables";
import FormDialog from "../../../components/Dialog/Dialogo";
import MetodosFetch from "../../../Servicios/MetodosFetch";


const AddUser = ({ open, handleClose , handleSnackBar}) => {
    const [toggle, setToggle] = useState(true);
    const [rolesAv, updateRolesAv] = React.useState([]);
    const [especialidadesDisponibles, setEspecialidadesDisponibles] = React.useState([]);
    const [selectedEspecialidades, setSelectedEspecialidades] = React.useState([]);
    const [selectedRoles, setSelectedRoles] = React.useState([])


    const fetchRole = (async () => {
        try {
            await fetch(API_URL + '/RolesActivos')
                .then(response => response.json())
                .then(data => {
                    for (let rol of data) {
                        updateRolesAv(rolesAv => [...rolesAv, { key: rol.id, value: rol.nombre }])
                    }
                })
            

        } catch (error) {
            console.error('Error fetching data:', error);
        }
       
    });
    const fetchEspecialidad = (async () => {
        try {
            await fetch(API_URL + '/EspecialidadesActivas')
                .then(response => response.json())
                .then(data => {
                    for (let e of data) {
                        setEspecialidadesDisponibles(especialidadesDisponibles => [...especialidadesDisponibles, { key: e.id, value: e.nombre }])
                    }
                })


        } catch (error) {
            console.error('Error fetching data:', error);
        }

    });

    useEffect(() => {
        fetchRole();
        fetchEspecialidad();

        return () => {
            updateRolesAv([])
            setEspecialidadesDisponibles([])

        };


    }, [])

    const initialValues = {
        nombres: "",
        apellidos: "",
        correo: "",
        username:"",
        cedula: "",
        roles: [],
        selectedEspecialidades: [],
        selectedRoles: [],
        
    };

    const validationSchema = yup.object({
        selectedEspecialidades: yup
            .array()
            .min(1, 'Debe seleccionar al menos una especialidad')
            .required("Seleccion requerida"),
        nombres: yup
            .string()
            .min(3, "Ingrese más de 3 caracteres")
            .required("Nombres requerido"),
        apellidos: yup
            .string()
            .min(2, "Ingrese más de 2 caracteres")
            .required("Apellidos requerido"),
        correo: yup
            .string()
            .email('Formato de email incorrecto')
            .required('Correo requerido'),
        username: yup
            .string()
            .required('Username requerido'),
        cedula: yup
            .string()
            .required("Cedula requerida")
            .matches(/^[0-9]+$/, "Debe ingresar solo numeros")
            .length(10, 'Campo debe contener 10 caracteres'),




    });

    const onSubmit = async (values, { resetForm }) => {

        const especialidades = [];
        const roles = []
        values.selectedEspecialidades.forEach((especialidad) => {
            especialidades.push({
                Nombre: especialidad.value,
                Id : especialidad.key
            })
        })
        values.selectedRoles.forEach((rol) => {
            roles.push({
                Nombre: rol.value,
                Id: rol.key
            })
        })


        const data = JSON.stringify({
            Nombres: values.nombres,
            Apellidos: values.apellidos,
            Username: values.username,
            Correo: values.correo,
            Cedula: values.cedula,
            Estado: toggle,
            Especialidades: especialidades,
            Roles: roles,
        })
        
        let res = await MetodosFetch.CreateUser(data)
        if (res.status === 200) {
            handleResetForm();
            handleSnackBar(true, "Usuario creado exitosamente");
           
        }
        else {
            handleSnackBar(false, "Error al crear usuario");
        }
        
    }

    const handleResetForm = () => {
        setSelectedEspecialidades([])
        setSelectedRoles([])
        handleClose();
    }
    
  

    const handleToggle = () => {
        setToggle(!toggle);

    };

    const handleChangeRoles = (value) => {


        //setSelectedRoles(event.target.value);
        setSelectedRoles(value)
          
    };

    const handleChangeEspecialidad = (value) => {
        setSelectedEspecialidades(value);
    };


    return (
        <>
            <FormDialog title={"Nuevo Usuario "} open={open} handleClose={handleResetForm}>
                <Grid container direction="column" justifyContent="center" alignItems="center" >
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                       
                    >
                    {(values) => {
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
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>

                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    label="Apellidos"
                                                    name="apellidos"
                                                    target="Forms"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="column">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    label="Username"
                                                    name="username"
                                                    target="Forms"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>

                                                <FormikControl
                                                    control="input"
                                                    type="email"
                                                    label="Correo Electronico"
                                                    name="correo"
                                                    target="Forms"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="column" rowSpacing={2}>
                                            <Grid item xs={12} sm={6}>

                                                <FormikControl
                                                    control="autocomplete"
                                                    name="selectedRoles"
                                                    options={rolesAv}
                                                    label="Seleccione roles"
                                                    selectAllLabel="Seleccionar todos"
                                                    onSelect={handleChangeRoles}
                                                    value={selectedRoles}


                                                />


                                        </Grid>
                                            <Grid item xs={12} sm={6}>

                                                <FormikControl
                                                    control="autocomplete"
                                                    name="selectedEspecialidades"
                                                    options={especialidadesDisponibles}
                                                    label="Seleccione especialidades"
                                                    selectAllLabel="Seleccionar todos"
                                                    onSelect={handleChangeEspecialidad}
                                                    value={selectedEspecialidades}


                                                />
                                              

                                            </Grid>
                                    
                                    </Grid>
                                    <Grid container direction="column">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    label="Cedula de Identidad"
                                                    name="cedula"
                                                    target="Forms"
                                                />
                                            </Grid>
                                       
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="column">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography> Estado  </Typography>
                                                <SwitchStyled
                                                    name="Estado"
                                                    onChange={handleToggle}
                                                    checked={toggle}

                                                />
                                            </Grid>
                                      
                                        </Grid>
                                    </Grid>

                                    <Grid container justifyContent="space-around">
                                        <ButtonStyled variant="contained" type="submit" sx={{ mt: 2 }} >
                                            Agregar
                                        </ButtonStyled>
                                        <BtnCancel variant="outlined" color="error" type="button" sx={{ mt: 2 }} onClick={handleResetForm} >
                                            Cancelar
                                        </BtnCancel>
                                    </Grid>



                                </Form>
                            );
                        }}
                    </Formik>
                </Grid>
            </FormDialog>
        </>
    );
};
export default AddUser;