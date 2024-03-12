import { useState } from 'react';
import { Button, Box,Typography } from "@mui/material";
import MessageCard from "../../../../../components/Card/MessageCard";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ButtonStyled, BtnCancel } from "../../../../../Utils/CustomStyles";
import ConfirmDialog from "../../../../../components/Dialog/ConfirmDialog";
import { API_URL } from '../../../../../Utils/Variables';
import { useNavigate } from 'react-router-dom';
import AnexosList from "../../Secciones/AnexosSection";
import MetodosFetch from '../../../../../Servicios/MetodosFetch';


const SolicitudCreada = (props) => {
    const { solicitud , fetchData} = props;
    const [openConfirm, setOpenConfirm] = useState(false);
    const navigate = useNavigate();
    const newAnexo = solicitud.solicitudDetalle.anexos.length ===0;


    const openConfirmationDialog = () => {
        setOpenConfirm(true);
    }


    const handleContinue = async () => {

        solicitud.estadoId = 2;

        let res = await fetch(API_URL + "/Solicitud/" + solicitud.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitud)
        })
        if (res.status === 200) {
            handleCancel();
            fetchData();
        }
        else {

        }


    }

    const handleCancel = () => {
        setOpenConfirm(false);
    }

    const CreateAnexo = async () => {

        const data = JSON.stringify({
            SolicitudDetalleId: solicitud.solicitudDetalle.id,
            TipoAnexoId: 1,
        })

        let res = await MetodosFetch.CreateAnexo(data);
        if (res.ok) {
            const anexo = await res.json();
            navigate("/Anexo1A/" + anexo.id);

        }

    }


    return (
        <>
            {newAnexo ?
                <>
                    <MessageCard message={"1.- Completar el primer anexo"}/>
                    <Box sx={{ mb: 2.5 }}>
                        <Button variant="text" startIcon={<InsertDriveFileIcon />} onClick={CreateAnexo} >
                            Anexo 1A
                        </Button>
                    </Box>
                </>

                :
                <>
                    <AnexosList anexos={solicitud.solicitudDetalle.anexos} estado={solicitud.estado.nombre} /> 
                    

                </>


            }

           
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <ButtonStyled variant="contained" onClick={openConfirmationDialog} >
                    Enviar
                </ButtonStyled>
            </Box>


            <ConfirmDialog title={"Confirmación de Envio"} open={openConfirm} handleClose={handleCancel}>
                <Typography variant="subtitle1">
                    Revisar que los anexos/documentos solicitados han sido correctamente completados.
                </Typography>    
                <Typography variant="subtitle1">
                    Una vez listo haga click en continuar
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2}} >
                    <ButtonStyled onClick={handleContinue} variant="contained">Confirmar</ButtonStyled>
                    <BtnCancel onClick={handleCancel} variant="outlined" color="error" >Cancelar</BtnCancel>

                </Box>
            </ConfirmDialog>

        </>  
       
        

    )

}
export default SolicitudCreada;
