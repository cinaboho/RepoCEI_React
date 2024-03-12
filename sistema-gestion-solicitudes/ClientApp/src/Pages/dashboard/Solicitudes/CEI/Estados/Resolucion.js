import { Box, Typography } from "@mui/material";
import { ButtonStyled, TypographyTitle, BtnCancel } from "../../../../../Utils/CustomStyles";
import FormikControl from "../../../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useState } from "react";
import MetodosFetch from "../../../../../Servicios/MetodosFetch";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import AsignacionSection from "../../Secciones/AsignacionSection";
import ObservacionesList from "../../Secciones/ObservacionesSection";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import { useEffect } from "react";
import { API_URL } from "../../../../../Utils/Variables";

const VistaResolucion = (props) => {

    const { solicitud, documentos, fetchData } = props;
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [resolucionFile, setResolucionFile] = useState([]);
    const [adicionalFiles, setAdicionalFiles] = useState([]);
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [informesCargados, setInformesCargados] = useState([]);
    const [documentoResolucion, setDocumentoResolucion] = useState([]);
    const [entregasAdicionales, setEntregasAdicionales] = useState([]);

    const initialValues = {
        resolucionFile: [],
        adicionalFiles:[],
        observaciones: '',
    }

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

    




    const handleChangeEstado = async () => {

        let res = await MetodosFetch.updateEstado(solicitud, 7)
        if (res.ok) {
            setOpenConfirmacion(false);
            fetchData();
        }
        else {
            setOpenConfirmacion(false);
        }

        

    }

    const onSubmit = async (values) => {

        const files = [];
        values.adicionalFiles.forEach((file) => {
            files.push({
                Nombre: file.name,
                solicitudDetalleId: solicitud.solicitudDetalle.id,
                URL: '',
                Extension: (file.name).split('.').pop(),
                UsuarioId: 1,
                TipoArchivoId: 4,
            })

        })

        if (values.resolucionFile.length !== 0 && files.length !== 0) {
            let res = await MetodosFetch.createArchivos(files);
            if (res.ok) {
                createResolucion(values);
            } else {

            }
        }
        else if (files.length !== 0) {
            let res = await MetodosFetch.createArchivos(files);
            if (res.ok) {
                fetchData();
            } else {

            }
        }
        else if (values.resolucionFile.length !== 0) {
            createResolucion(values);
        }
    
       

    }


    const createResolucion = async (values) => {

        const fileResolucion = {
            Nombre: values.resolucionFile[0].name,
            solicitudDetalleId: solicitud.solicitudDetalle.id,
            URL: '',
            Extension: (values.resolucionFile[0].name).split('.').pop(),
            UsuarioId: 1,
            TipoArchivoId: 3,
        }

        let response = await MetodosFetch.createArchivoResolucion(fileResolucion);

        if (response.ok) {
            let data = await response.json();
            console.log(data)
            const resolucion = {
                SolicitudId: solicitud.id,
                Observacion: values.observaciones,
                ArchivoId: data.id
            }

            let res = await MetodosFetch.CreateResolucion(resolucion)
            if (res.ok) {
                fetchData();
            }
        }
        else {

        }

    }

    const validationSchema = yup.object({
        resolucionFile: yup
            .array()
            .min(1, 'Seleccione un archivo para enviar')
            .required("Archivo requerido")

    })
    

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
            <Box >
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        //validationSchema={validationSchema}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                       {solicitud.resolucion === null ?
                                            <>
                                            <TypographyTitle>Subir Resolución</TypographyTitle>
                                            <FormikControl
                                                control="file"
                                                type="file"
                                                label="Subir resolución"
                                                name="resolucionFile"
                                                isMultiple={false}
                                                files={resolucionFile}
                                                setFiles={setResolucionFile}

                                            />
                                        
                                        

                                            <FormikControl
                                                control="textarea"
                                                type="text"
                                                label="Observaciones"
                                                name="observaciones"
                                                placeholder="Escriba observaciones o aspectos importantes "
                                        
                                                />
                                            </>
                                            : 
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

                                        <DocumentsList documentos={entregasAdicionales} title={'Entregas adicionales'} />

                                        <TypographyTitle>Subir documentación adicional</TypographyTitle>
                                        <FormikControl
                                            control="file"
                                            type="file"
                                            label="Subir documentación adicional"
                                            name="adicionalFiles"
                                            isMultiple={true}
                                            files={adicionalFiles}
                                            setFiles={setAdicionalFiles}

                                        />


                                        <Box sx={{ display: "flex", justifyContent: "space-around", mt:2 }} >
                                            <ButtonStyled variant="contained" type="submit">
                                                Enviar
                                            </ButtonStyled>
                                            <ButtonStyled variant="contained" type="button" onClick={() => setOpenConfirmacion(true)}>
                                                Finalizar Proceso
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
                    ¿Esta seguro que desea terminar el proceso de la Solicitud?
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                    <ButtonStyled onClick={handleChangeEstado} variant="contained" sx={{ mt: 2 }}>Confirmar</ButtonStyled>
                    <BtnCancel onClick={() => setOpenConfirmacion(false)} variant="outlined" color="error" sx={{ mt: 2 }}>Cancelar</BtnCancel>

                </Box>
            </ConfirmDialog>
        </>

    )

}
export default VistaResolucion;