import { Box, Button, Divider, Paper, Typography, styled } from '@mui/material'
import React from 'react'
import ProjectDescription from '../../../components/ProjectDescription'
import StarIcon from '@mui/icons-material/Star';


const ProjectDetail = ({ detail, navigate,handleDelete }) => {
    return (
        <Box display='flex' >
            <Box flex='4'>
                <Paper sx={{ bgcolor: '#F8F8FF' }}>
                    <Box p={3} display='flex' justifyContent='space-between' justifyItems='center'>
                        <Box>
                            <Typography fontSize='18px' fontWeight='bold'>Project Detail</Typography>
                            <Box
                                bgcolor='#CCCCCC'
                                sx={{
                                    mt: 1,
                                    borderRadius: '10px',
                                    padding: '5px',
                                    display: 'inline-block',
                                }}
                            >
                                <Typography fontSize='15px'> {detail?.category?.categoryName} </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography fontSize='18px'>Budget   : {detail?.minBudget} $- {detail?.maxBudget} $</Typography>
                            <Typography fontSize='18px'>Duration : {detail?.duration} days</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={3}>
                        <Typography fontSize='18px' fontWeight='bold'>Project Description</Typography>
                        <ProjectDescription description={detail?.description} />
                    </Box>
                    <Box pl={3}>
                        <Typography fontSize='18px' fontWeight='bold'>Skill required</Typography>
                        <Box display='flex'>
                            {detail?.skill?.map((item, index) => (
                                <Box
                                    bgcolor='#CCCCCC'
                                    sx={{
                                        mt: 1,
                                        borderRadius: '10px',
                                        padding: '5px',
                                        display: 'inline-block',
                                        ml: 2
                                    }}
                                >
                                    <Typography fontSize='15px'> {item} </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box display='flex'>
                        <Box p={3}>
                            <Typography fontSize='8px'> ProjectId : {detail?.id} </Typography>
                        </Box>
                        <Box ml='auto' mr={3}>
                            <Button variant='contained' onClick={() => navigate(`/update-project/${detail?.id}`)}>Update Project</Button>
                            {detail?.statusId != 2 && (<>
                            <Button variant='contained' onClick={(e) => handleDelete(detail?.id)}>Delete Project</Button>
                            </>)}
                        </Box>
                    </Box>

                </Paper>
            </Box>
            <Box flex='1' ml={2}>

            </Box>

        </Box>
    )
}

export default ProjectDetail
