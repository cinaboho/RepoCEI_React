import { useState, useEffect } from "react";
import {
    Typography, IconButton
} from "@mui/material";
import Tabla from "../../components/Table/Tabla";
import { ButtonStyled } from "../../Utils/CustomStyles";
import { API_URL } from "../../Utils/Variables";


const headerTipoSolicitud = [
    {

        field: "id",
        headerName: "ID",
        type: "string",
        width: 90,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "nombre",
        headerName: "Nombre",
        type: "string",
        width: 150,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "diasPlazo",
        headerName: "Días Plazo",
        type: "int",
        width: 150,
        headerAlign: 'center',
        align: 'center',
    },



]


const PlazosEntrega = () => {

    const [loading, setLoading] = useState(true);
    const [listaTiposSolicitud, setListaTiposSolicitud] = useState([]);
    const [newTipoSolicitud, setNewTipoSolicitud] = useState([]);



    useEffect(() => {

        fetch(API_URL + '/TipoSolicitud')
            .then((response) => response.json())
            .then((data) => {
                setListaTiposSolicitud(data);
                setLoading(false);
            });




    },[])


    return (
        <>
            <>
                <div className="d-flex flex-column m-3">
                    <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>Tipos de solicitud y Plazos de entrega</Typography>

                    <div className="d-flex justify-content-end m-3">
                        {/*
                            <ButtonStyled variant="contained" sx={{ background: "#253260" }}
                                onClick={() => setNewTipoSolicitud(true)}
                            >
                                Nuevo tipo de solicitud
                            </ButtonStyled>
                        */}
                       
                    </div>
                    <>

                        <Tabla isLoading={loading}
                            headerNames={headerTipoSolicitud}
                            data={listaTiposSolicitud}
                            type={"TipoSolicitud"}
                        />

                    </>

                </div>
            </>
        </>

    )



}; export default PlazosEntrega; 