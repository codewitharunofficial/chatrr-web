import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useCurrentChat } from '../Contexts/CurrentChatContext';
import { useCurrentConvo } from '../Contexts/CurrentConvoContext';

export default function ChatsCard({name, lastMessage, lastMessageAt, profilePic, participantsIds, participants, id, chat }) {
  const theme = useTheme();

  const [currentChat, setCurrentChat] = useCurrentChat();
  const [currentConvo, setCurrentConvo] = useCurrentConvo();
  // const [convoId, setConvoId] = useCurrentConvo();


  const getMessages = async (chat, participantsIds, id) => {
    // setConvoId(id);
     try {
        const {data} = await axios.post(`https://android-chattr-app.onrender.com/api/v1/messages/fetch-messages`, {sender: participantsIds[0], reciever: participantsIds[1]});
        console.log(data);
        setCurrentChat(data?.messages);
        setCurrentConvo(chat);
     } catch (error) {
        console.log(error);
     }
  }

  return (
    <Card className='Chat'
    onClick={() => getMessages(chat, participantsIds, id)}
    sx={{ ":hover": { backgroundColor: "lightgreen" } }} style={{display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',}} >
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
