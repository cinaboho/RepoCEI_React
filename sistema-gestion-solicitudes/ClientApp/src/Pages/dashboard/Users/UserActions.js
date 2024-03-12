import { useState } from 'react';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { BtnCancel, ButtonStyled, SwitchStyled } from '../../../Utils/CustomStyles';
import { API_URL } from '../../../Utils/Variables';
import {
    Box, Typography
} from "@mui/material";

const UserActions = ({ parametros, snackBar , handleClose}) => {

    const [toggle, setToggle] = useState(parametros.estado);
    const [open, setOpen] = useState(false);

    const changeSwitch = async () => {
        setOpen(!open);
        ///updateRole();
    }

    const handleCancel = () => {
        setOpen(!open);
    }

    const updateUser = async () => {
       
        parametros.estado = !toggle;

        let res = await fetch(API_URL + /User/ + parametros.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parametros)
        })
        if (res.status === 200) {
            snackBar(true, "Usuario actualizado exitosamente")
            setToggle(!toggle);
            setOpen(!open);

        }
        else {
            snackBar(false, "Error al actualizar Usuario")  
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
                    <ButtonStyled onClick={updateUser} variant="contained">Confirmar</ButtonStyled>
                    <BtnCancel onClick={handleCancel} variant="outlined" color="error">Cancelar</BtnCancel>

                </Box>

            </ConfirmDialog>

           

        </>

    )


}; export default UserActions;

