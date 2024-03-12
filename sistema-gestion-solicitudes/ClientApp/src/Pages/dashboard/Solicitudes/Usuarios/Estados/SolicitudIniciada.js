import { Box, Typography} from "@mui/material";
import { ButtonStyled, TypographyTitle, BtnCancel } from "../../../../../Utils/CustomStyles";
import FormikControl from "../../../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import { useState, useEffect } from "react";
import * as yup from "yup";
import MetodosFetch from "../../../../../Servicios/MetodosFetch";
import AnexosList from "../../Secciones/AnexosSection";
import DocumentsList from "../../Secciones/DocumentosSection";
import { API_URL } from "../../../../../Utils/Variables";
import MessageCard from "../../../../../components/Card/MessageCard";
import SnackbarComponent from "../../../../../components/Snackbar";
import { useNavigate,useParams } from 'react-router-dom';

const SolicitudIniciada = (props) => {
    const { solicitud, fetchData } = props;
    const [documentosAdicionales, setDocumentosAdicionales] = useState([]);
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

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


    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [open, setOpen] = useState(false);

    const onSubmit = (value) => {
        console.log(value)
        setOpenConfirmacion(true);

    }

    const initialValues = {
        files: [],
    }

    const handleEnviar = async () => {
        const formData = new FormData();
        console.log(files)
        let len_files=files.length;
        let count_valid=0
        for(let i = 0; i < files.length; i++) {
            let myfile=files[i]
            let extension=myfile.name.split('.').pop();
            if(extension=='pdf'){
                count_valid+=1;
            }
            formData.append("files",myfile);
            // Agregar datos adicionales al FormData
            formData.append('Nombre', myfile.name);
            formData.append('SolicitudDetalleId', solicitud.solicitudDetalle.id); // Reemplaza con el valor real
            formData.append('Extension',  extension); // Reemplaza con el valor real
            formData.append('UsuarioId', '4'); // Reemplaza con el valor real
            formData.append('TipoArchivoId', '1'); // Reemplaza con el valor real
            
        }

        if(count_valid==len_files){
            try{
                let response = await MetodosFetch.createArchivos(formData)
                console.log('response: ',response)
                if (response.ok) {
                    setOpenConfirmacion(false);
                    fetchData();

                    setTimeout(()=>{
                        navigate('/Solicitudes');
                    },1000)
                }
                else {
                    console.log('Error al subir los archivos');
                }
            }catch (error) {
                console.error('Error al enviar los archivos', error);
            }
        }else{
            setMessage('Todos los archivos deben ser pdf')
            setSeverity('error');
            setOpen(true);
        }
    }

    const handleCloseConfirmacion = () => {
        setOpenConfirmacion(false);
    }


    const validationSchema = yup.object({
        files: yup
            .array()
            .min(1,'Seleccione un archivo para enviar')
            .required("Required")
    })


    const handleCloseSnackBar = (event, reason) => {
        setOpen(false);
    };

    return (
        <>
           
            <Box>
                <AnexosList anexos={solicitud.solicitudDetalle.anexos} estado={solicitud.estado.nombre} />
                
                {solicitud.solicitudDetalle.otrosArchivos &&
                    <>
                    <DocumentsList documentos={documentosAdicionales} title={'Documentación Adicional'} tipoArchivo={'DocumentacionAdicional'} />
                    <MessageCard message={solicitud.solicitudDetalle.archivosSolicitados}> </MessageCard>
                   
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema }
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>

                                        <TypographyTitle>Subir documentación</TypographyTitle>
                                        <FormikControl
                                            control="file"
                                            type="file"
                                            label="Documentos"
                                            name="files"
                                            isMultiple={true}
                                            accept=".pdf,application/pdf"
                                            files={files}
                                            setFiles={setFiles}
                                        />

                                        <Box sx={{ display: "flex", justifyContent: "space-around", m: 2 }} >
                                            <ButtonStyled variant="contained" type="submit" >
                                                Enviar
                                            </ButtonStyled>
                                        </Box>
                                    </Box>



                                </Form>
                            );
                        }}
                    </Formik>

                    </>

                }
               
                <ConfirmDialog title={"Confirmación de Envio"} open={openConfirmacion} handleClose={handleCloseConfirmacion}>
                    <Typography variant="subtitle1">
                        Revisar que los anexos/documentos solicitados han sido correctamente completados.
                    </Typography>
                    <Typography variant="subtitle1">
                        Una vez listo haga click en continuar
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                        <ButtonStyled onClick={handleEnviar} variant="contained" sx={{ mt: 2 }}>Confirmar</ButtonStyled>
                        <BtnCancel onClick={handleCloseConfirmacion} variant="outlined" color="error" sx={{ mt: 2 }}>Cancelar</BtnCancel>

                    </Box>
                </ConfirmDialog>


            </Box>
            <SnackbarComponent message={message} open={open} severity={severity} onClose={handleCloseSnackBar} />


        </>

    )

}
export default SolicitudIniciada;
