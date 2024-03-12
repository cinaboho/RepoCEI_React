import { Box, Typography } from "@mui/material";
import { TypographyTitle } from "../../../../../Utils/CustomStyles";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import AsignacionSection from "../../Secciones/AsignacionSection";
import ObservacionesList from "../../Secciones/ObservacionesSection";
import {  useEffect, useState } from "react";
import { API_URL } from "../../../../../Utils/Variables";



const VistaFinalizada = (props) => {

    const { solicitud } = props;
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [informesCargados, setInformesCargados] = useState([]);
    const [documentoResolucion, setDocumentoResolucion] = useState([]);
    const [entregasAdicionales, setEntregasAdicionales] = useState([]);

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
                        else if (tipoArchivo === 'Resolucion') {
                            setDocumentoResolucion(documentoResolucion => [...documentoResolucion, doc])
                        }
                        else if (tipoArchivo === 'EntregasAdicionales') {
                            setEntregasAdicionales(entregasAdicionales => [...entregasAdicionales, doc])
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
            setEntregasAdicionales([]);
            setDocumentoResolucion([]);
            setInformesCargados([]);
        })


    }, []);

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
            <AsignacionSection asignaciones={solicitud.solicitudDetalle.asignaciones} estado={solicitud.estado.nombre} />

            {solicitud.resolucion !== null &&
                <Box>
                    <DocumentsList documentos={documentoResolucion} title={'Resolución'} />
                    {solicitud.resolucion.observacion !== '' &&
                        <>
                            <TypographyTitle>Observaciones realizadas</TypographyTitle>
                            <Box sx={{ display: 'flex', my: 2, border: '1px dashed grey', backgroundColor: '#2532600f', borderRadius: 3 }}>

                                <Typography sx={{ m: 2 }}>{solicitud.resolucion.observacion}</Typography>


                            </Box>
                        </>


                    }
                </Box>
            }

            <DocumentsList documentos={entregasAdicionales} title={'Documentación Adicional'} />
            
        </>

    )

}
export default VistaFinalizada;