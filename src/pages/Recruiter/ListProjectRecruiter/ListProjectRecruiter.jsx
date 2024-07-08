import { Box, Button, CircularProgress, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../LayOutRecruiter/Header'
import {  useNavigate } from 'react-router-dom';
import projectApi from '../../../services/projectApi';
import { useSelector } from 'react-redux';
import ShowList from './ShowList';
import AddIcon from '@mui/icons-material/Add';
const ListProjectRecruiter = () => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate()
    const [listProject, setListProject] = useState(null)

    useEffect(() => {
        const getData = async () => {
            let res = await projectApi.GetAllProjectByUserId(currentUser?.userId, 1, 10);
            setListProject(res)
        }
        getData()
    }, [currentUser])

    return (
        <Box m={3}>
            <Box display='flex' alignItems='center' mb={3}>
                <Header title='DANH SÁCH DỰ ÁN' subtitle="Danh sách các dự án của bạn" />
                <Box ml='auto'>
                    <Tooltip title="Tạo dự án" arrow>
                        <Button
                            sx={{ bgcolor: '#28a745',color: '#fff', fontSize: '12px', '&:hover': { bgcolor: '#00CC00' } }}
                            onClick={() => navigate("/create-new-project")}
                            startIcon={<AddIcon />}
                        >
                            Tạo dự án
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            {listProject == null && (<>
                <CircularProgress />
            </>)}
            <ShowList listProject={listProject} />
        </Box>
    )
}

export default ListProjectRecruiter
