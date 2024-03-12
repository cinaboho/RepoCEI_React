import React, { useState , useEffect} from "react";
import { Box, List, ListItem } from "@mui/material"
import { ButtonStyled } from "../../../Utils/CustomStyles";
import FormikControl from "../../../components/Form/FormControl";
import { Formik, Form } from "formik";
import AnexoWrapper from "../AnexoWrapper";
import CardFormWrapper from "../CardFormWrapper";
import Loading from "../../../components/Loader/Loading";
import { API_URL } from "../../../Utils/Variables";
import { useNavigate, useParams } from 'react-router-dom';
import MetodosFetch from "../../../Servicios/MetodosFetch";

const principios = [
    { key: 1, value: "Generar mecanismo apropiados para el almacenamiento de información, con el objetivo de evitar su divulgación y mal uso." },
    { key: 2, value: "Cada una de las áreas de trabajo en las que se realiza la investigación habrá un responsable que habrá de tomar medidas para proteger la información teniendo en cuenta las clases de lugares de trabajo en las que se encuentra puede haber visitantes o personas ajenas al proyecto." },
    { key: 3, value: "Se podrá utilizar equipos de grabación como videos en cualquier fase de la misma, contando con la debía autorización tanto el equipo como los participantes." },
    { key: 4, value: "Patrocinar la información de la investigación solo cuando hay requerimiento expreso, fundado y motivado de los demás integrantes del proyecto." },
    { key: 5, value: " Está prohibido utilizar la información para la obtención de cualquier beneficio" }

]

const puntosObservacion = [
    { key: 1, value: "Cumplir con la normativa Internacional y nacional para la difusión de resultados de estudios científicos" },
    { key: 2, value: "La difusión no debe incluir símbolos ofensivos, culturales, religioso, sexuales u otros, ni contener ideologías políticas, o que realice cualquier otro de carácter discriminatorio." },
    { key: 3, value: "Las difusiones de los resultados del Estudio deben incluir con carácter obligatorio informe a los participante del proyecto." },
    { key: 4, value: "La persona que exponga la información del proyecto deberá estar autorizado observando la normativa internacional de información científica y citar las fuentes de las mismas." }

]




const Anexo4 = () => {
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
                                                        Este documento tiene el objeto de obligar y asegurar la debida protección, conservación y buen uso de la información
                                                        confidencial que se genere del presente estudio de investigación, por parte de los responsables abajo firmantes.

                                                    </Box>
                                                    <Box
                                                        sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}
                                                    >
                                                        Es información confidencial según el artículo 66- 19 y 91 de la Constitución de la República del Ecuador, 2008,
                                                        datos de personas colaboradores en la investigación, datos, o fórmulas, metodologías y especificaciones de productos y
                                                        servicios que formen parte del estudio. Se aconseja observar también la Ley Orgánica de Protección de datos Personales,
                                                        de 2021 y el Código Orgánico de la Economía Social de los Conocimientos de 2016, artículos 67 inciso 5, 277, 523 y 530.

                                                    </Box>
                                                    <Box
                                                        sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}
                                                    >
                                                        Resultados de análisis pruebas y proyecciones y nuevos proyectos, productos de software propiedad de las instituciones
                                                        promotoras de la investigación con licencias de uso, independientemente del medio en que se encuentre la información
                                                        (electrónica, impresa etc.) los miembros del equipo del presente estudio de investigación se conducirán según los
                                                        siguientes principios:
                                                    </Box>
                                                    <Box
                                                        sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 2 }}
                                                    >
                                                        <List sx={{ width: '100%' }}>
                                                            {
                                                                principios.map((item) => {
                                                                    return (
                                                                        <ListItem key={item.key}>{item.key + ".- " + item.value}</ListItem>
                                                                    )

                                                                })
                                                            }
                                                    
                                                        </List>
                                                    </Box>
                                                    <Box
                                                        sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}
                                                    >
                                                        Todos los miembros del grupo son responsables de su buen uso y asumen las responsabilidades por su mal uso al
                                                        ocasionar daños a las personas que participaron en el proyecto.
                                                        <br />
                                                        Para poder hacer difusión pública de los resultados del proyecto de investigación se deben observar:

                                                    </Box>
                                                    <Box
                                                        sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 2 }}
                                                    >
                                                        <List sx={{ width: '100%' }}>
                                                            {
                                                                puntosObservacion.map((item) => {
                                                                    return (
                                                                        <ListItem key={item.key}>{item.key + ".- " + item.value}</ListItem>
                                                                    )

                                                                })
                                                            }

                                                        </List>
                                                    </Box>
                                                    <Box
                                                        sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 }}
                                                    >
                                                        En Guayaquil, dia
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
                                                        
                                                    </Box>
                                                    <Box
                                                        sx={{ wordBreak: 'break-word', textAlign: 'justify', lineHeight: '2', pt: 3 , fontWeight: 'bold' }}
                                                    >

                                                        Firma del responsable del proyecto de investigación
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

export default Anexo4;