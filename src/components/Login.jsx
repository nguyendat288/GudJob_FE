import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/home");
    }
    const handleRegister = () => {
        navigate("/register");
    }
    return (
        <Box>
            <Box sx={style}>
                <Typography component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <Button onClick={(e)=>handleLogin() }>Home </Button>
                <Button onClick={(e)=>handleRegister() }>Register </Button>
            </Box>
        </Box>
    )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 12,
    p: 4,
};
export default Login
