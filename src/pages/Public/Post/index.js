import { Box, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import projectApi from '../../../services/projectApi';
import Navbar from '../../../components/Navbar';

const Post = () => {    
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState();
    
    const handleViewDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    useEffect(() => {
        const getProjectList = async () => {
            let res = await projectApi.GetAllProjectByUserId(currentUser.userId, 1, 5);
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
                        <>
                        <Box p={4} key={index} onClick={(e) => handleViewDetail(post.id)}>
                            <Typography variant='h6'>Title: {post?.title}</Typography>
                            <Typography>Category: {post?.category?.categoryName} </Typography>
                            <Typography>Estimate deadline: {post?.duration} </Typography>
                        </Box>
                        <Divider />
                        </>
                    )) : <p>Chua dang nhap</p>}
                </Paper>
            </Box>
        </>
    )
}

export default Post
