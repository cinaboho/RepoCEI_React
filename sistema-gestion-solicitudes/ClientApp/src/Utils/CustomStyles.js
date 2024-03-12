import { styled } from '@mui/material/styles';
import { Button, Dialog, Switch, Card, Typography, Divider, Box , Fab} from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';



export const ButtonStyled =  styled(Button)(() => ({
   
    backgroundColor: "#253260",
    '&:hover': {
        backgroundColor: "#505b7f",
    },
    marginTop: "7px",
}));


export const BtnCancel = styled(Button)(() => ({

    '&:hover': {
        backgroundColor: "#D4A5AD",
        color:'white'
        
    },
}));

export const DialogStyled = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const SwitchStyled = styled(Switch)(() => ({

    '&.MuiSwitch-root  .Mui-checked ': {
        color: "#2E8B57"
    },
    '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
        backgroundColor: 'lightgreen'
    }

}))



export const CardLogin = styled(Card)(() => ({
    backgroundColor: '#fffdfdc9',

    '& .MuiCardContent-root': {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "35px",  
    },
}))


export const TypographyTitle = styled(Typography)(() => ({
    fontWeight: 'bold',
    marginBottom: '10px'
}))


export const DividerStyle = styled(Divider)((theme) => ({
    marginTop: '24px',
    marginBottom: '16px',
    borderColor: '#000'
}))


export const ContainerItem = styled(Box)(() => ({
    width:'100%',
    backgroundColor: '#0101011a',
    padding:'10px',
}))


export const BtnChat = styled(Fab)(() => ({
    position: 'absolute',
    bottom: '30px',
    right: '40px',
    backgroundColor: '#253260',
    '&:hover': {
        "& .chatIcon": {
            color: "#253260",
        }
      
    },

}))