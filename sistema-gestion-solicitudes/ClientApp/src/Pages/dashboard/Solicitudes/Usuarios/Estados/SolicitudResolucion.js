import { Box, Divider } from "@mui/material";
import { ButtonStyled, TypographyTitle,  } from "../../../../../Utils/CustomStyles";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import { useState, useEffect } from "react";
import { API_URL } from "../../../../../Utils/Variables";


const SolicitudResolucion = (props) => {

    const { solicitud } = props;

    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [entregasAdicionales, setEntregasAdicionales] = useState([]);
    const [documentoResolucion, setDocumentoResolucion] = useState([]);

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
            
        })

    }, []);



    return (
        <>
            <AnexosList anexos={solicitud.solicitudDetalle.anexos} estado={solicitud.estado.nombre} /> 
            <DocumentsList documentos={documentosAdicionales} title={'Documentación Cargada'} />     

            {documentoResolucion.length !== 0 && entregasAdicionales.length !== 0 &&
                <Divider><TypographyTitle>Entregas realizadas por el Cómite de Ética</TypographyTitle></Divider>
            }
            
            <Box >
                <DocumentsList documentos={documentoResolucion} title={'Resolución'} />
                <DocumentsList documentos={entregasAdicionales} title={'Documentos Adicionales'} />
            </Box>
            {solicitud.resolucion!=null &&
                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <TypographyTitle>Recurso de Apelación</TypographyTitle>
                    <ButtonStyled sx={{ ml: 3 }} variant="contained" disabled={true}> Solicitar</ButtonStyled>

                </Box>
            }

                




        </>

    )

}
export default SolicitudResolucion;