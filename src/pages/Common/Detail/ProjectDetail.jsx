import { Box, Button, Divider, Paper, Typography, styled } from '@mui/material'
import React from 'react'
import ProjectDescription from '../../../components/ProjectDescription'
import StarIcon from '@mui/icons-material/Star';
import { ROLES } from '../../../constaints/role';
import TypographyTitle from '../../../components/Typography/TypographyTitle';


const ProjectDetail = ({ detail, navigate, handleDelete, currentUser }) => {
    return (
        <Box display='flex' mt={1} >
            <Box flex='4'>
                <Paper sx={{ bgcolor: '#F8F8FF' }} >
                    <Box p={3} display='flex' justifyContent='space-between' justifyItems='center'>
                        <Box>
                            <Box display='flex'>
                                <TypographyTitle title={detail?.title} color="blue" />
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        padding: '4px 8px',
                                        backgroundColor: detail?.projectStatus?.statusColor,
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <Typography fontSize='10px'> {detail?.projectStatus?.statusName} </Typography>
                                </Box>
                            </Box>
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
                            <Typography fontWeight='bold' fontSize='14px'> Ngân sách : {detail?.minBudget}VND - {detail?.maxBudget}VND </Typography>
                            <Typography fontWeight='bold' fontSize='14px' > Thời gian : {detail?.duration} ngày </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={3}>
                        <Typography fontSize='14px' fontWeight='bold'>Thông tin mô tả</Typography>
                        <Box m={2}>
                            <ProjectDescription description={detail?.description} />
                        </Box>
                    </Box>
                    <Box pl={3}>
                        <Typography fontSize='14px' fontWeight='bold'>Kỹ năng yêu cầu</Typography>
                        <Box display='flex'>
                            {detail?.skill?.map((item, index) => (
                                <Box
                                sx={{
                                    mt: 1,
                                    borderRadius: '10px',
                                    padding: '5px',
                                    display: 'inline-block',
                                    ml: 2,
                                    border: '1px solid blue' // Add border to create an outline effect
                                }}
                            >
                                <Typography fontSize='15px'> {item} </Typography>
                            </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box display='flex'>
                        <Box p={3}>
                            <Typography fontSize='8px'> Ngày tạo : {detail?.createdDate} </Typography>
                        </Box>
                        <Box ml='auto' mr={3}>
                            {currentUser?.role === ROLES.RECRUITER && currentUser?.userId === detail?.createdBy && (<>
                                <Button
                                    sx={{ fontSize: 12 }}
                                    variant='contained' onClick={() => navigate(`/update-project/${detail?.id}`)}>Update Project</Button>
                                {detail?.statusId != 2 && (<>
                                    <Button
                                        sx={{ fontSize: 12 }}
                                        variant='contained' onClick={(e) => handleDelete(detail?.id)}>Delete Project</Button>
                                </>)}
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
