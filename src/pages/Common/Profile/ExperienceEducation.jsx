import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Divider } from '@mui/material';
import LinearProgress from '@mui/joy/LinearProgress';
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
    universityCollege: '',
    degree: '',
    startYear: '',
    endYear: '',
    country: ''
  });
  const [isExperienceButtonDisabled, setIsExperienceButtonDisabled] = useState(true);
  const [isEducationButtonDisabled, setIsEducationButtonDisabled] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
  const [isExperienceFormVisible, setIsExperienceFormVisible] = useState(false);
  const [isEducationFormVisible, setIsEducationFormVisible] = useState(false);

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

  const handleExperienceChange = (key, value) => {
    setExperience((prev) => ({ ...prev, [key]: value }));
  };

  const handleEducationChange = (key, value) => {
    setEducation((prev) => ({ ...prev, [key]: value }));
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

    const newExperience = {
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
    };

    let updatedExperiences;
    if (editIndex !== null) {
      // Editing an existing experience
      updatedExperiences = profile.experiences.map((exp, index) => 
        index === editIndex ? newExperience : exp
      );
    } else {
      // Adding a new experience
      updatedExperiences = profile.experiences ? [...profile.experiences, newExperience] : [newExperience];
    }

    try {
      const response = await profileApi.updateExperience(updatedExperiences, navigate, "update");
      console.log("Server response:", response);
      setProfile((prevProfile) => ({
        ...prevProfile,
        experiences: updatedExperiences
      }));
      setExperience({
        company: '',
        title: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        description: ''
      });
      setEditIndex(null);
      setIsExperienceFormVisible(false);
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

  const handleEducationSave = async (e) => {
    e.preventDefault();

    const newEducation = {
      universityCollege: education.universityCollege,
      degree: education.degree,
      start: {
        month: null,
        year: parseInt(education.startYear)
      },
      end: {
        month: null,
        year: parseInt(education.endYear)
      },
      country: education.country
    };

    let updatedEducation;
    if (editingEducationIndex !== null) {
      // Editing an existing education
      updatedEducation = profile.educations.map((edu, index) => 
        index === editingEducationIndex ? newEducation : edu
      );
    } else {
      // Adding a new education
      updatedEducation = profile.educations ? [...profile.educations, newEducation] : [newEducation];
    }

    try {
      const response = await profileApi.updateEducation(updatedEducation, navigate, "update");
      console.log("Server response:", response);
      setProfile((prevProfile) => ({
        ...prevProfile,
        educations: updatedEducation
      }));
      setEducation({
        universityCollege: '',
        degree: '',
        startYear: '',
        endYear: '',
        country: ''
      });
      setEditingEducationIndex(null);
      setIsEducationFormVisible(false);
      toast.success("Education updated successfully!");
    } catch (error) {
      console.error("Error response from server:", error.response);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleEditEducation = (index) => {
    const edu = profile.educations[index];
    setEducation({
      universityCollege: edu.universityCollege,
      degree: edu.degree,
      startYear: edu.start.year,
      endYear: edu.end.year,
      country: edu.country 
    });
    setEditingEducationIndex(index);
    setIsEducationFormVisible(true);
  };

  const handleAddEducation = () => {
    setEducation({
      universityCollege: '',
      degree: '',
      startYear: '',
      endYear: '',
      country: ''
    });
    setEditingEducationIndex(null);
    setIsEducationFormVisible(true);
  };

  const handleDeleteExperience = async (index) => {
    const updatedExperiences = profile.experiences.filter((_, expIndex) => expIndex !== index);

    try {
      const response = await profileApi.updateExperience(updatedExperiences, navigate, "delete");
      console.log("Server response:", response);
      setProfile((prevProfile) => ({
        ...prevProfile,
        experiences: updatedExperiences
      }));
      toast.success("Experience deleted successfully!");
    } catch (error) {
      console.error("Error response from server:", error.response);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleDeleteEducation = async (index) => {
    const updatedEducations = profile.educations.filter((_, eduIndex) => eduIndex !== index);

    try {
      const response = await profileApi.updateEducation(updatedEducations, navigate, "delete");
      console.log("Server response:", response);
      setProfile((prevProfile) => ({
        ...prevProfile,
        educations: updatedEducations
      }));
      toast.success("Education deleted successfully!");
    } catch (error) {
      console.error("Error response from server:", error.response);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleEditExperience = (index) => {
    const exp = profile.experiences[index];
    setExperience({
      company: exp.company,
      title: exp.title,
      startMonth: exp.start?.month,
      startYear: exp.start?.year,
      endMonth: exp.end?.month,
      endYear: exp.end?.year,
      description: exp.summary
    });
    setEditIndex(index);
    setIsExperienceFormVisible(true);
  };

  const handleAddExperience = () => {
    setExperience({
      company: '',
      title: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      description: ''
    });
    setEditIndex(null);
    setIsExperienceFormVisible(true);
  };

  const handleCancelExperience = () => {
    setIsExperienceFormVisible(false);
  };

  const handleCancelEducation = () => {
    setIsEducationFormVisible(false);
  };

  return (
    <Box p={3} borderRadius={16} border="1px solid #ccc">
      <Typography variant="h4" gutterBottom>Experience and Education</Typography>

      <Box mb={2}>
        <Typography variant="h6">Experience</Typography>
        {profile && profile.experiences ? (
          profile.experiences.map((exp, index) => (
            <Box key={index} mb={2} border="1px solid #ccc" borderRadius={8} p={2}>
              <Typography variant="subtitle1">{exp.title}</Typography>
              <Typography variant="body2">{exp.company}</Typography>
              <Typography variant="body2">{`${exp.start.month} ${exp.start.year} - ${exp.end.month} ${exp.end.year}`}</Typography>
              <Typography variant="body2">{exp.summary}</Typography>
              <Button variant="outlined" onClick={() => handleEditExperience(index)}>Edit</Button>
              <Button variant="outlined" sx={{marginLeft: 2}} color="error" onClick={() => handleDeleteExperience(index)}>Delete</Button>
            </Box>
          )
        )) : <LinearProgress variant="soft" />}

        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddExperience}
          sx={{ mt: 2 }}
        >
          Add New Experience
        </Button>

        {isExperienceFormVisible && (
          <Box component="form" onSubmit={handleExperienceSave}>
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
              {editIndex !== null ? 'Update Experience' : 'Add Experience'}
            </Button>
            <Button variant="outlined" sx={{mt: 2, marginLeft: 2}} onClick={handleCancelExperience}>Cancel</Button>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={2}>
        <Typography variant="h6">Education</Typography>
        {profile && profile.educations ? (
          profile.educations.map((edu, index) => (
            <Box key={index} mb={2} border="1px solid #ccc" borderRadius={8} p={2}>
              <Typography variant="subtitle1">{edu.degree}</Typography>
              <Typography variant="body2">{edu.universityCollege}</Typography>
              <Typography variant="body2">{edu.country}</Typography>
              <Typography variant="body2">{`${edu.start.year} - ${edu.end.year}`}</Typography>
              <Button variant="outlined" onClick={() => handleEditEducation(index)}>Edit</Button>
              <Button variant="outlined" sx={{marginLeft: 2}} color="error" onClick={() => handleDeleteEducation(index)}>Delete</Button>
            </Box>
          )
        )) : <LinearProgress variant="soft" />}

        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddEducation}
          sx={{ mt: 2 }}
        >
          Add New Education
        </Button>

        {isEducationFormVisible && (
          <Box component="form" onSubmit={handleEducationSave}>
            <TextField
              label="University/College"
              variant="outlined"
              fullWidth
              margin="normal"
              value={education.universityCollege}
              onChange={(e) => handleEducationChange('universityCollege', e.target.value)}
            />
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              margin="normal"
              value={education.country}
              onChange={(e) => handleEducationChange('country', e.target.value)}
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
              type="submit"
              disabled={isEducationButtonDisabled}
              sx={{
                backgroundColor: isEducationButtonDisabled ? 'gray' : 'primary.main',
                '&:hover': {
                  backgroundColor: isEducationButtonDisabled ? 'gray' : 'primary.dark'
                },
                mt: 2
              }}
            >
              {editingEducationIndex !== null ? 'Update Education' : 'Add Education'}
            </Button>
            <Button variant="outlined" sx={{mt: 2, marginLeft: 2}} onClick={handleCancelEducation}>Cancel</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ExperienceEducation;
