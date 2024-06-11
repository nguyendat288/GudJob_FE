import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import authApi from '../../../services/authApi';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [secureToken, setSecureToken] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'code':
        setCode(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      await authApi.sendCode(email);
      setStep(2);
    } catch (error) {
      setError('Failed to send code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      const token = await authApi.resetPassword(email, code);
      setSecureToken(token);
      setStep(3);
    } catch (error) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await authApi.resetNewPassword(email, newPassword, confirmPassword, secureToken, navigate);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={4} boxShadow={3} borderRadius={4}>
        <Typography variant="h5" align="center" gutterBottom>
          Reset Password
        </Typography>
        {step === 1 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSendCode();
          }}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Code'}
            </Button>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>
        )}
        {step === 2 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleVerifyCode();
          }}>
            <TextField
              name="code"
              label="Verification Code"
              fullWidth
              value={code}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Code'}
            </Button>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>
        )}
        {step === 3 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
          }}>
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={handleChange}
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
            </Button>
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>
        )}
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
