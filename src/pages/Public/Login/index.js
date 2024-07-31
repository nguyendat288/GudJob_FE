// Login.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../../services/authApi';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import Register from '../Register';
import ResetPasswordDialog from '../ResetPassword/ResetPasswordDialog';

const style = {
  position: 'absolute',
  background: 'transparent',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid rgba(255,255,255,.2)',
  backdropFilter: 'blur(20px)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const { state } = useLocation();
  const [showLogin, setShowLogin] = useState(state ? state.showLogin : true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);
  const isLoading = useSelector((state) => state.auth.login?.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        await authApi.loginWithGoogle(accessToken, dispatch, navigate);
      } catch (error) {
        console.error('Google login error:', error);
        if (error.response && error.response.status === 415) {
          setErrorText('Unsupported media type.');
        } else {
          setErrorText('Đã có lỗi xảy ra khi đăng nhập bằng Google.');
        }
        setErrorPassword(true);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      setErrorText('Đăng nhập bằng Google không thành công.');
      setErrorPassword(true);
    },
  });

  useEffect(() => {
    document.body.classList.add('login-body');

    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userName === '' || password === '') {
      setErrorText('Vui lòng nhập đủ thông tin.');
      setErrorPassword(true);
      return;
    }
    let data = {
      email: userName,
      password: password,
    };
    try {
      await authApi.loginUser(data, dispatch, navigate);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.message);
      setErrorPassword(true);
    }
  };

  return (
    <div className="login-wrapper">
      {showLogin ? (
        <Box>
          <Box sx={style} component="form">
            <Box sx={{ textAlign: 'center' }} mb={2}>
              <Typography sx={{ color: 'white', fontSize: '2em' }} variant="h1">
                ĐĂNG NHẬP
              </Typography>
            </Box>
            <Divider sx={{ borderColor: 'white' }} />
            <Box mt={3}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                size="small"
                error={errorPassword}
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
                  '& .MuiFormLabel-root.Mui-focused': {
                    color: 'white',
                  },
                  mt: 3,
                }}
                fullWidth
                name="password"
                size="small"
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                error={errorPassword}
                helperText={errorText}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={handleClickShowPassword}
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Box>
            <Box mt={3}>
              <Typography
                variant="body1"
                component="span"
                onClick={() => setOpenResetPasswordDialog(true)}
                style={{
                  marginTop: '10px',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
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
                  fontSize: '17px',
                }}
                type="submit"
                onClick={(e) => handleSubmit(e)}
                variant="contained"
              >
                Đăng nhập
              </LoadingButton>
              <Divider sx={{ borderColor: 'white', marginTop: '16px' }}>
                <Typography>hoặc</Typography>
              </Divider>
              <Box id="signInButton" mt={2}>
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: 'rgb(99, 102, 241)',
                    p: '11px 24px',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '17px',
                  }}
                  onClick={() => loginWithGoogle()}
                  variant="contained"
                >
                  <GoogleIcon sx={{ marginRight: '10px' }} />
                  Đăng nhập bằng Google
                </Button>
              </Box>
              <Typography
                sx={{ color: 'white', marginTop: '10px' }}
                variant="subtitle1"
              >
                Chưa có tài khoản?{' '}
                <Typography
                  sx={{ color: '#021422', cursor: 'pointer' }}
                  onClick={() => setShowLogin(false)}
                >
                  Đăng ký ngay
                </Typography>
              </Typography>
            </Box>
          </Box>
          <ResetPasswordDialog
            open={openResetPasswordDialog}
            onClose={() => setOpenResetPasswordDialog(false)}
          />
        </Box>
      ) : (
        <Register
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          setShowLogin={setShowLogin}
          style={style}
        />
      )}
    </div>
  );
};

export default Login;
