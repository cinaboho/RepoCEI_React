import { useEffect, useState } from "react";
import {
    Accordion, AccordionSummary,
    AccordionDetails, Typography,Box
} from "@mui/material";
import { API_URL } from "../../../../Utils/Variables";
import { useParams } from 'react-router-dom';
import StepSolicitud from "../../../../components/Stepper/Stepper";
import { TypographyTitle, BtnChat } from "../../../../Utils/CustomStyles";
import SolicitudCard from "../../../../components/Card/SolicitudCard";
import VistaResolucion from "./Estados/Resolucion";
import VistaIniciada from "./Estados/Iniciada";
import VistaFactibilidad from "./Estados/Factibilidad";
import VistaRevision from "./Estados/Revision";
import VistaAsignacion from "./Estados/Asignacion";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Loading from "../../../../components/Loader/Loading";
import VistaFinalizada from "./Estados/Finalizada";

function RenderStatus(props) {
    const { data, fetchData  } = props;
    switch (data.estado.nombre) {
        case "Iniciada":
            return <VistaIniciada solicitud={data} fetchData={fetchData} />
        case "Factibilidad":
            return <VistaFactibilidad solicitud={data} fetchData={fetchData} />
        case "Asignada":
            return <VistaAsignacion solicitud={data} fetchData={fetchData} />
        case "En Revisión":
            return <VistaRevision solicitud={data} fetchData={fetchData} />
        case "Resolución":
            return <VistaResolucion solicitud={data} fetchData={fetchData} />
        case "Finalizada":
            return <VistaFinalizada solicitud={data} fetchData={fetchData}  />
        default:
            return null;
    }
}


const SolicitudComponent = () => {

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [datoSolicitud, setDatoSolicitud] = useState({});
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const fetchData = (async () => {
        setLoading(true);
        try {

            await fetch(API_URL + "/Solicitud/" + params.id)
                .then(response => response.json())
                .then(data => {
                    setDatoSolicitud(data);
                    setLoading(false);
                })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });



    useEffect(() => {
        fetchData();

    }, []);



    return (
        <>
            {loading ?
                <Loading />     
                :
                <>
                    <div className="d-flex flex-column m-3">

                        <div className="d-flex justify-content-end">
                            <StepSolicitud numberStep={datoSolicitud?.estado.id - 1} />
                        </div>

                        <TypographyTitle> SOLICITUD # {datoSolicitud?.codigo} </TypographyTitle>
                        <SolicitudCard data={datoSolicitud} />
                        {datoSolicitud.estado.nombre!=='Creada' &&
                            <Box sx={{ mb: 3 }}>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            Detalles Solicitud
                                        </Typography>

                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Resumen
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                            </Box>
                        }
                        <RenderStatus data={datoSolicitud} fetchData={fetchData} setLoading={setLoading} />
                        {datoSolicitud.estado.nombre !== 'Creada' &&
                            <BtnChat aria-label="chat" sx={{ position: 'absolute', bottom: '30px', right: '40px', backgroundColor: '#253260' }}>
                                <ChatBubbleIcon className="chatIcon" sx={{ color: 'white' }} />
                            </BtnChat>
                        }


                    </div>



                </>


            }
        </>
    )

};
export default SolicitudComponent;
