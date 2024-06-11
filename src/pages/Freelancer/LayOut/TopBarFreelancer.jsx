import { AppBar, Box, Button, Container, IconButton, InputBase, Menu, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../../../redux/authSlice';
import { toast } from 'react-toastify';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const TopBarFreelancer = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [search, setSearch] = useState('')

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    dispatch(logOutSuccess())
    localStorage.clear();
    navigate('/login');
    toast.success('Logout successfully!');
  }

  const handleSearch =()=>{
    navigate(`/search/${search}`)
  }
  
  return (
    <AppBar position="static" sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            GoodJob
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, borderRadius: '30px' }}>
            <Box display='flex'
              borderRadius='3px'
              bgcolor='#EEEEEE'
              sx={{ width: '50%' }}
            >
              <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Seach name project' sx={{ ml: 2, flex: 1 }} />
              <IconButton type='button'
              onClick={(e)=>handleSearch(e)}
              p={1}>
                <SearchOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
          {currentUser && (
            <Box display='flex' gap={2}  >
              <IconButton>
                <MessageOutlinedIcon />
              </IconButton>
              <IconButton>
                <NotificationsNoneOutlinedIcon />
              </IconButton>
              <IconButton>
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <Typography sx={{
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold'
              }}>{currentUser?.name}</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={currentUser?.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    LogOut
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {
            currentUser == null && (
              <>
                <Box display='flex' gap={2}>
                  <Button onClick={(e) => navigate('/login')}>Sign in</Button>
                  <Button onClick={(e) => navigate('/register')}>Sign up</Button>
                </Box>
              </>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBarFreelancer
