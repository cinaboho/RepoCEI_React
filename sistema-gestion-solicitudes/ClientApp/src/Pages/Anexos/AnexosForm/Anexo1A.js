import React, { useState , useEffect} from "react";
import { Typography , Box } from "@mui/material" 
import { ButtonStyled } from "../../../Utils/CustomStyles";
import FormikControl from "../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import AnexoWrapper from "../AnexoWrapper";
import CardFormWrapper from "../CardFormWrapper";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from "../../../Utils/Variables";
import Loading from "../../../components/Loader/Loading";
import MetodosFetch from "../../../Servicios/MetodosFetch";
import Tabla from "../../../components/Table/Tabla";
const objetivoSolicitud = [
    { key: 0, value: "Proyecto de Investigación" },
    { key: 1, value: "Protocolo de Investigación" },
    { key: 2, value: "Encuesta o trabajo específico" },
    { key: 3, value: "Procedimiento que es parte de un proyecto de investigación" },
    { key: 4, value: "Procedimiento que es parte de un protocolo de investigación" },
    { key: 5, value: "Pregunta específica en ética de investigación" }
];

const finalidadOpciones = [
    { key: 'F1', value: "Una guía ética jurídica" },
    { key: 'F2', value: "La aprobación de un proyecto de investigación, solo en sus aspectos éticos-jurídicos (artículo 35 del Reglamento General del Comité de Ética en Investigación)" },
    { key: 'F3', value: "La aprobación de un protocolo de investigación, solo en sus aspectos éticos-jurídicos" },
    { key: 'F4', value: "El aval ético para publicar los resultados en una revista de investigación científica." },
    { key: 'F5', value: "La aprobación de un procedimiento que es parte de un proyecto de investigación, solo es sus aspectos éticos-jurídicos" },
    { key: 'F6', value: "La aprobación de un procedimiento que es parte del protocolo de investigación, solo es sus aspectos éticos-jurídicos" },
    { key: 'F7', value: "Resolver dudas en materia de ética surgidas de los procesos de investigación que conforman un proyecto de investigación y/o protocolo." }
];



const Anexo1A = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [dataAnexo, setDataAnexo] = useState({});
    const [isDisabled, setIsDisabled] = useState();
    const [selectedTipo, setSelectedTipo] = useState();
    const [valuesAnexos, setValuesAnexos] = useState([]);
    const [tiposSolicitudes, setTiposSolicitudes] = useState([]);
    const [initialValues, setInitialValues] = useState({
        dia: '',
        mes: '',
        anio: '',
        nombres: '',
        objetivo: '',
        finalidad:'',
        cedula: '',
        facultad: '',
        riesgos: '',
        probabilidad: '',
        nombreTabla:'',

    })

    function setEditableForm() {

        const rol = 'Solicitante';
        const estado = 'Creada'

        if (rol === 'Solicitante' && (estado === 'Creada' || estado === 'Iniciada')) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }

    }


    useEffect(() => {
        setEditableForm();
        fetchAnexo1A();
        fetchTipoSolicitud();
        
    }, []);


    async function fetchAnexo1A () {
        try {
            await fetch(API_URL + "/Anexos/" + params.id)
                .then(response => response.json())
                .then(data => {
                    setDataAnexo(data);
                    if (data.anexosField.length === 0) {
                        createFields(data.id)
                    } else {
                        populateFields(data.anexosField)
                    }
                 
                })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    async function fetchTipoSolicitud(){

        try {
            await fetch(API_URL + '/TipoSolicitud/')
                .then(response => response.json())
                .then(data => {
                    setTiposSolicitudes(data)                  
                })

        }
        catch {
            console.log('Error fetching data')
        }

    }

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
            if (nombre === 'objetivo') {
                setSelectedTipo(value)
            }
        })
        setValuesAnexos(fields);
        setLoading(false);


    }


    const onSubmit = async (values) => {
        const updateFields = [];
        console.log(values)
        valuesAnexos.forEach((field) => {
            const fieldName = field.nombre;
            if (values[fieldName]!==undefined) {
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


                                        <Box sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}>
                                            En Guayaquil,a
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="dia"
                                                disabled={isDisabled}
                                            />
                                            del mes de
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="mes"
                                                disabled={isDisabled}
                                            />
                                            de
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="anio"
                                                disabled={isDisabled}
                                            />
                                            , la Dra./investigador/a
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="nombres"
                                                disabled={isDisabled}
                                            />
                                            con cédula de identidad o pasaporte
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="cedula"
                                                disabled={isDisabled}
                                            />
                                            vinculado profesionalmente a ESPOL, o investigador externo del Ecuador, 
                                            de la facultad de 
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="facultad"
                                                disabled={isDisabled}
                                            />
                                            solicita al Comité de Ética en Investigación de ESPOL tenga a bien realizar un análisis metodológico,
                                            ético y jurídico de los siguientes trabajos o procesos de investigación:
                                        </Box>
                                        <Box sx={{ pt: 3 }}>
                                            <FormikControl
                                                control="checkbox"
                                                label="Objetivo"
                                                name="objetivo"
                                                options={objetivoSolicitud}
                                                defaultSelected={selectedTipo}          
                                                disabled={isDisabled}
                                            />
                                        </Box>



                                        <Box sx={{ pt: 3 }}>
                                            Esta consulta realizada al Comité de Ética en Investigación tiene la finalidad de obtener:
                                        </Box>
                                        <Box sx={{ pt: 3 }}>
                                            <FormikControl
                                                control="checkbox"
                                                label="Objetivo"
                                                name="objetivo"
                                                options={finalidadOpciones}
                                                defaultSelected={selectedTipo}
                                                disabled={isDisabled}
                                            />
                                        </Box>
                                        <Box sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }} >
                                            A los efectos de informar al comité y cumplir con los artículos 1; 3; 36 y 42 del Reglamento General
                                            del Comité de Ética en Investigación de 2022, y con Código Orgánico de la Economía Social de
                                            los conocimientos de 2016, en concreto artículo 3 y artículo 4 incisos 12 y 13,
                                            declaro que en el desarrollo de esta investigación es 
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="probabilidad"
                                                disabled={isDisabled}
                                            />
                                            (Escriba la que crea pertinente) <b>inexistente, poco probable, probable o altamente
                                            probable</b> que se puedan producir <b>daños físicos a Personas (psíquico), animales, plantas y
                                            medio ambiente</b>. Porque esta investigación está

                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="riesgos"
                                                disabled={isDisabled}
                                            />
                                            (Escriba la que crea pertinente) <b>exenta de riesgos, o que los riesgos son mínimos o que los riesgos son
                                                moderados o son máximos</b> en función de la tabla estandarizada
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                name="nombreTabla"
                                                disabled={isDisabled}
                                            />
                                            de la disciplina (Bioseguridad, Seguridad, agentes químicos, según la facultad o instituto de investigación al que pertenezca etc). <br />
                                            O, no existiendo tabla estandarizada, o conocida para evaluar riesgos hacia los grupos descritos en la tabla, el Investigador Principal responsable y el grupo de investigación bajo su propia responsabilidad, conocimiento
                                            y experticia declaran que no hay riesgo para ningún grupo, o los riesgos son mínimos y aceptables, o los riesgos son moderados y pueden controlarse o que los riesgos son máximos, pero cuentan con la infraestructura adecuada,
                                            habilitada, con los recursos materiales adecuados y homologados y con el personal calificado para intervenir en cualquier evento que se produzca evitando que se generen daños graves a las instalaciones, personas, plantas, animales y medioambiente.

                                        </Box>
                                        <Box sx={{ pt: 3 }} >
                                            <Box sx={{ textAlign: 'center', py: 2, my: 2, backgroundColor: "#25326096" }}>
                                                <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                    HOMMEL (National Fire Protection Association 704 -NFPA)
                                                </Typography>
                                                <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.7rem' }}>
                                                    DESCRIBA LOS ELEMENTOS PELIGROSOS SEGUN SU FICHA DE SEGURIDAD
                                                </Typography>
                                            </Box>

                                            <Box sx={{ textAlign: 'center', py: 2, my: 2, backgroundColor: "#25326096" }}>
                                                <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                    NIVELES DE RIESGO, IDENTIFICACIÓN DE PELIGROS A LOS DERECHOS DE LAS PERSONAS,
                                                    Ley Orgánica de Protección de Datos Personales, 2021
                                                </Typography>
                                            </Box>

                                        </Box>
                                        <Box sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }} >
                                            Por medio de la presente declaración de evaluación de riesgos, mi equipo y yo estamos dispuestos a presentar un
                                            <b> PLAN DE CONTINGENCIA</b>, en caso que sea solicitado por este comité. Comprendiendo que, sin el cumplimiento de este requisito,
                                            el comité podrá rechazar la solicitud de aval ético o no otorgar dicho aval al proyecto de investigación.
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: "flex", justifyContent: "space-around" }} >
                                        <ButtonStyled variant="contained" type="submit" sx={{ m: 5 }}>
                                            Guardar
                                        </ButtonStyled>

                                    </Box>

                                </Form>

                            )
                        }}

                    </Formik>


                </CardFormWrapper>

            </AnexoWrapper>
                
            }        
        </>
        
    );
   
        
};

export default Anexo1A;