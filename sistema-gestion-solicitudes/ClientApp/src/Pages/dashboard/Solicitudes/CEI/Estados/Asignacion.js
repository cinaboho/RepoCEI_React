import {Box, Typography } from "@mui/material";
import { TypographyTitle, ButtonStyled, BtnCancel } from "../../../../../Utils/CustomStyles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormikControl from "../../../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { API_URL } from "../../../../../Utils/Variables";
import * as yup from "yup";
import InvitationForm from "../InvitacionForm";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import MetodosFetch from "../../../../../Servicios/MetodosFetch";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import AsignacionSection from "../../Secciones/AsignacionSection";
import ObservacionesList from "../../Secciones/ObservacionesSection";

const VistaAsignacion = (props) => {

    const { solicitud , fetchData } = props;
    const [users, setUsers] = useState([]);
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [userAsignados, setUserAsignados] = useState([]);
    const [openInvitacion, setOpenInvitacion] = useState(false);
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [asignaciones, setAsignaciones] = useState([]);
    const [initialValues, setInitialValues] = useState({
        userAsignados: asignaciones,
    })

    const getDocumentacionByTipo = async () => {
        try {
            await fetch(API_URL + '/ArchivosBySolicitud/' + solicitud.solicitudDetalle.id)
                .then(response => response.json())
                .then(data => {
                    data.forEach(doc => {
                        if (doc.tipoArchivo.nombre === 'DocumentacionAdicional') {
                            setDocumentosAdicionales(documentosAdicionales => [...documentosAdicionales, doc])
                        }
                    })
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getRevisores = async () => {
        try {
            fetch(API_URL + '/RevisoresDisponibles')
                .then(response => response.json())
                .then(data => {
                    for (let user of data) {
                        setUsers(users => [...users, { key: user.id, value: user.nombres + " " + user.apellidos }])
                    }
                })


        } catch (error) {
            console.error('Error :', error);
        }

    }

    useEffect(() => {
        getRevisores()
        getDocumentacionByTipo();

        return (() => {
            setDocumentosAdicionales([])
            setUsers([]);
        })
    }, []);



    const handleChangeUserSelected = (value) => {
        setUserAsignados(value);

    };

    const validationSchema = yup.object({
        userAsignados: yup
            .array()
            .min(1, 'Debe seleccionar al menos un miembro del cómite')
            .required('Selección requerida')
    })

    const onSubmit = async (values) => {
        const asignaciones = [];
        values.userAsignados.forEach((user) => {

            asignaciones.push({
                solicitudDetalleId: solicitud.solicitudDetalle.id,
                UserAsignadoId: user.key
            })

        })
        console.log(asignaciones)
        let response = await MetodosFetch.CreateAsignaciones(asignaciones);
        if (response.ok) {
            fetchData();
        }
        else {
            console.log('Error fetching data');
        }
    }

    const handleDialogInvitation = () => {
        setOpenInvitacion(false);

    }

    const handleChangeEstado = async () => {
        let res = await MetodosFetch.updateEstado(solicitud, 5)
        if (res.ok) {
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
            <ObservacionesList observaciones={solicitud.solicitudDetalle.observacion} />
            <Box sx={{ mb: 3, display: 'flex', alignItems:'baseline' }}>
                <TypographyTitle>Factibilidad: </TypographyTitle>
                <Box sx={{ml:2}}>
                    {solicitud.solicitudDetalle.factibilidad ?
                        <Typography>Solicitud Factible</Typography>
                        :
                        <Typography>Solicitud No Factible</Typography>

                    }
                </Box>
            </Box>
            <AsignacionSection asignaciones={solicitud.solicitudDetalle.asignaciones} estado={solicitud.estado.nombre} fetchData={fetchData} />
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                    <TypographyTitle>Agregar Revisores</TypographyTitle>
                    <ButtonStyled variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} onClick={()=>setOpenInvitacion(true)}>
                        Invitar Agente Externo
                    </ButtonStyled>
                    
                </Box>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Box sx={{ display: "flex", }}>                                 
                                        <FormikControl
                                            control="autocomplete"
                                            name="userAsignados"
                                            options={users}
                                            label="Seleccione miembros para la revisión"
                                            selectAllLabel="Seleccionar todos"
                                            onSelect={handleChangeUserSelected}
                                            value={userAsignados}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }} >
                                        <ButtonStyled variant="contained" type="submit"  >
                                            Enviar
                                        </ButtonStyled>
                                        <ButtonStyled variant="contained" type="button" onClick={() => setOpenConfirmacion(true)}>
                                            Siguiente Etapa
                                        </ButtonStyled>

                                    </Box>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>

            </Box>

            <InvitationForm openDialog={openInvitacion} handleCloseDialog={handleDialogInvitation} />

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
export default VistaAsignacion;