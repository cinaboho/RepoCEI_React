
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";



const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 3,
                position: 'absolute',
                width: '100%',
                bottom: 0,

            }}
        >
            <Container maxWidth="lg">
                <Box mt={2}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Derechos Reservados Gerencia de Tecnologías y Sistemas de Información © 2023
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Escuela Superior Politécnica del Litoral - Guayaquil - Ecuador Campus Gustavo Galindo
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Correo: gerenciatecnologia@espol.edu.ec
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}; export default Footer;