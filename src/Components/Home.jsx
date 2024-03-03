import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import ChatsCard from './Chatlist';
import { useCurrentChat } from '../Contexts/CurrentChatContext';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Chatrr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function Home() {
  const [chats, setChats] = React.useState([]);
  // const [selectedChat, setSelectedChat] = React.useState({});
  const [CurrentChat] = useCurrentChat();

    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    
  const getChats = async () => {
    try {
      const {data} = await axios.get(`https://android-chattr-app.onrender.com/api/v1/messages/chats/${user?._id}`);
      setChats(data?.chats);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getChats();
  }, []);

 console.log(CurrentChat);

  
  return (
    <div style={{maxHeight: '100vh', width: '100%', position: 'fixed', top: 80}} >
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ maxHeight: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={4}
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{width: '100%', height: 60, backgroundColor: 'lightblue', alignItems: 'center', padding: 20}} >
              <h4 style={{textAlign: 'center'}} >Chats</h4>
          </div>
          {
            chats.length > 0 && chats.map((chat) => (
              
              <ChatsCard participants={[chat?.senderId, chat?.receiverId]} key={chat._id} name={user?._id === chat?.senderId ? chat?.receiver?.name : chat?.sender?.name } lastMessage={chat?.chat[chat?.chat.length - 1]?.message
                ?.message
                ? chat?.chat[
                   chat.chat.length - 1
                  ]?.message?.message.slice(0, 40)
                : user?._id === chat?.chat[chat?.chat.length - 1]?.sender && chat?.chat[chat?.chat.length - 1]?.message
                ?.asset_id
                ? "You Sent An Attachment"
                : user?._id === chat?.chat[chat?.chat.length - 1]?.reciever && chat?.chat[chat?.chat.length - 1]?.message
                ?.asset_id ? (`${chat?.sender?.name} Sent you An Attachment`) : null} profilePic={user?._id === chat?.senderId ? chat?.receiver?.profilePhoto?.secure_url : chat?.sender?.profilePhoto?.secure_url} lastMessageAt={chat?.updatedAt} />
            ))
          }
        </Grid>
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh',
              minHeight: '80vh'
            }}
          >
            <div style={{width: '100%', height: 60, backgroundColor: 'lightblue', alignItems: 'center', paddingTop: 20, marginBottom: 20, marginTop: -65,}} >
              <h4 style={{textAlign: 'center'}} >Messages</h4>
          </div>
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'scroll'}} >
            {
              CurrentChat?.length > 0 ? (
               CurrentChat?.map((message) => (
 
                  message?.type === "Text" ? (
                    <p style={{backgroundColor: user?._id === message?.sender ? "gray" : "purple", alignSelf: user?._id === message?.sender ? "flex-end" : "flex-start", maxWidth: '40%', padding: 10, borderRadius: 10 }} >{message?.message?.message}</p>
                  ) : (
                    <p style={{backgroundColor: user?._id === message?.sender ? "gray" : "purple", alignSelf: user?._id === message?.sender ? "flex-end" : "flex-start", maxWidth: '40%', padding: 10, borderRadius: 10 }} >This is an Attachment</p>
                  )
              
               ))
              ) : (
                <p style={{alignSelf: 'center'}} >Tap On A Conversation from the Coversations List on the left To See Messages Here</p>
              )
            }
            </div>
           
         <Box sx={{maxWidth: '80%', display: 'inline-flex', alignItems: 'center', height: 40, justifyContent: 'space-around'}} >
         <TextField
                margin="normal"
                required
                fullWidth
                id="message"
                placeholder='Type Your Message Here...'
                name="message"
                rows={'auto'}
               sx={{position: 'fixed', bottom: 10, width: '50%', alignSelf: 'center'}}
              />
              <SendIcon sx={{position: 'fixed', right: 50}} />
         </Box>

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
}