import * as React from 'react';
import {
    DialogTitle, DialogContent,
    DialogActions, Divider,
    Typography
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogStyled } from '../../Utils/CustomStyles';

const ConfirmDialog = ({ children, open, title, handleClose, ...other }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



    return (
        <DialogStyled
            fullScreen={fullScreen}
            open={open}
            aria-labelledby="responsive-dialog-title"

        >
            <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center', backgroundColor: '#253260' }}>
                <Typography sx={{color:'white', fontWeight:'bold'}}>
                    {title}
                </Typography>    

            </DialogTitle>

            <Divider flexItem sx={{ bgcolor: 'black' }} />
            <DialogContent sx={{textAlign:'center'}}>
                {children}
            </DialogContent>
            

        </DialogStyled>

    );
}
export default ConfirmDialog;
