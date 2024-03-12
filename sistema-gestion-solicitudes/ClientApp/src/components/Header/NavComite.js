import {
    Typography, IconButton
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export const NavComite = () => {

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, color: 'white' }}
                >
                    Comité de Ética en Investigación
                </Typography>

                <div>
                    {Redes.map((red) => (
                        <IconButton key={red.nombre}
                            onClick={() => window.open(red.url, "_blank")}
                        >
                            {red.icon}
                        </IconButton>
                    ))}
                   
                </div>
                
               
                
            </div>
        </>

    )

}; export default NavComite;

const Redes = [
    {
        nombre: "Facebook",
        url: "https://www.facebook.com/espol",
        icon:   <FacebookIcon  sx = {{ color: 'white' }}/>,

    },
    {
        nombre: "Twitter",
        url: "https://twitter.com/espol",
        icon: <TwitterIcon sx={{ color: 'white' }} />,

    },
    {
        nombre: "Instagram",
        url:"https://www.instagram.com/espol1/",
        icon: <InstagramIcon sx={{ color: 'white' }} />

    },
    {
        nombre: "Linkedin",
        url: "https://www.linkedin.com/company/espol/",
        icon: <LinkedInIcon sx={{ color: 'white' }} />

    }

]