import {useParams } from 'react-router-dom';
import SolicitudComponent from './Usuarios/Solicitud';
import SolicitudCEI from './CEI/SolicitudCEI';



function isRolSuperior(rolActual){

    if(rolActual==='Presidente' || rolActual==='Revisor'){
        return true;
    }else{
        return false;
    }
}

const SolicitudControl = () => {

    const params = useParams();
    //const rol = {'rol1': 'solicitante','rol2': 'presidente'};

    let userEspol=JSON.parse(localStorage.getItem('userEspol'));

    let rolActual=userEspol['roles'][0]['nombre'];


    
    return (

        <>

            {isRolSuperior(rolActual) ?
                <SolicitudCEI/>
                :
                <SolicitudComponent/>
        
            }

            



        </>

    )

}
export default SolicitudControl;

