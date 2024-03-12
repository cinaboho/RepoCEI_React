import React, { useState , useEffect} from "react";
import {  Box } from "@mui/material"
import { ButtonStyled } from "../../../Utils/CustomStyles";
import FormikControl from "../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import AnexoWrapper from "../AnexoWrapper";
import CardFormWrapper from "../CardFormWrapper";
import MetodosFetch from "../../../Servicios/MetodosFetch";
import { API_URL } from "../../../Utils/Variables";
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../../../components/Loader/Loading";

const Anexo3 = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [dataAnexo, setDataAnexo] = useState({});
    const [isDisabled, setIsDisabled] = useState();
    const [valuesAnexos, setValuesAnexos] = useState([]);
    const [initialValues, setInitialValues] = useState({
        dia: '',
        mes: '',
        anio: '',
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
                                                En Guayaquil, siendo el día

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
                                                del año
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="anio"
                                                    disabled={isDisabled}
                                                />

                                                solicito al Comité de Ética en Investigación de ESPOL, una guía rápida de información y normativas
                                                básicas respecto de buenas prácticas y ética en investigación del centro de investigación
                                                ,facultad o institución de ESPOL, para poder desarrollar los trabajos de investigación o académicos
                                                y acceder a la solicitud de análisis y aprobación del aval ético de este proyecto de investigación/académico.

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

                    </CardFormWrapper >

                </AnexoWrapper >
            }
        </>
    );


};

export default Anexo3;