import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import authApi from '../../services/authApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CreatePost = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser)

    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [name, setName] = useState('')
    const [minBudget, setMinBudget] = useState(0)
    const [maxBudget, setMaxBudget] = useState(0)
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const getData = async () => {
            let res = await authApi.GetAllCategory();
            setListCategory(res)
        }
        getData()
    }, [])
    console.log(listCategory);

    const handleSubmit = async (e) => {
        if (category === '' || name === '' || minBudget === 0 || maxBudget <= minBudget || duration === ''|| description ==='') {
            toast.error("not empty")
       
        }else{
            let data = {
                title: name,
                categoryId: category,
                minBudget: minBudget,
                maxBudget: maxBudget,
                duration: duration,
                createdBy: currentUser?.userId,
                description: description
            }
            console.log(data);
            await authApi.AddProject(data, navigate);
        }
    }

    return (
        <>
            <Navbar />
            <Box sx={style}>
                <Box textAlign='center'>
                    <Typography variant='h4'>Create Project</Typography>
                </Box>
                <Box mt={3} >
                    <TextField
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Project Name" variant="outlined" />

                    <Box display='flex' justifyContent='space-between' gap={3} mt={3}>

                        <FormControl sx={{ width: '25%' }}>
                            <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {listCategory.length !== 0 && listCategory.map((item, index) => (
                                    <MenuItem value={item?.id}>{item?.categoryName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            value={minBudget}
                            onChange={(e) => setMinBudget(e.target.value)}
                            label="Budget Min" variant="outlined" type='number' />
                        <TextField
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(e.target.value)}
                            label="Budget Max" variant="outlined" type='number' />
                    </Box>
                    <Box mt={3}>
                        <TextField
                            fullWidth
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            label="Duration" variant="outlined" type='text' />
                    </Box>
                    <Box mt={3}>
                        <TextField
                        fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                        />
                    </Box>
                    <Box mt={3}>
                        <Button
                            onClick={(e) => handleSubmit(e)}
                        >Create Project</Button>
                    </Box>
                </Box>

            </Box>
        </>
    )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default CreatePost
