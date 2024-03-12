import { Component } from "react";
import {
     Typography
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';


import Tabla from "../../../components/Table/Tabla";
import { API_URL } from "../../../Utils/Variables";
import { ButtonStyled } from "../../../Utils/CustomStyles";
import VistoActions from "./VistoActions";
import FormDialog from "../../../components/Dialog/Dialogo";
import AddRole from "./AddRole";
import EditRole from "./EditRole";
import SnackBar from "../../../components/Snackbar";

class Notificaciones extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            listaNotificaciones: [],
            dialogOpen: false,
            dialogEditOpen:false,
            openSnackbar: false,
            messageInfo: "",
            severity: "",
        }

    }

    async componentDidMount() {
        this.cargarNotificaciones()        

    }

    cargarNotificaciones() {
        const userEspol = JSON.parse(localStorage.getItem('userEspol'));
        let idUser=JSON.stringify(userEspol['userId'])
        fetch(API_URL + '/Notificaciones/'+idUser)
            .then((response) => response.json())
            .then((data) => {
                console.log('data: ',data)

                let newData=[]

                for(let i=0; i<data.length; i++){
                    let notificacion=data[i]

                    // Original UTC date string
                    let utcDateStr = notificacion['fechaCreacion'];

                    // Create a date object
                    let date2 = new Date(utcDateStr);
                    date2.setHours(date2.getHours() - 5);

                    // Format the date and time
                    let day = date2.getDate().toString().padStart(2, '0');
                    let month = (date2.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
                    let year = date2.getFullYear();
                    let hours = date2.getHours().toString().padStart(2, '0');
                    let minutes = date2.getMinutes().toString().padStart(2, '0');

                    // Combine the parts into a final formatted string
                    let formattedDate = `${day}-${month}-${year} a las ${hours}:${minutes}`;
                    
                    notificacion['fechaCreacion']=formattedDate;
                    newData.push(notificacion);

                }

                this.setState({
                    listaNotificaciones: newData,
                    loading: false,
                })
            });
    }


    handleOpenCreate() {
        this.setState({
            dialogOpen: true
        })
    };

    handleEditClick = (rowData) => {
        // Aquí puedes establecer cualquier otro estado necesario antes de abrir el modal
        this.setState({
            selectedRow: rowData, // Guarda los datos de la fila seleccionada
            dialogEditOpen: true, // Abre el modal de edición
        });

        console.log('rowData: ',rowData)
    };


    handleCloseCreate = () => {
        this.setState({
            dialogOpen: false
        })
    };


    handleShowSnackBar = (success, message) => {
        if (success) {
            this.setState({
                isLoading: true,
                dialogOpen: false,
                openSnackbar: true,
                messageInfo: message,
                severity: "success",
            })
            this.cargarNotificaciones()
        }
        else {
            this.setState({
                openSnackbar: true,
                messageInfo: message,
                severity: "error",
            })

        }
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            openSnackbar: false,
        })
    };

    render() {


        const editColumn = {
            field: 'editar',
            headerName: 'Editar',
            type: 'string',
            width: 200,
            renderCell: (params) => (
                <EditIcon onClick={() => this.handleEditClick(params.row)} />
            ),
        };

        // Asegúrate de que la columna 'editar' esté incluida en tus headerNames
        const headerNames = [
            {

                field: "id",
                headerName: "ID",
                type: "integer",
                width: 90,
                headerAlign: 'center',
                align: 'center',
            },
            {
                field: "envia",
                headerName: "Enviado Por",
                type: "string",
                width: 200,
            },
            {
                field: "mensaje",
                headerName: "Mensaje",
                type: "string",
                width: 200,
            },
            
            {
                field: "fechaCreacion",
                headerName: "Notificado a las",
                type: "string",
                width: 200,
            },
            {
                field: "visto",
                headerName: "Visto",
                align: 'center',
                type: "boolean",
                width: 150,
                renderCell: (params) => {
                    return (
                        <VistoActions parametros={params.row} snackBar={this.handleShowSnackBar} handleClose={this.handleCloseCreate} />
                    );  
                },
            }
        ];

        return (

            <>
                <div className="d-flex flex-column m-3">
                    <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>Notificaciones</Typography>

                    <div >

                        <Tabla isLoading={this.state.loading}
                        headerNames={headerNames}
                        data={this.state.listaNotificaciones} 
                        />
                    </div>

                  
                    <EditRole
                        open={this.state.dialogEditOpen}
                        handleClose={() => this.setState({ dialogEditOpen: false })}
                        // Aquí pasarías los datos de la fila seleccionada al modal, que podrías tener guardados en el estado.
                        data={this.state.selectedRow}
                        handleSnackBar={this.handleShowSnackBar}
                    />
                    <AddRole open={this.state.dialogOpen} handleClose={this.handleCloseCreate} handleSnackBar={this.handleShowSnackBar} />
                    
                    <SnackBar message={this.state.messageInfo} open={this.state.openSnackbar} severity={this.state.severity} onClose={this.handleCloseSnackBar} />

                </div>
            </>

        )
    }
} export default Notificaciones;


/*

 <FormDialog
                        title={"Nuevo Rol"}
                        isOpen={this.state.dialogOpen}
                        handleClose={this.handleCloseCreate}
                        content={<AddRole handleClose={this.handleCloseCreate} handleSnackBar={this.handleShowSnackBar} />}
                    />

*/
