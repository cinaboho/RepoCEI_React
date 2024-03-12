import { Component } from "react";
import {
    Divider, Box, Typography,
    ListItem, ListItemText, List,
    Grid
} from "@mui/material"
import * as moment from 'moment';

const SolicitudCard = (props) => {
    const { data } = props;

    return (
        <Grid container sx={{ border: "0.5px solid #8080802e", mb:4}} >

            <Grid container >
                <Grid item xs={6} md={5} lg={2} sx={{ background: "#253260", py:0.4, pl: 1 }} >
                    <Typography variant="subtitle2" sx={{ color: "white" }}>Titulo de Proyecto:</Typography>
                </Grid>
                <Grid item xs={6} md={7} lg={10} sx={{py: 0.4, pl: 1 }}>
                    <Typography variant="subtitle2"> {data.titulo}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6} md={5} lg={2} sx={{ background: "#253260", py: 0.4, pl: 1 }} >
                    <Typography variant="subtitle2" sx={{ color: "white" }}>Solicitante:</Typography>
                </Grid>
                <Grid item xs={6} md={7} lg={10} sx={{ py: 0.4, pl: 1 }}>
                    <Typography variant="subtitle2">{data.usuario.nombres} {data.usuario.apellidos}</Typography>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={6} md={5} lg={2} sx={{ background: "#253260", py: 0.4, pl: 1 }} >
                    <Typography variant="subtitle2" sx={{ color: "white" }}>Correo Electrónico:</Typography>
                </Grid>
                <Grid item xs={6} md={7} lg={10} sx={{ py: 0.4, pl: 1 }}>
                    <Typography variant="subtitle2"> {data.usuario.correo}</Typography>
                </Grid>
            </Grid>

            <Grid container >
                <Grid item xs={6} md={5} lg={2} sx={{ background: "#253260", py: 0.4, pl: 1 }} >
                    <Typography variant="subtitle2" sx={{ color: "white" }}>Fecha  Creación:</Typography>
                </Grid>
                <Grid item xs={6} md={7} lg={10} sx={{ py: 0.4, pl: 1 }}>
                    <Typography variant="subtitle2">  {moment(data.fechaCreacion).format("DD-MM-YYYY")} </Typography>
                </Grid>

            </Grid>

            <Grid container>
                <Grid item xs={6} md={5} lg={2} sx={{ background: "#253260", py: 0.4, pl: 1 }} >
                    <Typography variant="subtitle2" sx={{ color: "white" }}>Estado: </Typography>
                </Grid>
                <Grid item xs={6} md={7} lg={10}  sx={{ py: 0.4, pl: 1 }}>
                    <Typography variant="subtitle2">  {data.estado.nombre} </Typography>
                </Grid>


            </Grid>

            {data.fechaRevision&&
                <Grid container>
                    <Grid item xs={6} md={5} lg={2} sx={{ background: "#253260", py: 0.4, pl: 1 }} >
                        <Typography variant="subtitle2" sx={{ color: "white" }}>Fecha de Inico Revisión: </Typography>
                    </Grid>
                    <Grid item xs={6} md={7} lg={10}  sx={{ py: 0.4, pl: 1 }}>
                        <Typography variant="subtitle2">  {moment(data.fechaRevision).format("DD-MM-YYYY")} </Typography>
                    </Grid>


                </Grid>

            }
            {data.fechaCierre &&
                <Grid container>
                    <Grid item xs={6} md={5} lg={2} sx={{ background: "#253260", py: 0.4, pl: 1 }} >
                        <Typography variant="subtitle2" sx={{ color: "white" }}>Fecha Cierre de Proceso: </Typography>
                    </Grid>
                    <Grid item xs={6} md={7} lg={10}  sx={{ py: 0.4, pl: 1 }}>
                        <Typography variant="subtitle2"> {moment(data.fechaCierre).format("DD-MM-YYYY")} </Typography>
                    </Grid>


                </Grid>

            }


            </Grid>    
            
        )
       
    

}; export default SolicitudCard;

