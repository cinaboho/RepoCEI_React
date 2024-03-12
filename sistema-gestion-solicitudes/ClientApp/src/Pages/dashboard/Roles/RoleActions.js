import { useState } from 'react';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { BtnCancel, ButtonStyled, SwitchStyled } from '../../../Utils/CustomStyles';
import { API_URL } from '../../../Utils/Variables';
import {
    Box, Typography
} from "@mui/material";

const RoleActions = ({ parametros, snackBar , handleClose}) => {

    const [toggle, setToggle] = useState(parametros.estado);
    const [open, setOpen] = useState(false);

    const changeSwitch = async () => {
        setOpen(!open);
        ///updateRole();
    }


    const handleCancel = () => {
        setOpen(!open);
    }


    const updateRole = async () => {
       
        parametros.estado = !toggle;

        let res = await fetch(API_URL + /Role/ + parametros.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parametros)
        })
        if (res.status === 200) {
            snackBar(true, "Rol actualizado exitosamente")
            setToggle(!toggle);
            setOpen(!open);

        }
        else {
            snackBar(false, "Error al actualizar rol")  
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

            <ConfirmDialog title={"Actualizar Rol"} open={open} handleClose={handleClose}>
                <Typography variant="subtitle1">
                    ¿Esta seguro que desea cambiar el estado del rol seleccionado?
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                    <ButtonStyled onClick={updateRole} variant="contained">Confirmar</ButtonStyled>
                    <BtnCancel onClick={handleCancel} variant="outlined" color="error">Cancelar</BtnCancel>

                </Box>

            </ConfirmDialog>

           

        </>

    )


}; export default RoleActions;

