import { Box, Button, Checkbox, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../service/authApi';
import { toast } from 'react-toastify';


const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const isLoading = useSelector((state) => state.auth.login?.isFetching)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    if (email == "" || password == '' || lastName == '' || firstName == '') {
      toast.error("Not null");
    } else {
      e.preventDefault()
      let data = {
        email: email,
        password: password,
        lastName: lastName,
        firstName: firstName,
        roles: ["User"]
      }
      await authApi.register(data, navigate);
    }
  }

  return (
    <>
      <Box>
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }} mb={2}>
            <Typography variant='h4'>Home</Typography>
            <Typography variant='h6' >Sign Up</Typography>
            {/* <Button variant='contained'>Continue with Facebook</Button> */}
          </Box>
          <Divider />
          <Box mt={3} display='flex'>
            <TextField
              label="First Name"
              name="firstName"
              type="firstName"
              size="small"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField

              label="Last Name"
              name="lastName"
              type="lastName"
              size="small"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box mt={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              sx={{ mt: 3 }}
              required
              fullWidth
              name="password"
              label="Password"
              size="small"
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
          {/* <Box mt={3} display='flex'>
            <Checkbox {...label} />

            <Typography variant='h8'>
              I agree to the Freelancer User Agreement and Privacy Policy.
            </Typography>
          </Box> */}
          <Box>
            <LoadingButton
              fullWidth
              loading={isLoading}
              size="large"
              sx={{
                mt: 2,
                bgcolor: 'rgb(99, 102, 241)',
                p: '11px 24px',
                borderRadius: '12px'
              }}
              onClick={(e) => handleSubmit(e)}
              type="submit"
              variant="contained">
              Register
            </LoadingButton>

          </Box>
          <Box mt={3} display='flex' justifyContent='center' alignItems='center'>
            <Typography>
              Already have an account ?
            </Typography>
            <Typography
              variant="body1"
              component="span"
              onClick={() => {
                navigate('/login')
              }}
              style={{
                cursor: 'pointer',
                color: 'rgb(99, 102, 241)',
                marginLeft: '10px',
                textDecoration: 'underline'
              }}>
              Log in
            </Typography>
          </Box>
        </Box>
      </Box>




      {/* <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          height: '100vh'
        }}>
        <Grid container sx={{ flex: '1 1 auto' }}>
          <Grid
            xs={12}
            lg={6}
            sx={{
              backgroundColor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
            item>
            <Box
              sx={{
                backgroundColor: 'background.paper',
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Box
                sx={{
                  maxWidth: 550,
                  px: 3,
                  py: '100px',
                  width: '100%'
                }}>
                <div>
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography sx={{ fontSize: '35px', fontWeight: '700' }}>Login</Typography>
                  </Stack>
                  <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        type="username"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                              onClick={handleClickShowPassword}
                              size="large">
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          )
                        }}
                      />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" mt={1}>

                      <Typography
                        variant="body1"
                        component="span"
                        onClick={() => {
                          navigate('/reset-password')
                        }}
                        style={{
                          marginTop: '10px',
                          cursor: 'pointer',
                          color: 'rgb(99, 102, 241)'
                        }}>
                        Forgot password?
                      </Typography>
                    </Stack>
                    <LoadingButton
                      fullWidth
                      loading={isLoading}
                      size="large"
                      sx={{
                        mt: 2,
                        bgcolor: 'rgb(99, 102, 241)',
                        p: '11px 24px',
                        borderRadius: '12px'
                      }}
                      type="submit"
                      variant="contained">
                      Submit
                    </LoadingButton>

                    <LoadingButton
                      fullWidth
                      size="large"
                      sx={{
                        mt: 2,
                        bgcolor: 'rgb(99, 102, 241)',
                        p: '11px 24px',
                        borderRadius: '12px'
                      }}
                      onClick={(e) => handleRegister()}
                      variant="contained">
                      Register
                    </LoadingButton>
                  </form>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid
            xs={12}
            lg={6}
            sx={{
              alignItems: 'center',
              background: 'radial-gradient(circle, rgba(9,50,121,1) 19%, rgba(0,212,255,1) 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              '& img': {
                maxWidth: '100%'
              }
            }}
            item></Grid>
        </Grid>
      </Box> */}
    </>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default Register;
