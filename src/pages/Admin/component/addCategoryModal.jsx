import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import categoryApi from '../../../services/categoryApi';

const AddCategory = ({ onClose, category = null, isEdit = false, setReloadCategory }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (isEdit && category) {
            setCategoryName(category.categoryName || '');
            setIsDeleted(category.isDeleted || false);
            setImage(category.image || '');
        } else {
            setCategoryName('');
            setIsDeleted(false);
            setImage('');
        }
    }, [isEdit, category]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        let params;
        if (isEdit) {
            params = {
                id: category?.id,
                categoryName,
                isDeleted,
                image,
            };
        } else {
            params = {
                categoryName,
                isDeleted,
                image,
            };
        }
        try {
            if (isEdit) {
                await categoryApi.UpdateCategory(params);
                setReloadCategory(prev => !prev);
                toast.success('Category updated successfully');
            } else {
                await categoryApi.AddCategory(params);
                setReloadCategory(prev => !prev);
                toast.success('Category added successfully');
            }
            onClose();
        } catch (error) {
            toast.error(`Failed to ${isEdit ? 'update' : 'add'} category`);
            console.error(error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontSize: '1.5rem' }} mb={2}>
                {isEdit ? 'Update' : 'Add'} Category
            </Typography>
            <TextField
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                fullWidth
                margin="normal"
            />
            {
                !isEdit && <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select value={isDeleted} onChange={(e) => setIsDeleted(e.target.value)}>
                        <MenuItem value={false}>Active</MenuItem>
                        <MenuItem value={true}>Deleted</MenuItem>
                    </Select>
                </FormControl>
            }
            <Typography variant="body1" mt={2}>
                Image for category:
            </Typography>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />
            {image && (
                <Box mt={2} display="flex" justifyContent="center">
                    <img src={image} alt="Category" style={{ maxHeight: '100px' }} />
                </Box>
            )}
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {isEdit ? 'Update' : 'Add'}
                </Button>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default AddCategory;