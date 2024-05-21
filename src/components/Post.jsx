import { Box, Button, Divider, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authApi from '../service/authApi';
import { toast } from 'react-toastify';

const StyledTypography = styled(Typography)(({ theme }) => ({
    borderRadius: '10px',
    marginLeft: theme.spacing(3),
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
    textAlign: 'center',
}));

const ProjectList = () => {    
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState();
    
    const handleViewDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    useEffect(() => {
        const getProjectList = async () => {
            let res = await authApi.GetAllProjectByUserId(currentUser.userId, 1, 5);
            setProjectList(res);
        }
        getProjectList()
    }, []) 
    
    return (
        <>
            <Navbar />
            <Box m={4}>
                <Box display='flex'>
                    <Typography variant='h4'>All job posted </Typography>
                </Box>
                <Divider />
                <Paper>
                    <Divider />
                    {currentUser ? projectList?.items.map((post, index) => (
                        <Box p={4} key={index} onClick={(e) => handleViewDetail(post.id)}>
                            <Typography variant='h6'>Title: {post?.title}</Typography>
                            <Typography>Category: {post?.category?.categoryName} </Typography>
                            <Typography>Estimate deadline: {post?.duration} </Typography>
                        </Box>
                    )) : <p>Chua dang nhap</p>}
                </Paper>
            </Box>
        </>
    )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};
export default ProjectList
