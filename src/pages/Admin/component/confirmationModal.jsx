import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{ fontSize: '1.875rem' }}>
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <PriorityHighIcon color='warning'/>
          You should only do this action when you read Terms and Condition
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button color="warning" onClick={onConfirm}>
            Confirm
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
