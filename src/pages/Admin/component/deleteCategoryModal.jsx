import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import categoryApi from '../../../services/categoryApi';

const DeleteCategory = ({ onClose, category, restored, setReloadCategory }) => {
    const handleDelete = async () => {
        try {
            if (restored === true) {
                await categoryApi.RestoreDeleted(category.id);
                toast.success('Category restored successfully');
            } else {
                await categoryApi.DeleteCategory(category.id);
                toast.success('Category deleted successfully');
            }
            setReloadCategory(prev => !prev);
            onClose();
        } catch (error) {
            toast.error('Failed to delete category');
            console.error(error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontSize: '1.5rem' }} mb={2}>
                {restored ? 'Restore' : 'Delete'} Category
            </Typography>
            <Typography mb={2}>Are you sure you want to {restored ? 'restore' : 'delete'} the category "{category.categoryName}"?</Typography>
            <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="secondary" onClick={handleDelete}>{restored ? 'Restore' : 'Delete'}</Button>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default DeleteCategory;
