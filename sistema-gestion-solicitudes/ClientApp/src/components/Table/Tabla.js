import { Component } from "react";
import {
    Box, Stack,
    Avatar
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import search from "../../assets/search.png";
import { Navigate } from "react-router-dom";
class Tabla extends Component {

    constructor(props) {
        super(props);
        this.state = {
            path: '',
        }
    }

    handleRowClick = (param, event) => {

        if (this.props.type === "Solicitud") {
            let pathSolicitud = "/Solicitud/" + param.id;
            this.setState({
                path: pathSolicitud,
                open:true,
            })
        }

    };

    render() {

        return (
            <>
                <Box 
                    style={{ height: '65vh' }}
                >
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#253260",
                                color: "white",
                            },
                            '.MuiDataGrid-columnSeparator': {
                                display: 'none',
                            },
                            '.MuiDataGrid-cell--textCenter': {
                                justifyContent: 'center'
                            }
                        }}
                        rows={this.props.data}
                        columns={this.props.headerNames}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 8,
                                },
                            },
                        }}
                        loading={this.props.isLoading}
                        disableSelectionOnClick={true}
                        pageSizeOptions={[5]}
                        onRowClick={(e) => this.handleRowClick(e)}
                        getRowId={(row) => row.id}
                        //getRowHeight={() => 'auto'}
                        components={{
                            NoRowsOverlay: () => (
                                <Stack height="100%" alignItems="center" justifyContent="center">
                                    No existen registros en el momento
                                </Stack>
                            ),
                            NoResultsOverlay: () => (
                                <Stack height="100%" alignItems="center" justifyContent="center">
                                    <Avatar
                                        alt="No results"
                                        src={search }
                                        sx={{ width: 120, height: 100 }}
                                    />
                                    
                                        No se encontraron resultados que coincidan con su busqueda
                                </Stack>
                            )
                        }}
                        
                        />
                    </Box>
                {this.state.open &&
                    (<Navigate to={this.state.path} replace={ true}/>)

                }

            </>
        )
    }

}; export default Tabla;
