import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Divider,
  Grid,
  Autocomplete,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import 'react-toastify/dist/ReactToastify.css';
import authApi from '../../../services/authApi';
import { useNavigate } from 'react-router-dom';
import skillApi from '../../../services/skillAPI';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';

const steps = ['Choose Role', 'Name', 'Details', 'Complete Registration'];

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <ContactEmergencyIcon />,
    4: <ConfirmationNumberIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const Register = ({
  showPassword,
  handleClickShowPassword,
  setShowLogin,
  style,
}) => {
  const [step, setStep] = useState(0);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    skills: [],
    companyName: '',
    taxCode: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    skills: '',
    companyName: '',
    taxCode: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectSkill = (event, value) => {
    if (value.length <= 5) {
      setFormData({ ...formData, skills: value });
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRoles([selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)]);
    handleNext();
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) {
        isValid = false;
        newErrors.firstName = 'First Name is required';
      }
      if (!formData.lastName) {
        isValid = false;
        newErrors.lastName = 'Last Name is required';
      }
    } else if (step === 2) {
      if (!formData.email) {
        isValid = false;
        newErrors.email = 'Email is required';
      }
      if (!formData.password) {
        isValid = false;
        newErrors.password = 'Password is required';
      }
      if (!formData.confirmPassword) {
        isValid = false;
        newErrors.confirmPassword = 'Confirm Password is required';
      }
      if (roles.includes('Freelancer') && formData.skills.length === 0) {
        isValid = false;
        newErrors.skills = 'Skills are required';
      }
      if (roles.includes('Recruiter')) {
        if (!formData.companyName) {
          isValid = false;
          newErrors.companyName = 'Company Name is required';
        }
        if (!formData.taxCode) {
          isValid = false;
          newErrors.taxCode = 'Tax Code is required';
        }
      }
      if (formData.password !== formData.confirmPassword) {
        isValid = false;
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const data = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        name: `${formData.firstName} ${formData.lastName}`,
        taxCode: formData.taxCode || '',
        isCompany: roles.includes('Recruiter'),
        roles: roles,
        skill: roles.includes('Freelancer') ? formData.skills : [],
      };
      try {
        const response = await authApi.register(data, navigate);
        if (response) {
          toast.success('Registration successful!');
        }
      } catch (error) {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await skillApi.GetAllSkill();
      setAllSkills(res);
    };
    getData();
  }, []);

  return (
    <Box sx={style}>
      <Box sx={{ textAlign: 'center' }} mb={2}>
        <Typography sx={{ color: 'white', fontSize: '2em' }} variant="h1">
          ĐĂNG KÝ
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'white' }} />
      <Box mt={3}>
        <Stepper
          activeStep={step}
          alternativeLabel
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box elevation={3} sx={{ p: 2, mt: 2 }}>
          {step === 0 && (
            <Box mt={3}>
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
            <>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                sx={{ mt: 2 }}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                sx={{ mt: 2 }}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </>
          )}
          {step === 2 && (
            <>
              {roles.includes('Freelancer') && (
                <Tooltip title="You can only select up to 5 skills">
                  <Autocomplete
                    multiple
                    disableCloseOnSelect
                    limitTags={2}
                    options={allSkills.map((skill) => skill.skillName)}
                    value={formData.skills}
                    onChange={handleSelectSkill}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills"
                        placeholder="Skills"
                        sx={{ mt: 2 }}
                        error={!!errors.skills}
                        helperText={errors.skills}
                      />
                    )}
                  />
                </Tooltip>
              )}
              {roles.includes('Recruiter') && (
                <>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                  />
                  <TextField
                    fullWidth
                    label="Tax Code"
                    name="taxCode"
                    value={formData.taxCode}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                    error={!!errors.taxCode}
                    helperText={errors.taxCode}
                  />
                </>
              )}
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mt: 2 }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                sx={{ mt: 2 }}
                error={!!errors.password}
                helperText={errors.password}
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
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                sx={{ mt: 2 }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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
            </>
          )}
          {step === 3 && (
            <>
              <Typography
                variant="h6"
                fontSize={18}
                mb={2}
                color="white"
                gutterBottom
              >
                Let's review your information again before complete register
              </Typography>
              <Typography variant="body1" gutterBottom>
                Role: {roles.join(', ')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Name: {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: {formData.email}
              </Typography>
              {roles.includes('Freelancer') && (
                <Typography variant="body1" gutterBottom>
                  Skills: {formData.skills.join(', ')}
                </Typography>
              )}
              {roles.includes('Recruiter') && (
                <>
                  <Typography variant="body1" gutterBottom>
                    Company Name: {formData.companyName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Tax Code: {formData.taxCode}
                  </Typography>
                </>
              )}
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={step === 0 ? true : false}
            >
              Back
            </Button>
            {step < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={step === 0 ? true : false}
              >
                Next
              </Button>
            )}
            {step === steps.length - 1 && (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body1"
            component="span"
            style={{ color: 'white' }}
          >
            Đã có tài khoản?{' '}
            <Typography
              variant="body1"
              component="span"
              onClick={() => setShowLogin(true)}
              style={{ cursor: 'pointer', color: 'rgb(99, 102, 241)' }}
            >
              Đăng nhập
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
