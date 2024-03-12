
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import { useState, useEffect } from "react";
import { API_URL } from "../../../../../Utils/Variables";

const SolicitudFactibilidad= (props) => {

    const { solicitud } = props;
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);

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


    
    return (
        <>
            <AnexosList anexos={solicitud.solicitudDetalle.anexos} estado={solicitud.estado.nombre} /> 
            <DocumentsList documentos={documentosAdicionales} title={'Documentación Adicional'} />

          
        </>

    )

}
export default SolicitudFactibilidad;
