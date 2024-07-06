import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

const AppBarChat = ({user}) => {
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
          >
          </IconButton>
          <Avatar alt="Remy Sharp" src={user?.avatar} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml:2 }}>
          {user?.name}
          </Typography>
          <Button color="inherit">Lựa chọn khác </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppBarChat;
