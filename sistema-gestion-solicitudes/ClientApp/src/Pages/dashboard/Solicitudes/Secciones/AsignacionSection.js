import {
    ListItem, ListItemIcon, Button, IconButton,
    ListItemText, List, Box, Typography
} from "@mui/material";
import { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { TypographyTitle, ButtonStyled, BtnCancel } from '../../../../Utils/CustomStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import MetodosFetch from "../../../../Servicios/MetodosFetch";

const AsignacionSection = (props) => {
    const { asignaciones, estado ,fetchData} = props;
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [asignacionSelected, setAsignacionSelected] = useState();

    const deleteAsignacion = async () => {
        let response = await MetodosFetch.DeleteAsignacion(asignacionSelected)
        if (response.ok) {
            setAsignacionSelected();
            setOpenConfirmacion(false);
            fetchData();
        }
        else {

        }


    }

    const handleConfirmDialog = (id) => {
        setAsignacionSelected(id);
        setOpenConfirmacion(true);
    }



    return (
        <>  
            <Box sx={{ mb: 2 }}>
                {estado === 'Asignada' ?
                    <TypographyTitle> Miembros Asignados</TypographyTitle>
                    :
                    <TypographyTitle>Miembros Asignados e Informes </TypographyTitle>
                }
                {asignaciones?.length !== 0 ?
                    <>
                        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} dense>
                            {asignaciones?.map((asignacion) => {
                                return (
                                    <ListItem key={asignacion.id} disablePadding>
                                        <ListItem component={Button} sx={{ color: 'black' }} >
                                            <ListItemIcon>
                                                <AssignmentIndIcon sx={{ ml: 1, color: '#201f1f61' }} />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {asignacion.userAsignado.nombres + " " + asignacion.userAsignado.apellidos}
                                            </ListItemText>   
                                        </ListItem>
                                        {asignacion.documento !== null &&
                                            <IconButton>
                                                <DownloadIcon sx={{ ml: 1, color: '#5392d0' }} />
                                            </IconButton>
                                        }

                                        {estado === 'Asignada' &&
                                            < IconButton aria-label="delete" onClick={() => handleConfirmDialog(asignacion.id)}>
                                                <DeleteIcon sx={{ color: '#263772' }} />
                                            </IconButton>


                                        }

                                    </ListItem>

                                )
                            })

                            }
                        </List>
                    </>
                    :
                    <> 
                        <Box sx={{ display: 'flex', my: 2, border: '1px dashed grey', backgroundColor: '#2532600f', borderRadius: 3 }}>
                            <Typography variant="subtitle2" sx={{m:2}}>
                                    Ningún miembro ha sido asignado como revisor
                                </Typography>
          
                        </Box>
                    </>

                }
            </Box>

            <ConfirmDialog title={"Confirmación eliminación"} open={openConfirmacion} handleClose={() => setOpenConfirmacion(false)}>
                <Typography variant="subtitle1">
                    ¿Esta seguro que desea eliminar la asignación?
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }} >
                    <ButtonStyled onClick={deleteAsignacion} variant="contained" sx={{ mt: 2 }}>Confirmar</ButtonStyled>
                    <BtnCancel onClick={() => setOpenConfirmacion(false)} variant="outlined" color="error" sx={{ mt: 2 }}>Cancelar</BtnCancel>

                </Box>
            </ConfirmDialog>



        </>

    )





}; export default AsignacionSection;