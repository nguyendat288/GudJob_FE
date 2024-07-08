import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import profileApi from '../../../services/profileApi';
import { toast } from 'react-toastify';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const initialData = useMemo(() => ({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }), []);

  const checkIfChanged = useCallback(() => {
    return (
      currentPassword !== initialData.currentPassword ||
      newPassword !== initialData.newPassword ||
      confirmPassword !== initialData.confirmPassword
    );
  }, [currentPassword, newPassword, confirmPassword, initialData]);

  useEffect(() => {
    setIsButtonDisabled(!checkIfChanged());
  }, [checkIfChanged]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
    }

    const data = {
        password: currentPassword,
        newPassword: newPassword,
        newPasswordConfirm: confirmPassword
    };

    console.log("Data being sent to the server:", data);

    try {
        const response = await profileApi.changePassword(currentPassword, newPassword, confirmPassword);
        console.log("Server response:", response);
        toast.success("Password changed successfully!");
    } catch (error) {
        console.error("Error response from server:", error.response);
        if (error.response && error.response.data) {
            toast.error(error.response.data.message || "Something wrong occurred. Please try again.");
        } else {
            toast.error("Something wrong occurred. Please try again.");
        }
    }
};


  return (
    <Box p={3} borderRadius={5} border="1px solid #ccc" component="form" onSubmit={handleSave}>
      <Typography sx={{fontSize: "2em"}} variant="h4" gutterBottom>Thay đổi mật khẩu</Typography>
      
      <Box mb={2}>
        <TextField
          label="Mật khẩu hiện tại"
          variant="outlined"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
        />
        <TextField
          label="Mật khẩu mới"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
        />
        <TextField
          label="Xác nhận mật khẩu mới"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isButtonDisabled}
        sx={{
          backgroundColor: isButtonDisabled ? 'gray' : 'primary.main',
          '&:hover': {
            backgroundColor: isButtonDisabled ? 'gray' : 'primary.dark'
          }
        }}
      >
        Lưu thay đổi
      </Button>
    </Box>
  );
}

export default ChangePassword;
