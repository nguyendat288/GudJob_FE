import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{fontSize: '1.875rem'}}>
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
