import { Component } from "react";
import {
    Typography, ListItem, List
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Tabla from "../../../components/Table/Tabla";
import { ButtonStyled } from "../../../Utils/CustomStyles";
import UsersActions from "./UserActions";
import AddUser from "./AddUserForm";
import EditUser from "./EditUser";
import SnackBar from "../../../components/Snackbar";
import { API_URL } from "../../../Utils/Variables";

class Usuario extends Component {

    constructor() {
        super();
        this.state = {
            isCreateModalOpen:false,
            listaUsuarios: [],
            loading: true,
            openSnackbar: false,
            messageInfo: "",
            severity: "",
        }
    }  


    async componentDidMount() {
       
        this.cargarUsuarios();
         
    }

    cargarUsuarios() {
        try {
            fetch(API_URL + '/User')
                .then(response => response.json())
                .then(data => {
                    this.setState(
                        {
                            listaUsuarios: data,
                            loading: false,
                        });
                });
        } catch (error) { console.error(error) };
        
            
    }

   

    handleModelOpen() {
        this.setState({
            isCreateModalOpen: true
        })
    };


    handleModelClose = () => {
        this.setState({
            isCreateModalOpen: false
        })
    };

    handleEditClick = (rowData) => {
        // Aquí puedes establecer cualquier otro estado necesario antes de abrir el modal
        this.setState({
            selectedRow: rowData, // Guarda los datos de la fila seleccionada
            dialogEditOpen: true, // Abre el modal de edición
        });
    };

    handleShowSnackBar = (success, message) => {
        if (success) {
            this.setState({
                isLoading: true,
                openSnackbar: true,
                messageInfo: message,
                severity: "success",
            })
            this.cargarUsuarios();
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

        return (
            <>
                <div className="d-flex flex-column m-3">
                    <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>Usuarios</Typography>

                    <div className="d-flex justify-content-end m-3">

                        <ButtonStyled variant="contained" sx={{ background: "#253260" }}
                            onClick={() => this.handleModelOpen()}
                            
                        >
                            Nuevo Usuario
                        </ButtonStyled>
                    </div>
                    <>

                        <Tabla isLoading={this.state.loading}
                            headerNames={[
                                {
                                    field: "id",
                                    headerName: "ID",
                                    type: "integer",
                                    width: 80,
                                    headerAlign: 'center',
                                    align: 'center',

                                },
                                {
                                    field: "username",
                                    headerName: "Username",
                                    type: "string",
                                    width: 200,

                                },
                                {
                                    field: "fullName",
                                    headerName: "Nombres",
                                    valueGetter: (params) =>
                                        `${params.row.nombres || ''} ${params.row.apellidos || ''}`,
                                    width: 250,
                                },
                                {
                                    field: "Especialidades",
                                    headerName: "Especialidades",
                                    type: "string",
                                    width: 200,
                                    headerAlign: 'center',
                                    align: 'center',
                                    renderCell: (params) =>
                                    {
                                        return (
                                            <>
                                                {(params.row.especialidades.length) !== 0 ?
                                                    <List dense>
                                                        {params.row.especialidades.map((especialidad) => {
                                                            return (
                                                                <ListItem key={especialidad.id}>{especialidad.nombre}</ListItem>
                                                            )
                                                        })}
                                                    </List>
                                               
                                                    :
                                                <div>Sin asignar</div>
                                            }
                                            
                                            </>
                                            
                                        )
                                    }    
                                    
                                }, 
                                {
                                    field: "role",
                                    headerName: "Roles",
                                    type: "string",
                                    width: 200,
                                    headerAlign: 'center',
                                    align: 'center',
                                    renderCell: (params) => {
                                        return (
                                            <>
                                                {(params.row.roles.length) !== 0 ?
                                                    <List dense>
                                                        {
                                                            params.row.roles.map((rol) => {
                                                                return (
                                                                    <ListItem key={rol.id}>{rol.nombre}</ListItem>
                                                                )
                                                            })
                                                        }

                                                    </List>
                                                    
                                                    :
                                                    <div>Sin asignar</div>
                                                }

                                            </>

                                        )
                                    }

                                },
                                {
                                    field: "estado",
                                    headerName: "Estado",
                                    align: 'center',
                                    type: "boolean",
                                    width: 150,
                                    renderCell: (params) => {
                                        return (
                                            <UsersActions parametros={params.row} snackBar={this.handleShowSnackBar} handleClose={this.handleCloseCreate} />
                                        );  
                                    },
                                },
                                editColumn

                            ] }


                            data={this.state.listaUsuarios} type={"Usuario"} />
                    </>

                    <EditUser
                        open={this.state.dialogEditOpen}
                        handleClose={() => this.setState({ dialogEditOpen: false })}
                        // Aquí pasarías los datos de la fila seleccionada al modal, que podrías tener guardados en el estado.
                        data={this.state.selectedRow}
                        handleSnackBar={this.handleShowSnackBar}
                    />
                    <AddUser open={this.state.isCreateModalOpen}  handleClose={this.handleModelClose} handleSnackBar={this.handleShowSnackBar} />

                    <SnackBar message={this.state.messageInfo} open={this.state.openSnackbar} severity={this.state.severity} onClose={this.handleCloseSnackBar} />

                </div>
            </>

        )
    }
} export default Usuario;



/*

                    {<FormDialog
                        title={"Nuevo Usuario"}
                        isOpen={this.state.isCreateModalOpen}
                        handleClose={this.handleModelClose}
                        content={<AddUser handleClose={this.handleModelClose} handleSnackBar={this.handleShowSnackBar} />}
                    />}



*/

