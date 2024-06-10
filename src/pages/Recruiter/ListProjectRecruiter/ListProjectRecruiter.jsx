import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../LayOutRecruiter/Header'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import projectApi from '../../../services/projectApi';
import { useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';
import ProjectDescription from '../../../components/ProjectDescription';
import ShowList from './ShowList';
const ListProjectRecruiter = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate()
    const [listProject, setListProject] = useState([])

    useEffect(() => {
        const getData = async () => {
            let res = await projectApi.GetAllProjectByUserId(currentUser?.userId, 1, 10);
            setListProject(res)
        }
        getData()
    }, [])

    console.log(listProject);
    return (
        <Box m={3}>
            <Box display='flex'>
                <Header title='List all project' subtitle="This is all your project" />
                <Box ml='auto'>
                    <Button variant='contained' onClick={(e) => navigate("/create-new-project")}> Create new Project</Button>
                </Box>
            </Box>
            <ShowList listProject={listProject} />
        </Box>
    )
}

export default ListProjectRecruiter
