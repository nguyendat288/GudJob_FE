import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import profileApi from '../../../services/profileApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProfileSetting() {
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await profileApi.getUserProfile();
        console.log("res", res);
        setProfile(res);
        setFirstName(res.firstName || '');
        setLastName(res.lastName || '');
        setEmail(res.email || '');
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile data.");
      }
    };
    getData();
  }, []);

  const initialData = useMemo(() => ({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || ''
  }), [profile]);

  const checkIfChanged = useCallback(() => {
    return (
      firstName !== initialData.firstName ||
      lastName !== initialData.lastName ||
      email !== initialData.email
    );
  }, [firstName, lastName, email, initialData]);

  useEffect(() => {
    setIsButtonDisabled(!checkIfChanged());
  }, [checkIfChanged]);

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      name: `${firstName} ${lastName}`,
      email: email,
      phoneNumber: phoneNumber || "",
      taxCode: profile?.taxCode || "",
      isCompany: profile?.isCompany || false,
      skills: profile?.skills || []
    };

    console.log("Data being sent to the server:", data);

    try {
      const response = await profileApi.updateProfile(data, navigate);
      console.log("Server response:", response);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error response from server:", error.response);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Box p={3} borderRadius={5} border="1px solid #ccc" component="form" onSubmit={handleSave}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      
      <Box mb={2}>
        <Typography variant="h6">Name</Typography>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={2}>
        <Typography variant="h6">Email</Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={2}>
        <Typography variant="h6">Personal information</Typography>
        <TextField
          label="Phone number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
        Save
      </Button>
    </Box>
  );
}

export default ProfileSetting;
