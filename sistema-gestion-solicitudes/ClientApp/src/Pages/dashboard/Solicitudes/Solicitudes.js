import { useState, useEffect } from "react";
import {
    Typography, IconButton
} from "@mui/material";
import Tabla from "../../../components/Table/Tabla";
import { ButtonStyled } from "../../../Utils/CustomStyles";
import { API_URL } from "../../../Utils/Variables";
import * as moment from 'moment';
import CreateSolicitud from "./AddSolicitudForm";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SnackBar from "../../../components/Snackbar";


const headerSolicitudes = [
    {
        field: "codigo",
        headerName: "Código",
        type: "string",
        width: 90,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: "titulo",
        headerName: "Proyecto",
        type: "string",
        width: 300,
    },
    {
        field: "estado",
        headerName: "Estado",
        type: "string",
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return (
                <div>
                    {params.row.estado.nombre}

                </div>

            );
        },
    },
    {
        field: "fechaCreacion",
        headerName: "Fecha Creación",
        type: "Date",
        width: 200,
        headerAlign: 'center',
        align: 'center',
        valueFormatter: params =>
            moment(params?.value).format("DD-MM-YYYY"),
    },
    {
        field: "fechaCierre",
        headerName: "Fecha Cierre",
        type: "Date",
        width: 200,
        headerAlign: 'center',
        align: 'center',
        valueFormatter: params =>
            moment(params?.value).format("DD-MM-YYYY"),
        renderCell: (params) => {
            return (
                <>
                    {params.row.fechaCierre != null ?
                        <>{moment(params.row.fechaCierre).format("DD-MM-YYYY")}</>
                            :
                            <>--</>  
                    }
                </>
                
            );
        },
    },
    {
        id: 6,
        field: "Archivo",
        headerName: "Fecha de Resolución",
        headerAlign: 'center',
        type: "string",
        width: 150,
        align:"center",
        renderCell: (params) => {
            return (
                <>
                    {params.row.fechaResolucion != null ?
                        <>{moment(params.row.fechaResolucion).format("DD-MM-YYYY")}</>
                            :
                            <>--</>  
                    }
                </>
                
            );
        },

    },

]

const Solicitudes = () => {
    const [loading, setLoading] = useState(true);
    const [listaSolicitudes, setListaSolicitudes] = useState([]);
    const [openCreateSolicitud, setOpenCreateSolicitud] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(false);
    const [severity, setSeverity] = useState(false);


    useEffect(() => {

        var dataStorage=JSON.parse(localStorage.getItem('userEspol'));
        var idUser=dataStorage['userId'];


        fetch(API_URL + '/SolicitudesByUserId/'+idUser)
            .then((response) => response.json())
            .then((data) => {
                setListaSolicitudes(data);
                setLoading(false);
            });



    }, [])


    const openFormCreateSolicitud = () => {
        setOpenCreateSolicitud(true);
    };


    const closeCreateSolicitud = () => {
        setOpenCreateSolicitud(false);
    };


    const handleShowSnackBar = (success, message) => {
        if (success) {
            setSnackBarOpen(true);
            setMessageInfo(message);
            setSeverity("success");
            setOpenCreateSolicitud(false);

        }
        else {
            setSnackBarOpen(true);
            setMessageInfo(message);
            setSeverity("error");

        }
    }



    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
       
    };


    return (

        <>
            <div className="d-flex flex-column m-3">
                <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>Solicitudes</Typography>

                <div className="d-flex justify-content-end m-3">

                    <ButtonStyled variant="contained" sx={{ background: "#253260" }}
                        onClick={()=> setOpenCreateSolicitud(true)}
                    >
                        Nueva Solicitud
                    </ButtonStyled>
                </div>
                <>

                    <Tabla isLoading={loading}
                        headerNames={headerSolicitudes}
                        data={listaSolicitudes}
                        type={"Solicitud"}
                    />
                </>


                <CreateSolicitud open={openCreateSolicitud} handleClose={closeCreateSolicitud} handleSnackBar={handleShowSnackBar} />

                <SnackBar message={messageInfo} open={snackBarOpen} severity={severity} onClose={handleCloseSnackBar} />
               


            </div>
        </>

    )


}
export default Solicitudes;

{/*
    
                {<FormDialog
                    title={"Nueva Solicitud"}
                    isOpen={openCreateSolicitud}
                    handleClose={closeCreateSolicitud}
                    content={<CreateSolicitud handleClose={closeCreateSolicitud} handleSnackBar={handleShowSnackBar} />}
                />}

*/
}