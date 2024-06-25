import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import reportApi from '../../../../services/reportApi';

const ReportModal = ({ open, onClose, onReport, userId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await reportApi.getReportCategoryByUser();
        console.log("response", response);
        setCategories(response);
      } catch (error) {
        console.error('Error fetching report categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleReport = () => {
    onReport({ ReportCategoryId: selectedCategory, Description: description, ReportToUrl: url });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" mb={2}>Report User</Typography>
        <TextField
          label="url"
          rows={4}
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="category-label">Reason</InputLabel>
          <Select labelId="category-label" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} label="Reason">
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleReport}>Submit</Button>
      </Box>
    </Modal>
  );
};

export default ReportModal;
