import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useCurrentChat } from '../Contexts/CurrentChatContext';

export default function ChatsCard({name, lastMessage, lastMessageAt, profilePic, participants }) {
  const theme = useTheme();

  const [CurrentChat, setCurrentChat] = useCurrentChat();

  const getMessages = async (participants) => {
     try {
        const {data} = await axios.post(`https://android-chattr-app.onrender.com/api/v1/messages/fetch-messages`, {sender: participants[0], reciever: participants[1]});
        console.log(data);
        setCurrentChat(data?.messages);
     } catch (error) {
        console.log(error);
     }
  }

  return (
    <Card className='Chat'
    onClick={() => getMessages(participants)}
     sx={{ display: 'flex', cursor: 'pointer' }} style={{alignItems: 'center', gap: 10}} >
         <CardMedia
        component="img"
        image={profilePic}
        alt={`${name}'s profile Photo`}
        style={{ width: 50, height: 50 ,borderRadius: 50}}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           {lastMessage}
          </Typography>
        </CardContent>
      </Box>
     
    </Card>
  );
}
