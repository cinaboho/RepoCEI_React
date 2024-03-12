import { Card, CardHeader, CardContent, CardActions, Typography, Box, CardMedia, IconButton } from "@mui/material"
import PropTypes from 'prop-types';
import headerImage from "../../assets/headerImage.jpg";
import footerImage from "../../assets/footerImage.jpg";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate, useParams } from 'react-router-dom';



const CardFormWrapper = ({ children, title,...other }) => (


    <Card sx={{ width: '100%', height: "100%", overflowY: 'scroll' }} >
        <Box sx={{ display: 'flex' }}>
            <Box>
                <IconButton aria-label="back" size="small" sx={{ mt: 3, ml: 4 }}>
                <ArrowBackRoundedIcon  />
                </IconButton>
            </Box>
            <CardMedia
                component="img"
                image={headerImage}
                title="header"
                sx={{ width: '80%', alignSelf:'center'}}
            />
        </Box>
        {title &&

            <CardHeader
                title={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} >{title}</Typography>}
                sx={{ textAlign: 'center', mt: 1, mr:3, ml:3  }}
            >
               


            </CardHeader>

        }
        <CardContent
            sx={{  py: 4, px:6 ,fontFamily: `"Roboto","Helvetica","Arial",sans-serif` }}
        >
            {children} 
        </CardContent>

        <CardActions>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardMedia
                    component="img"
                    image={footerImage}
                    title="header"
                    sx={{ width: '70%' }}
                />
            </Box>
        </CardActions>
           
        
    </Card>



);


CardFormWrapper.propTypes = {
    children: PropTypes.node
};

export default CardFormWrapper;