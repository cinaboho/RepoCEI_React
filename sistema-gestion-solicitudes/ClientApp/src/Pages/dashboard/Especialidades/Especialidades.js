import { Component } from "react";
import {
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Tabla from "../../../components/Table/Tabla";
import { API_URL } from "../../../Utils/Variables";
import { ButtonStyled } from "../../../Utils/CustomStyles";
import EspecialidadAction from "./EspecialidadAction";
import AddEspecialidad from "./AddEspecialidad";
import EditEspecialidad from "./EditEspecialidad";
import FormDialog from "../../../components/Dialog/Dialogo";
import SnackBar from "../../../components/Snackbar";

class Especialidades extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            listaEspecialidades: [],
            isCreateModalOpen: false,
            openSnackbar: false,
            messageInfo: "",
            severity:"",
        }

    }




    async componentDidMount() { 
        await this.cargarEspecialidad();
    }

    cargarEspecialidad() {
        fetch(API_URL + '/Especialidad')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    listaEspecialidades: data,
                    loading: false,
                })
            });
            
    }

    //Eventos del Formulario para crear

    handleModelOpen() {
        this.setState({
            isCreateModalOpen:true
        })
    };


    handleModelClose = () => {
        this.setState({
            isCreateModalOpen: false
        })
    };

    //

    handleShowSnackBar = (success, message) => {
        if (success) {
            this.setState({
                isLoading:true,
                isCreateModalOpen: false,
                openSnackbar: true,
                messageInfo: message,
                severity: "success",
            })
            this.cargarEspecialidad()
        }
        else
        {
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


    handleEditClick = (rowData) => {
        // Aquí puedes establecer cualquier otro estado necesario antes de abrir el modal
        this.setState({
            selectedRow: rowData, // Guarda los datos de la fila seleccionada
            dialogEditOpen: true, // Abre el modal de edición
        });
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
                    <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>Especialidades</Typography>

                    <div className="d-flex justify-content-end mb-3">
                        <ButtonStyled variant="contained"
                            onClick={() => this.handleModelOpen()}
                        >
                            Nueva Especialidad
                        </ButtonStyled>
                    </div>
                    <>
                        <Tabla isLoading={this.state.loading}
                            headerNames={[{

                            field: "id",
                            headerName: "ID",
                            type: "integer",
                            width: 90,
                            hideable: false,
                            headerAlign: 'center',
                            align: 'center',
                        },
                            {
                                field: "nombre",
                                headerName: "Nombre",
                                type: "string",
                                width: 200,
                                hideable: false,
                            },
                            {
                                field: "estado",
                                headerName: "Estado",
                                type: "boolean",
                                width: 150,
                                headerAlign: 'center',
                                align: 'center',
                                hideable: false,
                                renderCell: (params) => {
                                    return (
                                        <EspecialidadAction parametros={params.row} snackBar={this.handleShowSnackBar} handleClose={this.handleModelClose} />
                                    );
                                },

                                },editColumn,]}
                            data={this.state.listaEspecialidades}
                        />
                    </>
                </div>
                <EditEspecialidad
                        open={this.state.dialogEditOpen}
                        handleClose={() => this.setState({ dialogEditOpen: false })}
                        // Aquí pasarías los datos de la fila seleccionada al modal, que podrías tener guardados en el estado.
                        data={this.state.selectedRow}
                        handleSnackBar={this.handleShowSnackBar}
                    />
                <AddEspecialidad open={this.state.isCreateModalOpen} handleClose={this.handleModelClose} handleSnackBar={this.handleShowSnackBar} />

                <SnackBar message={this.state.messageInfo} open={this.state.openSnackbar} severity={this.state.severity} onClose={this.handleCloseSnackBar} />


            
            </>

        )
    }
} export default Especialidades;

/*
                <FormDialog
                    title={"Nueva Especialidad"}
                    isOpen={this.state.isCreateModalOpen}
                    handleClose={this.handleModelClose}
                    content={<AddEspecialidad handleClose={this.handleModelClose} handleSnackBar={this.handleShowSnackBar} />}
                />



*/