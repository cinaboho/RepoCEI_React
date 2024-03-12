import {  Grid  , Box , CardMedia} from "@mui/material"
import PropTypes from 'prop-types';
import headerImage from "../../assets/headerImage.jpg";

const AnexoWrapper = ({ children, ...other }) => (


    <Grid container sx={{
         justifyContent: "center", alignItems: "center",
        height: "82vh", p: 1, 
    }} >
        <Grid item xs={12} sx={{ width: '100%', height: "100%", backgroundColor: "#c9cbcc", p: 1.5, borderRadius: 3 }} >
            {children}
        </Grid>

    </Grid>


);


AnexoWrapper.propTypes = {
        children: PropTypes.node
    };

export default AnexoWrapper;
