import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Profile from './Profile';
import { useUser } from '../Contexts/UserModelContext';

export default function MyProfileDrawer() {
  const [showMyProfile] = useUser();

  
  const DrawerList = (
    <Box className="col-md-3" sx={{ width: 250 }} role="presentation">
      <Divider />
     
    </Box>
  );

  return (
    <div className="col-md-4">
      
    </div>
  );
}