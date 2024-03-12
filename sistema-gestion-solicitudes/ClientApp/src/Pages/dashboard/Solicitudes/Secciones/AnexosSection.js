import { Box, Button,ListItem, ListItemIcon,
    ListItemText, List, IconButton
} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import { useState, useEffect } from "react";
import { TypographyTitle } from '../../../../Utils/CustomStyles';
import { useNavigate } from 'react-router-dom';

const AnexosList = (props) => {

    const { anexos, estado } = props;
    const navigate = useNavigate();
    const showByEstado = estado !== 'Creada' && estado !== 'Iniciada';
    const [anexosCompletados, setAnexosCompletados] = useState([])
    const [anexosPorCompletar, setAnexosPorCompletar] = useState([])
    /*
    const [anexosCompletados, setAnexosCompletados] = useState(() => anexos?.filter(function (anexo) {
        return anexo.fechaUltimaModificacion !== null;
    }))
    const [anexosPorCompletar, setAnexosPorCompletar] = useState(() => anexos?.filter(function (anexo) {
        return anexo.fechaUltimaModificacion === null;
    }))
    */


    useEffect(() => {

        anexos.forEach((anexo) => {
            if (anexo.fechaUltimaModificacion !== null) {
                setAnexosCompletados(anexosCompletados => [...anexosCompletados, anexo])
            }
            else {
                setAnexosPorCompletar(anexosPorCompletar => [...anexosPorCompletar, anexo])
            }

        })

        return () => {
            setAnexosCompletados([])
            setAnexosPorCompletar([])
        }


    },[])


    return (
        <>

            {anexosCompletados?.length !== 0 &&
                <Box sx={{ mb: 2 }}>
                    {showByEstado ?
                        <TypographyTitle> Anexos Completados</TypographyTitle>
                        :
                        <TypographyTitle> Anexos Editados</TypographyTitle>
                    }
                    <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} dense>
                        {anexosCompletados.map((anexo) => {
                            return (
                                <ListItem key={anexo.tipoAnexo.tituloPrincipal} disablePadding>
                                    <ListItem component={Button} sx={{ color: 'black' }}
                                        onClick={() => navigate("/" + anexo.tipoAnexo.tituloPrincipal + "/" + anexo.id)}>
                                        <ListItemIcon>
                                            <DescriptionIcon sx={{ mx: 1, color: '#17285e' }} />
                                        </ListItemIcon>
                                        <ListItemText >
                                            {anexo.tipoAnexo.tituloPrincipal}
                                        </ListItemText>
                                    </ListItem>
                                    {showByEstado &&
                                        <IconButton sx={{ ml: 1 }} >
                                            <DownloadIcon sx={{ color: '#17285e' }} />
                                        </IconButton>

                                    }



                                </ListItem>

                            )
                        })

                        }
                    </List>
                </Box>

            }

            {anexosPorCompletar?.length !== 0 &&
                < Box sx={{ mb: 2 }}>
                    <TypographyTitle> Anexos Por Completar</TypographyTitle>
                    <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} dense>
                        {anexosPorCompletar.map((anexo) => {
                            return (
                                <ListItem key={anexo.tipoAnexo.tituloPrincipal} disablePadding>
                                    <ListItem component={Button} sx={{ color: 'black' }} onClick={() => navigate("/" + anexo.tipoAnexo.tituloPrincipal + "/" + anexo.id)}>
                                        <ListItemIcon>
                                            <DescriptionIcon sx={{ mx: 1, color: '#201f1f61' }} />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {anexo.tipoAnexo.tituloPrincipal}
                                        </ListItemText>
                                    </ListItem>
                                </ListItem>

                            )
                        })

                        }
                    </List>
                </Box>


            }



        </>

    )





}; export default AnexosList;