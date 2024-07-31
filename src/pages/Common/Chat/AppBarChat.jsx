import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import CustomAvatar from '../../../components/CustomAvatar';
import { useNavigate } from 'react-router-dom';

const AppBarChat = ({ user }) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate(`/profile/${user?.userId}`);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          {user?.avatar === null ? (
            <CustomAvatar name={user?.name} />
          ) : (
            <Avatar alt="Remy Sharp" src={user?.avatar} />
          )}
          <Typography
            variant="h6"
            onClick={(e) => handleProfile()}
            component="div"
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
              flexGrow: 1,
              ml: 2,
            }}
          >
            {user?.name}
          </Typography>
          <Button color="inherit">Lựa chọn khác </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarChat;
