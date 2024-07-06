import { Box, Divider, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../../services/authApi';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';


const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const isLoading = useSelector((state) => state.auth.login?.isFetching)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token.toString();
        const response = await authApi.loginWithGoogle(accessToken, dispatch, navigate);
        console.log(response);
      } catch (error) {
        if (error.response.status === 415) {
          console.log('Unsupported Media Type'); 
        }
      }
    }
  });

  useEffect(() => {
    document.body.classList.add('login-body');

    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      email: userName,
      password: password
    }
    await authApi.loginUser(data, dispatch, navigate);
  }

  const handleRegister = (e) => {
    navigate("/register")
  }

  return (
    <div className='login-wrapper'>
      <Box>
        <Box sx={style} component="form">
          <Box sx={{ textAlign: "center" }} mb={2}>
            <Typography sx={{color: "white", fontSize: "2em"}} variant='h1'>ĐĂNG NHẬP</Typography>
          </Box>
          <Divider sx={{ borderColor: "white"}} />
          <Box mt={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              size="small"
              required
              onChange={(e) => setUserName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: 'white',
                },
              }}
            />

            <TextField
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: 'white',
                },
                mt: 3
              }}
              required
              fullWidth
              name="password"
              size="small"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                    size="small">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                )
              }}
            />
          </Box>
          <Box mt={3}>
            <Typography
              variant="body1"
              component="span"
              onClick={() => {
                navigate('/reset-password')
              }}
              style={{
                marginTop: '10px',
                cursor: 'pointer',
                color: 'white'
              }}>
              Quên mật khẩu?
            </Typography>
          </Box>
          <Box>
            <LoadingButton
              fullWidth
              loading={isLoading}
              size="large"
              sx={{
                mt: 2,
                bgcolor: 'rgb(99, 102, 241)',
                p: '11px 24px',
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '17px'
              }}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              variant="contained">
              Đăng nhập
            </LoadingButton>
            <Divider sx={{ borderColor: "white", marginTop: "16px"}}>
              <Typography>hoặc</Typography>
            </Divider>
            <Box id='signInButton' mt={2}>
              <LoadingButton
                fullWidth
                size="large"
                sx={{
                  bgcolor: 'rgb(99, 102, 241)',
                  p: '11px 24px',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontSize: '17px'
                }}
                type="submit"
                onClick={() => loginWithGoogle()}
                variant="contained">
                <GoogleIcon sx={{marginRight: "10px"}}/>
                Đăng nhập bằng Google
              </LoadingButton>
            </Box>
            <Typography sx={{color: "white", marginTop: "10px"}} variant='subtitle1'>Chưa có tài khoản? <Typography sx={{color: "#021422", cursor: "pointer"}} onClick={(e) => handleRegister(e)}>Đăng ký ngay</Typography></Typography>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

const style = {
  position: 'absolute',
  background: 'transparent',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: "2px solid rgba(255,255,255,.2)",
  backdropFilter: "blur(20px)",
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default Login;
