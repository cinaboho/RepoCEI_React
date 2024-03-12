import { Box, Typography, IconButton, MenuItem, Menu, ListItemIcon, ListItemText, TextField} from "@mui/material";
import { useState, useEffect } from "react";
import { TypographyTitle, ButtonStyled, BtnCancel } from "../../../../../Utils/CustomStyles";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import FormikControl from "../../../../../components/Form/FormControl";
import { Formik, Form, FieldArray , Field, ErrorMessage} from "formik";
import { API_URL, MessageEmail } from "../../../../../Utils/Variables";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import * as yup from "yup";
import MetodosFetch from "../../../../../Servicios/MetodosFetch";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import DeleteIcon from '@mui/icons-material/Delete';
import TextError from "../../../../../components/Form/TextError";


const VistaFactibilidad = (props) => {
    const { solicitud, documentos, fetchData } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);

    const [factibilidad, setFactibilidad] = useState(() => solicitud.solicitudDetalle.factibilidad ? 'Si' : 'No');

    const [observacionesIniciales, setObservacionesIniciales] = useState(() => 
        (solicitud.solicitudDetalle.observacion).split(',').filter(Boolean).map((value) => {
            return { observacion: value }
        })
    )

    const [initialValues, setInitialValues] = useState({
        observaciones: observacionesIniciales,
        factibilidad: factibilidad,

    })    

    const getDocumentacionByTipo = async () => {
        try {
            await fetch(API_URL + '/ArchivosBySolicitud/' + solicitud.solicitudDetalle.id)
                .then(response => response.json())
                .then(data => {
                    data.forEach(doc => {
                        let tipoArchivo = doc.tipoArchivo.nombre
                        if (tipoArchivo === 'DocumentacionAdicional') {
                            setDocumentosAdicionales(documentosAdicionales => [...documentosAdicionales, doc])
                        }

                    })
                })

        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        getDocumentacionByTipo();
        return (() => {
            setDocumentosAdicionales([])

        })

    }, [])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const checkboxOptions = [
        { key: true, value: 'Si'},
        { key: false, value: 'No' },
       
    ];

 

    const validationSchema = yup.object({
        factibilidad: yup
            .string()
            .required('Seleccione una de las dos opciones'),
        observaciones: yup
            .array()
            .of(
                yup.object().shape({
                    observacion: yup
                                .string()
                                .min(3, "Ingrese más de 3 caracteres")
                                .required("Observación es requerida"),
                                
                })
            )
            
    });


    const onSubmit = async (values) => {
        let observaciones="";

        values.observaciones.forEach((item) => {
            observaciones += item.observacion + ','
        })
        solicitud.solicitudDetalle.factibilidad = values.factibilidad === 'Si' ? true : false;
        solicitud.solicitudDetalle.observacion = observaciones;

        
        let res = await MetodosFetch.updateSolicitudDetalle(solicitud.solicitudDetalle)
        if (res.ok) {
            fetchData();
        }
        else {
            setOpenConfirmacion(false);
        }
        
        
        
    }

    const handleChangeEstado = async () => {

        if (solicitud.solicitudDetalle.factibilidad) {
            solicitud.estadoId = 4;
        } else {
            solicitud.estadoId = 6;
        }

        let res = await fetch(API_URL + "/Solicitud/" + solicitud.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitud)
        })
        if (res.status === 200) {
            setOpenConfirmacion(false);
            fetchData();
        }
        else {
            setOpenConfirmacion(false);
        }
        
    }






    return (
        <>
            <AnexosList anexos={solicitud.solicitudDetalle.anexos} estado={solicitud.estado.nombre} />
            <DocumentsList documentos={documentosAdicionales} title={'Documentación Adicional'} />
            <Box sx={{ mb:2 }}>
                <TypographyTitle>Contactar solicitante</TypographyTitle>              
                <Box sx={{ display: 'flex' }}>
                    <ButtonStyled variant="contained" type="submit" onClick={handleClick}>
                        Contactar                        
                    </ButtonStyled  >
                    <Menu
                        elevation={0}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >   
                        <MenuItem key='Chat' disableRipple >
                            <ListItemIcon>
                                <ChatIcon sx={{ mr: 2 }} />
                            </ListItemIcon>
                            <ListItemText>
                                Chat
                            </ListItemText>

                        </MenuItem>
                        <MenuItem key='Correo' disableRipple component='a' href={"mailto:" + solicitud.usuario.correo + "?Subject= Contacto CEI&body=" + MessageEmail}>
                            <ListItemIcon>
                                <EmailIcon sx={{ mr: 2 }} /> 
                            </ListItemIcon>
                            <ListItemText>
                                Correo Electrónico
                            </ListItemText>

                        </MenuItem>
                       
                       
                    </Menu>


                </Box>
            </Box>


            <Box sx={{mt:2}}>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({values }) => {
                        return (
                            <Form>
                                <Box>
                                    <FieldArray name="observaciones">
                                        {({ insert, remove, push }) => (
                                            <Box>
                                               
                                                <Box sx={{display:'flex', alignItems:'flex-end'}}>
                                                    <TypographyTitle>Observaciones Reuniones</TypographyTitle>
                                                    <IconButton onClick={() => push({ observacion: '' })}>
                                                        <AddCircleIcon />
                                                    </IconButton>
                                                </Box>


                                                <Box sx={{
                                                    display: 'flex', flexDirection: 'column', my: 2, p: 2, borderRadius: 3 ,
                                                    border: '1px dashed grey', backgroundColor: '#2532600f',
                                                }}>
                                                    {values.observaciones?.length > 0 ?
                                                        <>
                                                            {values.observaciones?.map((observacion, index) => {
                                                                return (
                                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
                                                                        <Box sx={{ display:'flex', justifyContent:'space-around' }}>
                                                                            <Field
                                                                                as={TextField}
                                                                                size='small'
                                                                                variant="outlined"
                                                                                name={`observaciones.${index}.observacion`}
                                                                                placeholder="Observacion"
                                                                                type="text"
                                                                                sx={{ width: '100%', my: 0.5 }}

                                                                            />

                                                                            <IconButton onClick={() => remove(index)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>

                                                                        </Box>
                                                                    
                                                                        <ErrorMessage name={`observaciones.${index}.observacion`} component={TextError} />
                                                                </Box>
                                                                    
                                                                
                                                            )})}
                                                        </>
                                                        :
                                                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                                            <Typography variant="subtitle2">
                                                                No se han realizado observaciones hasta el momento.
                                                            </Typography>
                                                        </Box>
                                                    }     
                                                </Box>
                                            </Box>
                                        )}
                                    </FieldArray>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <TypographyTitle>Factibilidad</TypographyTitle>
                                    <FormikControl
                                        control="radiobutton"
                                        label="Factibilidad"
                                        name="factibilidad"
                                        options={checkboxOptions}
                                        value={factibilidad}
                                        onChange={setFactibilidad}
                                        
                                    />
                                    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }} >
                                        <ButtonStyled variant="contained" type="submit">
                                            Guardar
                                        </ButtonStyled>
                                        <ButtonStyled variant="contained" type="button"  onClick={() => setOpenConfirmacion(true)}>
                                            Siguiente Etapa
                                        </ButtonStyled>

                                    </Box>
                                </Box>



                            </Form>
                        );
                    }}
                </Formik>
            </Box>

           
            <ConfirmDialog title={"Confirmación"} open={openConfirmacion} handleClose={() => setOpenConfirmacion(false)}>
                <Typography variant="subtitle1">
                    ¿Esta seguro que desea cambiar el estado de la solicitud?
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                    <ButtonStyled onClick={handleChangeEstado} variant="contained" sx={{ mt: 2 }}>Confirmar</ButtonStyled>
                    <BtnCancel onClick={() => setOpenConfirmacion(false)} variant="outlined" color="error" sx={{ mt: 2 }}>Cancelar</BtnCancel>

                </Box>
            </ConfirmDialog>



        </>

    )

}
export default VistaFactibilidad;
