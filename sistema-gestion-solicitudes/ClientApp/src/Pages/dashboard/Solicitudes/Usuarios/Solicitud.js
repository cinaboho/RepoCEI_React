import { useEffect, useState } from "react";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { API_URL } from "../../../../Utils/Variables";
import { useParams } from 'react-router-dom';
import SolicitudCreada from "./Estados/VistaCreada";
import SolicitudIniciada from "./Estados/SolicitudIniciada";
import SolicitudFactibilidad from "./Estados/SolicitudFactibilidad";
import SolicitudResolucion from "./Estados/SolicitudResolucion";
import StepSolicitud from "../../../../components/Stepper/Stepper";
import { TypographyTitle, BtnChat } from "../../../../Utils/CustomStyles";
import SolicitudCard from "../../../../components/Card/SolicitudCard";
import SolicitudRevision from "./Estados/SolicitudRevision";
import Loading from "../../../../components/Loader/Loading";

function RenderStatus(props) {
    const { data , fetchData} = props;

    switch (data.estado.nombre) {
        case "Creada":
            return <SolicitudCreada solicitud={data} fetchData={fetchData} />
        case "Iniciada":
            return <SolicitudIniciada solicitud={data} fetchData={fetchData}  />
        case "Factibilidad":
            return <SolicitudFactibilidad solicitud={data} fetchData={fetchData} />
        case "Asignada":
            return <SolicitudRevision solicitud={data}  />
        case "En Revisión":
            return <SolicitudRevision solicitud={data} />
        case "Resolución":
            return <SolicitudResolucion solicitud={data}   />
        case "Finalizada":
            return <SolicitudResolucion solicitud={data}  />
        default:
            return null;
    }


}


const SolicitudComponent = () => {

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [datoSolicitud, setDatoSolicitud] = useState({});

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
                            <StepSolicitud numberStep={datoSolicitud.estado.id - 1} />
                        </div>

                        <TypographyTitle> SOLICITUD # {datoSolicitud.codigo} </TypographyTitle>
                        <SolicitudCard data={datoSolicitud} />
                        <RenderStatus data={datoSolicitud} fetchData={fetchData} /> 

                        {datoSolicitud.estado.nombre !== 'Creada' &&
                            <BtnChat aria-label="chat" sx={{ position: 'absolute', bottom: '30px', right: '40px', backgroundColor: '#253260' }}>
                                <ChatBubbleIcon className="chatIcon" sx={{color:'white'}} />
                            </BtnChat>
                        }

                    </div>
                    


                 
                </>

                
            }
        </>
    )
    
};
export default SolicitudComponent;



