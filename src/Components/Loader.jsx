import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useCurrentChat } from '../Contexts/CurrentChatContext';

export default function Loader({message}) {
  
  const [currentChat] = useCurrentChat();

  return (
    <div>
      <Backdrop
        sx={{ color: 'lightblue', zIndex: (theme) => theme.zIndex.drawer + 1, gap: 2, display: 'flex', flexDirection: 'column' }}
        open={currentChat?.length < 1 ? true : false}
      >
        <CircularProgress color="inherit" />
        <h6 style={{color: 'white', alignSelf: 'center'}} >{message ? message : "Laoding..."}</h6>
      </Backdrop>
    </div>
  );
}