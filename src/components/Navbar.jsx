import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logOutSuccess } from '../redux/authSlice';

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = () => {
    navigate("/login");
  }

  const handleRegister = () => {
    navigate("/register");
  }
  const handlePost = () => {
    navigate("/post");
  }
  const handleHome = () => {
    navigate("/home");
  }
  const handleViewPost = () => {
    navigate("/view/post");
  }
  const handleViewProfile = () => {
    navigate("/profile");
  }
  const handleLogOut = () => {
    dispatch(logOutSuccess())
    localStorage.clear();
    navigate('/login');
    toast.success('Logout successfully!');
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>handleHome()}>
          GudJob
        </Typography>
        {
          currentUser && (<>
            <Button color="inherit" onClick={(e) => handleViewPost(e)}>View your post</Button>
            <Button color="inherit" onClick={() => handlePost()}>Create Post</Button>
            <Button color="inherit" onClick={() => handleViewProfile()}>View Profile</Button>
            <Button color="inherit" onClick={(e) => handleLogOut(e)}>Logout</Button>
          </>)
        }
        {
          currentUser == null && (<>
            <Button color="inherit" onClick={(e) => handleLogin()}>Login</Button>
            <Button color="inherit" onClick={(e) => handleRegister()}>Sign Up</Button>
          </>)
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
