import React, { useState , useEffect} from "react";
import { Card, CardHeader, CardContent, Typography, Grid, Box } from "@mui/material"
import { ButtonStyled } from "../../../Utils/CustomStyles";
import FormikControl from "../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import AnexoWrapper from "../AnexoWrapper";
import CardFormWrapper from "../CardFormWrapper";
import Loading from "../../../components/Loader/Loading";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from "../../../Utils/Variables";
import MetodosFetch from "../../../Servicios/MetodosFetch";

const Anexo2 = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [dataAnexo, setDataAnexo] = useState({});
    const [isDisabled, setIsDisabled] = useState();
    const [valuesAnexos, setValuesAnexos] = useState([]);
    const [initialValues, setInitialValues] = useState({
        fecha: '',
    });


    useEffect(() => {
        setEditableForm();
        fetchAnexo();

    }, []);



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

    const setEditableForm = () => {

        const rol = 'Solicitante';
        const estado = 'Ceada'

        if (rol === 'Solicitante' && (estado === 'Creada' || estado === 'Iniciada')) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
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
        })
        setValuesAnexos(fields);

    }

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
        console.log(updateFields)

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
                                                <Box
                                                    sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}
                                                >
                                                    El investigador/Estudiante/ invitado/ en fecha

                                                    <FormikControl
                                                        control="datetime"
                                                        type="date"
                                                        name="fecha"
                                                        disabled={isDisabled}
                                                    />
                                                    quién ocupa el cargo de investigador, profesor, estudiante,
                                                    declara conocer las normas de buenas prácticas en investigación y normas éticas de Espol.
                                                    Por medio del presente documento, el investigador/estudiante/invitado, se compromete a observarlas y
                                                    cumplirlas en todo el proceso de investigación, estudio y transmisión de conocimiento.
                                                    <br />
                                                    En caso de que el investigador responsable, estudiante o invitado desconozca las normas éticas de buenas prácticas
                                                    en investigación y normas éticas de ESPOL, solicitará a éste comité de ética, por medio del documento anexo 3,
                                                    solicitud de guía, información y normativas básicas respecto de buenas prácticas y ética en investigación del
                                                    centro de investigación, facultad o institución de ESPOL o fuera de ella.


                                                </Box>
                                                <Box
                                                    sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}
                                                >
                                                    Para que quede constancia se firma 

                                                    <Box sx={{ fontWeight: 'bold' }}>
                                                        Firma del investigador/responsable/ encargado
                                                    </Box>

                                                    
                                                </Box>
                                           

                                            </Box>

                                            <Box sx={{ display: "flex", justifyContent: "space-around" }} >
                                                <ButtonStyled variant="contained" type="submit" sx={{ m: 5 }} >
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

export default Anexo2;