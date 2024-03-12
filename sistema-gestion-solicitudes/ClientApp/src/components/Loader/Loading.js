import {
    CircularProgress, Box
} from "@mui/material";


const Loading = () => {
    return(
        <Box sx={{ width: "100%", height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <CircularProgress color="success" />

        </Box>
    )

}; export default Loading;