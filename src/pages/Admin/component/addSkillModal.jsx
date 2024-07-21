import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import skillApi from '../../../services/skillAPI';

const AddSkill = ({ onClose, categoryList, setReloadSkill, setSnackbar }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [skillName, setSkillName] = useState('');

  const handleSubmit = async () => {
    const params = {
      skillName,
      categoryId,
    };
    try {
      await skillApi.AddSkill(params);
      setSnackbar({
        open: true,
        message: 'Skill added successfully',
        severity: 'success',
      });
      setReloadSkill((prev) => !prev);
      onClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add skill',
        severity: 'error',
      });
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontSize: '1.5rem' }} mb={2}>
        Add Skill
      </Typography>
      <Autocomplete
        options={categoryList}
        getOptionLabel={(option) => option.categoryName}
        onChange={(event, newValue) => {
          setCategoryId(newValue ? newValue.id : null);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Category" margin="normal" fullWidth />
        )}
      />
      <TextField
        label="Skill Name"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddSkill;
