import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Container
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authApi from '../../../services/authApi';
import { useNavigate } from 'react-router-dom';
import skillApi from '../../../services/skillAPI';

const steps = [
  'Choose Role',
  'Name',
  'Details',
  'Complete Registration'
];

const Register = () => {
  const [step, setStep] = useState(0);
  const [roles, setRoles] = useState([]); // Initialize as an array
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    skills: [],
    companyName: '',
    taxCode: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectSkill = (selectedSkills) => {
    setFormData({ ...formData, skills: selectedSkills });
  };

  const handleRoleSelect = (selectedRole) => {
    setRoles([selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)]);
    handleNext();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      { value: formData.firstName, name: 'First Name' },
      { value: formData.lastName, name: 'Last Name' },
      { value: formData.email, name: 'Email' },
      { value: formData.password, name: 'Password' },
      { value: formData.confirmPassword, name: 'Confirm Password' }
    ];

    if (roles.includes('Freelancer')) {
      requiredFields.push({ value: formData.skills, name: 'Skills' });
    } else if (roles.includes('Recruiter')) {
      requiredFields.push(
        { value: formData.companyName, name: 'Company Name' },
        { value: formData.taxCode, name: 'Tax Code' }
      );
    }

    for (let field of requiredFields) {
      if (!field.value) {
        toast.error(`${field.name} is required!`);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
    } else {
      const data = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        name: `${formData.firstName} ${formData.lastName}`,
        taxCode: formData.taxCode || '',
        isCompany: roles.includes('Recruiter'),
        roles: roles,
        skill: roles.includes('Freelancer') ? formData.skills : []
      };

      try {
        await authApi.register(data, navigate);
        toast.success("Registration successful!");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const [allSkills, setAllSkills] = useState();

  useEffect(() => {
    const getData = async () => {
      let res = await skillApi.GetAllSkill();
      res.forEach((val, key) => {
        if (key === 0) {
          setFormData(prevFormData => ({ ...prevFormData, skills: [val.skillName] }));
        }
      });
      setAllSkills(res);
    };
    getData();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step === 0 && (
          <Box mt={3}>
            <Typography variant="h6">Choose Role</Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRoleSelect('freelancer')}
                >
                  I want to be a freelancer
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRoleSelect('recruiter')}
                >
                  I want to be a recruiter
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        {step === 1 && (
          <Box mt={3}>
            <Typography variant="h6">Name</Typography>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        )}
        {step === 2 && roles.includes('Freelancer') && (
          <Box mt={3}>
            <Typography variant="h6">Select Skill</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Skills</InputLabel>
              <Select
                name="skills"
                value={formData.skills}
                onChange={(e) => {
                  const selectedSkills = e.target.value;
                  handleSelectSkill(selectedSkills);
                }}
              >
                {allSkills.map((val, key) => (
                  <MenuItem value={val.skillName} key={key}>{val.skillName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        )}
        {step === 2 && roles.includes('Recruiter') && (
          <Box mt={3}>
            <Typography variant="h6">Company Information</Typography>
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tax Code"
              name="taxCode"
              value={formData.taxCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        )}
        {step === 3 && (
          <Box mt={3} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">Complete Registration</Typography>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </Box>
          </Box>
        )}
        <ToastContainer />
      </Paper>
    </Container>
  );
};

export default Register;
