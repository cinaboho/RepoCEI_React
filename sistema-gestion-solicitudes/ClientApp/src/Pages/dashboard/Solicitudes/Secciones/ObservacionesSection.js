import {
    Box, Typography, ListItem, ListItemIcon,
    ListItemText, List
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { TypographyTitle } from "../../../../Utils/CustomStyles";
import NotesIcon from '@mui/icons-material/Notes';


const ObservacionesList = (props) => {

    const { observaciones } = props;
    const [listObservaciones, setListObservaciones] = useState([]);

    const splitObservaciones = useCallback(() => {

        setListObservaciones(observaciones.split(',').filter(Boolean));

    }, [observaciones])


    useEffect(() => {
        splitObservaciones();

    }, [splitObservaciones])

    return (
        <>  
            <Box sx={{ mb: 2 }}>    
                <TypographyTitle> Observaciones reuniones realizadas</TypographyTitle>
                {listObservaciones?.length !== 0 ?
                    <>
                       <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} dense>
                            {listObservaciones?.map((obv) => {
                                return(
                                    <ListItem key={obv}>
                                        <ListItemIcon>
                                            <NotesIcon sx={{ml:1}} />
                                        </ListItemIcon>
                                        <ListItemText>{obv}</ListItemText>
                                        </ListItem>
                                    )
                                })

                                }
                            </List>
                    </>
                    :
                    <>
                        <Box sx={{ display: 'flex', my: 2, border: '1px dashed grey', backgroundColor: '#2532600f', borderRadius: 3 }}>
                            <Typography variant="subtitle2" sx={{ m: 2 }}> No se ingresaron observaciones de reuniones</Typography>
                        </Box>
                    </> 
                  

                }
            </Box>    

        </>
    )
}; export default ObservacionesList;