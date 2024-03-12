import React, { useState, useEffect } from "react";
import { Box } from "@mui/material"
import { ButtonStyled } from "../../../Utils/CustomStyles";
import FormikControl from "../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import AnexoWrapper from "../AnexoWrapper";
import CardFormWrapper from "../CardFormWrapper";
import Loading from "../../../components/Loader/Loading";
import { API_URL } from "../../../Utils/Variables";
import { useNavigate, useParams } from 'react-router-dom';
import MetodosFetch from "../../../Servicios/MetodosFetch";

const Anexo6 = () => {
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
        nombres: '',
        cedula: '',
        plazo:'',

    });

    useEffect(() => {
        setEditableForm();
        fetchAnexo();

    }, []);

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
                                                En Guayaquil el día

                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="dia"
                                                    disabled={isDisabled}
                                                />
                                                del mes
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
                                                Yo
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="nombres"
                                                    disabled={isDisabled}
                                                />
                                                con cedula de identidad
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="cedula"
                                                    disabled={isDisabled}
                                                />
                                                responsable del proyecto de investigación o encargado de recolectar datos personales declaro haber informado a 
                                                las personas participantes, de los derechos que le son reconocidos en la Ley Orgánica de Protección de Datos Personales, 
                                                de 2021 en particular la observación de los artículos 1; 2; 6; 8; 12; 13; 14 y 15 de la citada ley. 


                                            </Box>
                                            <Box
                                                sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}
                                            >
                                                También declaro haber informado a los titulares de los datos personales, que sus datos serán analizados
                                                por el Comité de Ética de Investigación de ESPOL, quienes estarán autorizados y con qué finalidad podrán
                                                acceder a tratar sus datos personales. Otorgando así su consentimiento explícito para ello y para tener en
                                                archivo, los datos personales de los participantes, en un plazo de
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="plazo"
                                                    disabled={isDisabled}
                                                />
                                                (10 años por ejemplo) y haberles explicado
                                                la forma de conservación y protección que se le darán a estos datos.
                                            </Box>
                                            <Box
                                                sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3, fontWeight:'bold' }}
                                            >

                                                Firma del investigador/responsable/ encargado
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

export default Anexo6;