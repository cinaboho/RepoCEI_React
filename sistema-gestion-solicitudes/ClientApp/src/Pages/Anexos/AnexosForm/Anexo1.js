import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Typography, Grid, Box, List } from "@mui/material"
import { ButtonStyled, ContainerItem, DividerStyle } from "../../../Utils/CustomStyles";
import FormikControl from "../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import AnexoWrapper from "../AnexoWrapper";
import CardFormWrapper from "../CardFormWrapper";
import Loading from "../../../components/Loader/Loading";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from "../../../Utils/Variables";
import MetodosFetch from "../../../Servicios/MetodosFetch";

const Anexo1 = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [dataAnexo, setDataAnexo] = useState({});
    const [isDisabled, setIsDisabled] = useState();
    const [valuesAnexos, setValuesAnexos] = useState([]);
    const [selectedRecoleccion, setSelectedRecoleccion] = useState('');
    const [selectedRevision, setSelectedRevision] = useState('');

    const [initialValues, setInitialValues] = useState ({
        titulo:'',
        investigador: '',
        coInvestigadores: '',
        contacto:'',
        inicioInvestigacion: '',
        finInvestigacion: '',
        financiamiento: '',
        obGeneral: '',
        obEspecifico:'',
        procedimiento: '',
        riesgos:'',
        consulta:'',
        ventajas:'',
        recoleccionData: '',
        disenoInvestigacion: '',
        consentimiento:'',
        instrumentos: '',
        fechaEnvio: '',
        certificoRecoleccion:'',
        certificoRevision:'',
    });



    useEffect(() => {
        setEditableForm();
        fetchAnexo();

    }, []);

    const setEditableForm =() => {

        const rol = 'Solicitante';
        const estado = 'Creada'

        if (rol === 'Solicitante' && (estado === 'Creada' || estado === 'Iniciada')) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }

    }





    const fetchAnexo = (async () => {
        try {
            await fetch(API_URL + "/Anexos/" + params.id)
                .then(response => response.json())
                .then(data => {
                    setDataAnexo(data);
                    if (data.anexosField.length === 0) {
                        createFields(data.id)
                    }
                    else {
                        populateFields(data.anexosField)
                    }
                    setLoading(false);


                })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
    const createFields = async (id) => {

        const newFields = [];
        Object.keys(initialValues).forEach((val) => {
            newFields.push({
                Nombre: val,
                Value: '',
                AnexoId: id,

            })
        })
        let res = await MetodosFetch.createFieldAnexo(newFields);
        if (res.ok) {
            let data = await res.json();
            populateFields(data);
        }
        else {
            console.log('error')
        }

    }

    const populateFields = (fields) => {
        fields.forEach(({ nombre, value }) => {
            initialValues[nombre] = value;
            if (nombre === 'certificoRevision')
                setSelectedRevision(value)
            if (nombre === 'certificoRecoleccion')
                setSelectedRecoleccion(value)
        })

        setValuesAnexos(fields);
    }


    const checkboxOptions = [
        { key: true, value: 'Si' },
        { key: false, value: 'No' },

    ];

    const onSubmit = async (values) => {
        const updateFields = [];
        valuesAnexos.forEach((field) => {
            const fieldName = field.nombre;
            if (values[fieldName] !== undefined) {
                updateFields.push({
                    id: field.id,
                    Nombre: field.nombre,
                    Value: values[fieldName],
                    AnexoId: dataAnexo.id
                })
            }
        })
        let response = await MetodosFetch.updateFieldsAnexo(dataAnexo.id, updateFields);

        if (response.ok) {
            navigate(-1)

        } else {
            //call snackbar
        }

        
    }

    return (
        <>
            {loading ?
                <Loading />

                :
                <AnexoWrapper>
                    <CardFormWrapper title={dataAnexo.tipoAnexo.tituloPrincipal + " - " + dataAnexo.tipoAnexo.subtitulo}>
                        
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <Box>
                                            <Card sx={{ mb: 4 }}>
                                                <CardHeader
                                                    title={<Typography variant="subtitle2" color="white">DATOS DE IDENTIFICACIÓN</Typography>}
                                                    sx={{ textAlign: 'center', backgroundColor: '#343e60' }}
                                                />
                                                <CardContent sx={{ p: 0 }}>
                                                    <Box>
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Título de la Investigación:
                                                            </Typography>
                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="titulo"
                                                            disabled={isDisabled}

                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Investigador Principal:

                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Nombre completo,  afiliación institucional y dirección electrónica
                                                            </Typography>
                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="investigador"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Co-investigadores:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Nombres completos, afiliación institucional y dirección electrónica.
                                                                Si no hubiera co-investigador por favor especificarlo.
                                                            </Typography>
                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="coInvestigadores"
                                                            disabled={isDisabled}

                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Persona de contacto:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Nombre y datos de contacto incluyendo teléfonos fijo, celular y dirección electrónica
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="contacto"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Fecha de inicio de la investigación:
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="inicioInvestigacion"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Fecha de término de la investigación:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Fecha estimada
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="finInvestigacion"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Financiamiento:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Datos completos del auspiciante o incluir “personal
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="financiamiento"
                                                            disabled={isDisabled}
                                                        />
                                                    </Box>
                                                </CardContent>

                                            </Card>
                                            <Card sx={{ mb: 4 }}>
                                                <CardHeader
                                                    title={<Typography variant="subtitle2" color="white">DISEÑO DEL ESTUDIO</Typography>}
                                                    sx={{ textAlign: 'center', backgroundColor: '#343e60' }}
                                                />
                                                <CardContent sx={{ p: 0 }}>
                                                    <Box>
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Objetivo General:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Debe responder tres preguntas: qué? cómo? y para qué?
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="obGeneral"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                Objetivos Específicos
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="obEspecifico"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                1. Procedimientos:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Pasos a seguir desde el primer contacto con las personas participantes.
                                                                <b>Aplicación de la ley orgánica de datos personales previo<sup>1</sup></b>/(Posterior no es necesario:
                                                                anonimización de datos personales/ registros públicos/grupo social/ no aplica datos personales)
                                                                denominar la fuente de datos (No es igual al diseño).
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="procedimiento"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                2. Riesgos:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Incluir riesgos: al ambiente, animales, o seres humanos físicos y  emocionales
                                                                (aunque sean mínimos), incluyendo incomodidad en responder a preguntas sensibles.
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="riesgos"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                3. Consulta concreta
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                <b>Por ejemplo: ¿Es ético el desarrollo de este tipo de procedimientos?</b>
                                                                (se pueden hacer todas las consultas en ética que crean necesarias). <b>INFORMAR DE LOS RESULTADOS A LOS PARTICIPANTES DEL ESTUDIO: </b>
                                                                (Quienes participen del estudio pueden requerir los resultados de las mismas con los datos anonimizados)
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="consulta"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                4. Ventajas potenciales a la sociedad:
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="ventajas"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                5. Recolección y almacenamiento de los datos:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Cómo se recolectarán, quién, donde, cuando,
                                                                con qué; cómo se almacenarán, por cuánto tiempo, quienes tendrán acceso a los datos y cómo se
                                                                asegurará que estas personas guarden la confidencialidad, qué se hará con los datos cuando termine la investigación;
                                                                se publicarán los datos, qué previsiones se tomará para guardar la confidencialidad.
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="recoleccionData"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                6. Diseño de Investigación:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Incluyendo tipo de estudio descripción de los sujetos, muestreo o selección, reclutamiento,
                                                                variables a incluir, tipo de análisis.
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="disenoInvestigacion"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                7. Consentimiento informado<sup>2</sup>:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Quién, cómo y dónde se explicará el formulario.
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="consentimiento"
                                                            disabled={isDisabled}
                                                        />
                                                        <ContainerItem>
                                                            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle2">
                                                                8. Instrumentos y equipos:
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.7rem' }}>
                                                                Enumerar, listar y adjuntar copias/fotografías de encuestas, entrevistas, etc.)
                                                                Es importante que los instrumentos que se utilicen hayan sido validados en el Ecuador.
                                                            </Typography>

                                                        </ContainerItem>
                                                        <FormikControl
                                                            control="textarea"
                                                            type="text"
                                                            name="instrumentos"
                                                            disabled={isDisabled}
                                                        />

                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                Certificación
                                            </Typography>

                                            <Box sx={{ pt: 3 }}>

                                                <Typography>
                                                    1.	Certifico no haber recolectado ningún dato, ni haber realizado ninguna intervención con sujetos humanos,
                                                    muestras o datos.
                                                </Typography>
                                                <Box sx={{ml:2, my:1}}>
                                                    <FormikControl
                                                        control="radiobutton"
                                                        label="certificoRecoleccion"
                                                        name="certificoRecoleccion"
                                                        options={checkboxOptions}
                                                        value={selectedRecoleccion}
                                                        onChange={setSelectedRecoleccion}
                                                        disabled={isDisabled}
                                                    />
                                                </Box>
                                                <Typography>
                                                    2.	Certifico que los documentos adjuntos a esta solicitud han sido revisados y aprobados por el Investigador Principal
                                                    / el Director de Tesis / Otros.
                                                </Typography>
                                                <Box sx={{ ml: 2 , my:1}}>
                                                    <FormikControl
                                                        control="radiobutton"
                                                        label="certificoRevision"
                                                        name="certificoRevision"
                                                        options={checkboxOptions}
                                                        value={selectedRevision}
                                                        onChange={setSelectedRevision}
                                                        disabled={isDisabled}
                                                    />
                                                </Box>
                                            </Box>



                                            <Box sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3, fontWeight:'bold'}}>
                                                Firma del investigador:
                                            </Box>
                                            <Box sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3, fontWeight: 'bold' }}>
                                                Fecha de envío al Comité de Ética de ESPOL:
                                                <FormikControl
                                                    control="datetime"
                                                    type="date"
                                                    name="fechaEnvio"
                                                    disabled={isDisabled}
                                                />
                                            </Box>





                                            <Box sx={{ display: "flex", justifyContent: "space-around" }} >
                                                <ButtonStyled variant="contained" type="submit" sx={{ m: 5 }} >
                                                    Guardar
                                                </ButtonStyled>

                                            </Box>

                                        </Box>
                                    </Form>

                                )
                            }}

                        </Formik>

                        <Box sx={{ fontSize: '0.7rem',textAlign:'Justify'}}>
                            <DividerStyle />
                            <Box sx={{mb:1}}>
                                <b><sup>1 </sup>IMPORTANTE:</b> Si la solicitud de datos personales se hace previo al estudio concreto y se utiliza solo como base interna de consulta
                                para el proyecto. El investigador debe entregar el formulario DOC. ANEXO 5 DE “INFORMACIÓN DE DERECHOS SOBRE DATOS PERSONALES Y
                                CONSENTIMIENTO PARA CONSERVAR LOS DATOS PERSONALES EN ARCHIVO”. Debiendo informar de los derechos sobre datos personales,
                                la protección que se le aplicará y el consentimiento para estar en la base de datos.
                            </Box>
                            <Box>
                                <b><sup>2 </sup></b>Presentar el consentimiento informado de las personas con respecto a la prueba que forma parte de la experimentación del proyecto de investigación. 
                                (Es válido presentar cualquier formato, si cumple con los requisitos mínimos de, datos personales, mayor de edad o su tutor, 
                                    descripción de la prueba a realizar, consentimiento explícito y su firma) 
                            </Box>

                        </Box>

                    </CardFormWrapper>

                </AnexoWrapper>
            }
        </>
      
    );


};

export default Anexo1;