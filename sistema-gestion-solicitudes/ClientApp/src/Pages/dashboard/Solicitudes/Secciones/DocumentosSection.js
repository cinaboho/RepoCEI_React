import { ListItem, IconButton, Button, ListItemIcon, ListItemText, List, Box } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { TypographyTitle } from "../../../../Utils/CustomStyles";
import DescriptionIcon from '@mui/icons-material/Description';
import { API_URL } from "../../../../Utils/Variables";
import SnackbarComponent from "../../../../components/Snackbar";
import { useState, useEffect } from "react";


const DocumentsList = (props) => {
    const { documentos, title } = props;

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [open, setOpen] = useState(false);

    const handleCloseSnackBar = (event, reason) => {
        setOpen(false);
    };

    const handleDownload = (url, nombre) => {
        //console.log('url: ',url)
        //console.log('nombre: ',nombre)

        let dataStorage=JSON.parse(localStorage.getItem('userEspol'));
        let roles=dataStorage['roles']
        console.log('roles: ',roles)

        let enableDownload=false;
        for(let i=0;i<roles.length;i+=1){
            let role = roles[i]
            if(role['nombre']=='Presidente' || role['nombre']=='Miembro del Comite' || role['nombre']=='Secretario'){
                enableDownload=true;
            }
        }

        if(enableDownload==true){
            // Crear un elemento 'a' temporal
            const url_file = `${API_URL}/archivo/download/${nombre}`;
            window.open(url_file, '_blank');
        }else{
            setMessage('Su rol no permite descargar archivos')
            setSeverity('error');
            setOpen(true);
        }
        
    };

    return (
        <>
            {documentos?.length !== 0 ?
                <Box sx={{ mb: 2 }}>
                    <TypographyTitle>{title}</TypographyTitle>
                    <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} dense>
                        {documentos?.map((doc) => {
                            return (
                                <ListItem key={doc.id} disablePadding>
                                    <ListItem component={Button} sx={{ color: 'black' }} > 
                                        <ListItemIcon>
                                            <DescriptionIcon sx={{ mx: 1, color: '#17285e' }} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {doc.nombre}
                                        </ListItemText>
                                    </ListItem>
                                    <IconButton aria-label="download" sx={{ ml: 1 }} onClick={() => handleDownload(doc.url, doc.nombre)}>
                                        <DownloadIcon sx={{ color: '#17285e' }} />
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>
                    <SnackbarComponent message={message} open={open} severity={severity} onClose={handleCloseSnackBar} />
                </Box>
                
                :
                <></>
                
            }
        </>
    );
};

export default DocumentsList;
