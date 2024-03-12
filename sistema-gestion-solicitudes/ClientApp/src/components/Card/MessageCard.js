import { Card, CardContent, Typography } from "@mui/material"
import AnnouncementIcon from '@mui/icons-material/Announcement';

const MessageCard = (props) => {
    const { message } = props;
    return (
        <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#bbc7d347', border:'1px dashed grey', borderRadius:3}}>
            <CardContent sx={{ m: 0.6, '&:last-child': { p: 1 }, display: 'flex', alignItems: 'center'}}>
                <AnnouncementIcon sx={{ mx: 2, color:'#ff000052'}} />
                <Typography variant='subtitle2' sx={{ wordBreak: 'break-word' }}>{message}</Typography>
            </CardContent>
            
        </Card>


    )

};
export default MessageCard;
