import { Box, Typography } from "@mui/material";
import { TypographyTitle, ButtonStyled, BtnCancel } from "../../../../../Utils/CustomStyles";
import FormikControl from "../../../../../components/Form/FormControl";
import { Formik, Form,Field } from "formik";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../../../../Utils/Variables";
import * as yup from "yup";
import MetodosFetch from "../../../../../Servicios/MetodosFetch";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import Swal from 'sweetalert2'





const VistaIniciada = (props) => {
    const { solicitud, fetchData } = props;
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [anexosCompletados, setAnexosCompletados] = useState(solicitud.solicitudDetalle.anexos);
    const [anexosPorCompletar, setAnexosPorCompletar] = useState([])
    const [otros, setOtros] = useState(() => solicitud.solicitudDetalle.otrosArchivos ? 'Si' : 'No');
    const [descripcionArchivos, setDescripcionArchivos] = useState(solicitud.solicitudDetalle.archivosSolicitados);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [open, setOpen] = useState(false);


  
    const fetchTiposAnexos = async () => {
        try {
            await fetch(API_URL + '/TipoAnexos')
                .then(response => response.json())
                .then(data => {
                    data.forEach((anexo) => {
                        if (!anexosCompletados.some((item) => item.tipoAnexo.id === anexo.id)) {
                            setAnexosPorCompletar(anexosPorCompletar => [...anexosPorCompletar, { key: anexo.id, value: anexo.tituloPrincipal + ' - ' + anexo.subtitulo }])
                        }
                    }
                    )
                })


        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

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

    useEffect(() => {
       
        fetchTiposAnexos();
        getDocumentacionByTipo();
        return () => {
            setDocumentosAdicionales([])
            setAnexosPorCompletar([])
           
            
        }
    }, []);






    const checkboxOptions = [
        { key: true, value: 'Si' },
        { key: false, value: 'No' },

    ];

    const handleChangeEstado = async () => {
        solicitud.estadoId = 3;

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


    const notificarAnexos= async(otrosAnexos)=>{
        console.log('click notificarAnexos')
        const user = localStorage.getItem('userEspol');
        const objUser= JSON.parse(user)

        const bodyData={
            'Envia': JSON.stringify(objUser.userId),
            'Mensaje': 'Estimado investigador se requiere: '+otrosAnexos,
            'SolicitudId': solicitud.id
        }

        console.log('bodyData: ',bodyData)

        let res = await fetch(API_URL + "/notificaciones/nuevo", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        })

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Investigador ha sido notificado"
          });

        
    }

    const initialValues = {
        anexos: [],
        otros: otros,
        textOtros: descripcionArchivos,

    };

    const validationSchema = yup.object({
        anexos: yup
            .array(),
        otros: yup
            .string()
            .required('Seleccione una de las dos opciones'),
        textOtros: yup
            .string()
            .when("otros", {
                is: value => value === 'Si',
                then: () => yup.string().required('Campo requerido'),
            })

    })


    const onSubmit = async (values, { resetForm }) => {
        console.log(('values: ',values))
        updateDetalles(values)  
    };

    const addAnexos = async (indexAnexos) => {

        if (indexAnexos.length !== 0) {
            const anexos = [];
            indexAnexos.forEach((index) => {
                const anexo = {
                    SolicitudDetalleId: solicitud.solicitudDetalle.id,
                    TipoAnexoId: anexosPorCompletar[index].key
                }
                anexos.push(anexo)
            })

            let response = await MetodosFetch.addAnexos(anexos);
            if (response.ok) {
                fetchData();
            }
            else {
                console.log(response)
            }
        }
    }

    const updateDetalles = async (values) => {

        
        if (values.otros === 'Si') {
            solicitud.solicitudDetalle.otrosArchivos = true;
            solicitud.solicitudDetalle.archivosSolicitados = values.textOtros
            notificarAnexos(values.textOtros)
        }
        else {
            solicitud.solicitudDetalle.otrosArchivos = false;
            solicitud.solicitudDetalle.archivosSolicitados = ""
        }

        console.log('fechaHora: ',values.fechaHora)
        console.log('solicitud: ',solicitud)

        let dataSolicitud={
            'SolicitudId': solicitud.id,
            'FechaCierre': values.fechaHora
        }
        
        solicitud.solicitudDetalle['fechaCierre']=values.fechaHora;


        let resp = await MetodosFetch.updateSolicitudDetalle(solicitud.solicitudDetalle);
        let resp2 = await MetodosFetch.updateSolicitudFechaCierre(dataSolicitud);
        console.log('resp2: ',resp2)

        if (resp.ok) {
            if (values.anexos.length !== 0) {
                addAnexos(values.anexos)
            }
            else {
                fetchData();
            }
              
        }
        else {
            console.log('Error updating data')
        }


    }


    return (
        <>
            <AnexosList anexos={solicitud.solicitudDetalle.anexos} estado={solicitud.estado.nombre} />
            <DocumentsList documentos={documentosAdicionales} title={'Documentación Adicional'} />

            {anexosPorCompletar?.length !== 0 ?

                <Box sx={{ mb: 2 }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ values ,setFieldValue}) => {
                            return (
                                <Form>
                                    {/* Agrega aquí el nuevo campo de fecha y hora */}
                                    <TypographyTitle>Fecha de cierre de solicitud</TypographyTitle>
                                    {/* Campo de Fecha y Hora */}
                                    <Box sx={{ mb: 2 }}>
                                        <label htmlFor="fechaHora">Seleccione la fecha y hora:</label>
                                        <Field
                                            type="datetime-local"
                                            name="fechaHora"
                                            id="fechaHora"
                                            style={{ marginLeft: 10 }} // Ajusta el estilo según necesites
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <TypographyTitle> Anexos por Solicitar al Investigador</TypographyTitle>

                                        <Box sx={{ display: "flex", mb: 2 }}>
                                            <FormikControl
                                                control="checkbox"
                                                label="Anexos"
                                                name="anexos"
                                                options={anexosPorCompletar}

                                            />
                                        </Box>
                                        <TypographyTitle>¿Requiere que el solicitante cargue más archivos?</TypographyTitle>
                                        <FormikControl
                                            control="radiobutton"
                                            label="Subir Archivos"
                                            name="otros"
                                            options={checkboxOptions}
                                            value={otros}
                                            onChange={setOtros}

                                        />
                                        {values.otros === 'Si' ?
                                            <Box sx={{ ml: 3 }}>
                                                <FormikControl
                                                    control="textarea"
                                                    type="text"
                                                    label="Describa los archivos solicitados"
                                                    name="textOtros"


                                                />
                                            </Box>
                                            :
                                            <></>

                                        }


                                        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }} >
                                        
                                            <ButtonStyled variant="contained" type="submit"  >
                                                Enviar y notificar
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
                :
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 5 }} >

                    <ButtonStyled variant="contained" type="button" onClick={() => setOpenConfirmacion(true)}>
                        Siguiente Etapa
                    </ButtonStyled>

                </Box>
            }
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
export default VistaIniciada;