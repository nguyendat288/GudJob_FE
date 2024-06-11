import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Divider } from '@mui/material';
import DateSelector from './component/DateSelector';
import profileApi from '../../../services/profileApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ExperienceEducation = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const [experience, setExperience] = useState({
    company: '',
    title: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    description: ''
  });

  const [education, setEducation] = useState({
    university: '',
    degree: '',
    startYear: '',
    endYear: ''
  });

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await profileApi.getUserProfile();
        setProfile(res);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile data.");
      }
    };
    getData();
  }, []);

  const [isExperienceButtonDisabled, setIsExperienceButtonDisabled] = useState(true);
  const [isEducationButtonDisabled, setIsEducationButtonDisabled] = useState(true);

  const handleExperienceChange = (key, value) => {
    setExperience((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const handleEducationChange = (key, value) => {
    setEducation((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  useEffect(() => {
    const isExperienceFilled = Object.values(experience).every((val) => val !== '');
    setIsExperienceButtonDisabled(!isExperienceFilled);
  }, [experience]);

  useEffect(() => {
    const isEducationFilled = Object.values(education).every((val) => val !== '');
    setIsEducationButtonDisabled(!isEducationFilled);
  }, [education]);

  const handleExperienceSave = async (e) => {
    e.preventDefault();

    const data = [
      {
        title: experience.title,
        company: experience.company,
        start: {
          month: experience.startMonth,
          year: experience.startYear
        },
        end: {
          month: experience.endMonth,
          year: experience.endYear
        },
        summary: experience.description
      }
    ]

    console.log("Data being sent to the server:", data);

    try {
      const response = await profileApi.updateExperience(data, navigate);
      console.log("Server response:", response);
      toast.success("Experience updated successfully!");
    } catch (error) {
      console.error("Error response from server:", error.response);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleEducationSave = () => {
    console.log('Education Saved:', education);
  };

  return (
    <Box p={3} borderRadius={16} border="1px solid #ccc">
      <Typography variant="h4" gutterBottom>Experience and Education</Typography>

      <Box mb={2} component="form" onSubmit={handleExperienceSave}>
        <Typography variant="h6">Experience</Typography>
        <TextField
          label="Company/Organization"
          variant="outlined"
          fullWidth
          margin="normal"
          value={experience.company}
          onChange={(e) => handleExperienceChange('company', e.target.value)}
        />
        <DateSelector
          startMonth={experience.startMonth}
          setStartMonth={(val) => handleExperienceChange('startMonth', val)}
          startYear={experience.startYear}
          setStartYear={(val) => handleExperienceChange('startYear', val)}
          endMonth={experience.endMonth}
          setEndMonth={(val) => handleExperienceChange('endMonth', val)}
          endYear={experience.endYear}
          setEndYear={(val) => handleExperienceChange('endYear', val)}
          handleChange={() => {}}
          showMonths={true}
        />
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={experience.title}
          onChange={(e) => handleExperienceChange('title', e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={experience.description}
          onChange={(e) => handleExperienceChange('description', e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isExperienceButtonDisabled}
          sx={{
            backgroundColor: isExperienceButtonDisabled ? 'gray' : 'primary.main',
            '&:hover': {
              backgroundColor: isExperienceButtonDisabled ? 'gray' : 'primary.dark'
            },
            mt: 2
          }}
        >
          Save Experience
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={2}>
        <Typography variant="h6">Education</Typography>
        <TextField
          label="University/College"
          variant="outlined"
          fullWidth
          margin="normal"
          value={education.university}
          onChange={(e) => handleEducationChange('university', e.target.value)}
        />
        <TextField
          label="Degree"
          variant="outlined"
          fullWidth
          margin="normal"
          value={education.degree}
          onChange={(e) => handleEducationChange('degree', e.target.value)}
        />
        <DateSelector
          startMonth=""
          setStartMonth={() => {}}
          startYear={education.startYear}
          setStartYear={(val) => handleEducationChange('startYear', val)}
          endMonth=""
          setEndMonth={() => {}}
          endYear={education.endYear}
          setEndYear={(val) => handleEducationChange('endYear', val)}
          handleChange={() => {}}
          showMonths={false}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEducationSave}
          disabled={isEducationButtonDisabled}
          sx={{
            backgroundColor: isEducationButtonDisabled ? 'gray' : 'primary.main',
            '&:hover': {
              backgroundColor: isEducationButtonDisabled ? 'gray' : 'primary.dark'
            },
            mt: 2
          }}
        >
          Save Education
        </Button>
      </Box>
    </Box>
  );
};

export default ExperienceEducation;
