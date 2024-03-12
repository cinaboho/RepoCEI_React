import { useState } from 'react';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { BtnCancel, ButtonStyled, SwitchStyled } from '../../../Utils/CustomStyles';
import { API_URL } from '../../../Utils/Variables';
import {
    Box, Typography
} from "@mui/material";

const VistoActions = ({ parametros, snackBar , handleClose}) => {

    const [toggle, setToggle] = useState(parametros.visto);
    const [open, setOpen] = useState(false);

    const changeSwitch = async () => {
        setOpen(!open);
        //updateVisto();
    }


    const handleCancel = () => {
        setOpen(!open);
    }


    const updateVisto = async () => {
       
        parametros.estado = !toggle;

        let res = await fetch(API_URL + '/Notificaciones/visto/' + parametros.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parametros)
        })
        if (res.status === 200) {
            snackBar(true, "Notificación actualizado exitosamente")
            setToggle(!toggle);
            setOpen(!open);

        }
        else {
            snackBar(false, "Error al actualizar notificación")  
        }


       


    }


    return (
        <>
            <div className="d-flex">
                <SwitchStyled
                    name="Estado"
                    checked={toggle}
                    onChange={changeSwitch}

                />
            </div>

            <ConfirmDialog title={"Marca como visto "} open={open} handleClose={handleClose}>
                <Typography variant="subtitle1">
                    Esta notificación será marcada como visto
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                    <ButtonStyled onClick={updateVisto} variant="contained">Confirmar</ButtonStyled>
                    <BtnCancel onClick={handleCancel} variant="outlined" color="error">Cancelar</BtnCancel>

                </Box>

            </ConfirmDialog>

           

        </>

    )


}; export default VistoActions;

