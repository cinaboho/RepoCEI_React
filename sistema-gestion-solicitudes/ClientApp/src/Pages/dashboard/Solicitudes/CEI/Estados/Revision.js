import {Box, Typography } from "@mui/material";
import { ButtonStyled, BtnCancel, TypographyTitle } from "../../../../../Utils/CustomStyles";
import { useState, useEffect } from "react";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import MetodosFetch from "../../../../../Servicios/MetodosFetch";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import AsignacionSection from "../../Secciones/AsignacionSection";
import ObservacionesList from "../../Secciones/ObservacionesSection";
import { API_URL } from "../../../../../Utils/Variables";

const VistaRevision = (props) => {

    const { solicitud, fetchData } = props;
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [informesCargados, setInformesCargados] = useState([]);

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
                        
                        else if (tipoArchivo === 'Informes') {
                            setInformesCargados(informesCargados => [...informesCargados, doc])
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
            setInformesCargados([]);
        })

    }, []);



    const handleChangeEstado = async () => {
        let res = await MetodosFetch.updateEstado(solicitud, 6)
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
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'baseline' }}>
                <TypographyTitle>Factibilidad: </TypographyTitle>
                <Box sx={{ ml: 2 }}>
                    {solicitud.solicitudDetalle.factibilidad ?
                        <Typography>Solicitud Factible</Typography>
                        :
                        <Typography>Solicitud No Factible</Typography>

                    }
                </Box>
            </Box>
            <AsignacionSection asignaciones={solicitud.solicitudDetalle.asignaciones} />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }} >
                <ButtonStyled onClick={() => setOpenConfirmacion(true)} variant="contained" sx={{ mt: 2 }}>Siguiente Etapa</ButtonStyled>

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
export default VistaRevision;