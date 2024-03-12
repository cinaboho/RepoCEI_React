import { useState } from 'react';
import {
    Typography, Box
} from "@mui/material";
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { BtnCancel, ButtonStyled, SwitchStyled } from '../../../Utils/CustomStyles';
import { API_URL } from '../../../Utils/Variables';

const EspecialidadAction = ({parametros, snackBar, handleClose}) =>{

    const [toggle, setToggle] = useState(parametros.estado);
    const [open, setOpen] = useState(false);

    const changeSwitch = () => {
        setOpen(!open);
    }



    const handleCancel = () => {
        setOpen(!open);
    }


    const updateEspecialidad = async () => {
        parametros.estado = !toggle;

        let res = await fetch(API_URL + /Especialidad/ + parametros.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parametros)
        })
        if (res.status === 200) {
            snackBar(true, "Especialidad actualizada exitosamente")
            setToggle(!toggle);
            setOpen(!open);
        }
        else {
            snackBar(false, "Error al actualizar especialidad")
        }


            

    }


    return (
        <>
            <Box sx={{display:'flex'}}>
                <SwitchStyled
                    name="Estado"
                    checked={toggle}
                    onChange={changeSwitch}

                />
            </Box>

            <ConfirmDialog title={"Actualizar Especialidad"} open={open} handleClose={handleClose}>
                <Typography variant="subtitle1">
                    ¿Esta seguro que desea cambiar el estado de la especialidad seleccionada?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                    <ButtonStyled onClick={updateEspecialidad} variant="contained">Confirmar</ButtonStyled>
                    <BtnCancel onClick={handleCancel} variant="outlined" color="error">Cancelar</BtnCancel>

                </Box>

            </ConfirmDialog>
               
        </>

    )
    

}; export default EspecialidadAction