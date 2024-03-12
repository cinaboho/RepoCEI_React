import React, { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = ({ open, onClose, severity, message }) => {

    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;


    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={onClose}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert
                    onClose={onClose}
                    severity={severity}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SnackbarComponent;
