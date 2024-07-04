import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import reportApi from '../../../../services/reportApi';

const ReportModal = ({ open, onClose, onReport, type, projectId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [proId, setProId] = useState(projectId);
  const [bidId, setBidId] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await reportApi.getReportCategoryByUser(type);
        setCategories(response);
      } catch (error) {
        console.error('Error fetching report categories:', error);
      }
    };

    fetchCategories();
  }, [type]);

  const handleReport = () => {
    onReport({ ReportCategoryId: selectedCategory, Description: description, ReportToUrl: url, ProjectId: proId, BidId: bidId });
    onClose();
  };

  const renderTextField = () => {
    switch (type) {
      case 'user':
        return (
          <TextField
            label="URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
        );
      case 'project':
        return (
          <TextField
            label="Project ID"
            variant="outlined"
            fullWidth
            value={proId}
            onChange={(e) => setProId(e.target.value)}
            sx={{ mb: 2 }}
          />
        );
      case 'bid':
        return (
          <TextField
            label="Bid ID"
            variant="outlined"
            fullWidth
            value={bidId}
            onChange={(e) => setBidId(e.target.value)}
            sx={{ mb: 2 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" mb={2}>Report</Typography>
        {renderTextField()}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="category-label">Reason</InputLabel>
          <Select labelId="category-label" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} label="Reason">
            {categories?.map((category) => (
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
