import { Component } from "react";
import {
    Box, Stepper,
    StepLabel, Step,
} from "@mui/material";


const stepsNames = [
    "Completar Formulario Inicial",
    "Revisión de Documentación",
    "Análisis de Factibilidad",
    "Asignación de Revisores",
    "Generación de Informes",
    "Redacción de Resolución"
]


class StepSolicitud extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }

    }


    render() {

        return (
            <>
                <Box>
                    <Stepper alternativeLabel activeStep={this.props.numberStep}>
                        {stepsNames.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                        </Stepper>
                </Box>
            </>
        
        )


    }

}; export default StepSolicitud;