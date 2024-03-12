import { Component } from "react";
import {
     Typography
} from "@mui/material";
import { API_URL } from "../../../Utils/Variables";
import { ButtonStyled } from "../../../Utils/CustomStyles";

const HeaderPermisos = [
    {

        field: "id",
        headerName: "ID",
        type: "integer",
        width: 90,
        headerAlign: 'center',
    },
    {
        field: "name",
        headerName: "Nombre",
        type: "string",
        width: 200,
    },
    {
        field: "Acción",
        headerAlign: 'center',
        renderCell: (cellValues) => {
            return (
                <></>
            );
        },
        width: 100,
    },

]
class Permisos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            listaPermisos: [],
        }

    }

    componentDidMount() {
        fetch(API_URL + '/Permission')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    listaPermisos: data,
                    loading: false,
                })
            });

    }


    render() {

        return (

            <>
                <div className="d-flex flex-column m-3">
                    <Typography sx={{ fontWeight: 'bold', textAlign: "center" }}>Permisos</Typography>

                    <div className="d-flex justify-content-end m-3">
                        <ButtonStyled variant="contained"
                            
                        >
                            Nuevo Permiso
                        </ButtonStyled>
                    </div>
                  

                </div>
            </>

        )
    }
} export default Permisos;