import * as React from 'react';
import {
    Box,
    DialogTitle, DialogContent,
    IconButton, Divider,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { DialogStyled } from '../../Utils/CustomStyles';
import PropTypes from 'prop-types';

const FormDialog = ({ children , open, title, handleClose, ...other }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <DialogStyled
           
            open={open}

        >
            <DialogTitle id="responsive-dialog-title">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                    {title}
                    <IconButton onClick={handleClose} >
                        <CancelRoundedIcon />
                    </IconButton>
                </Box>

            </DialogTitle>
            <Divider flexItem sx={{ bgcolor: 'black' }} />
            <DialogContent>
                {children}
            </DialogContent>

        </DialogStyled>

    );
}
FormDialog.propTypes = {
    children: PropTypes.node
};


export default FormDialog;


