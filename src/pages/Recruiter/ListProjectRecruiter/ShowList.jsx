import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ProjectDescription from '../../../components/ProjectDescription'
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import { ROLES } from '../../../constaints/role';

const ShowList = ({ listProject }) => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
 
    return (
        <Box bgcolor='#F8F8FF' borderRadius='5px' p={3} >
            {listProject?.items?.map((project, index) => (<>
                <Box mt={1}>
                    <Link
                    
                        to={currentUser?.role === ROLES.RECRUITER ? `/details/${project?.id}` : `/detail/${project?.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }} >
                        <Box mb={3} >
                            <Box display='flex'>
                                <Box>
                                    <Box display='flex'>
                                        <Typography fontSize='20px' fontWeight='bold' color='primary'> {project?.title} </Typography>
                                        <Box
                                            sx={{
                                                display: 'inline-block',
                                                padding: '2px 4px',
                                                backgroundColor: '#CAFF70',
                                                borderRadius: '8px',
                                                border: '1px solid #ccc',
                                            }}
                                        >
                                            <Typography> {project?.statusId} </Typography>
                                        </Box>
                                    </Box>
                                    <Typography fontWeight='600'> Budget : {project?.minBudget}$ - {project?.maxBudget}$ </Typography>
                                </Box>
                                <Box ml='auto'>
                                    <Typography fontSize='20px' fontWeight='bold' > 22 bids </Typography>
                                    <Typography fontSize='20px' fontWeight='bold'> average bid : 45$ </Typography>
                                </Box>
                            </Box>
                            <Box mt={1}>
                                <Typography>
                                    <ProjectDescription description={project?.description} />
                                </Typography>
                                <Box display='flex'>
                                    {project?.skill?.map((item, index) => (
                                        <Typography mt={1} color='blue' ml={2} key={index} fontSize='15px'>  {item} </Typography>
                                    ))}
                                </Box>
                            </Box>
                            <Box mt={1} display='flex'>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#FFD700',
                                            fontSize: '20px',
                                        }}
                                    >
                                        <StarIcon sx={{ marginRight: '4px' }} />
                                    </Typography>
                                    <Typography>5.0</Typography>
                                </Box>
                                <Box ml='auto'>
                                    <Typography> 200 views</Typography>
                                </Box>
                            </Box>
                            <Box mt={1}>
                                <Typography fontSize='10px'>{project?.createdDate}</Typography>
                            </Box>
                        </Box>
                    </Link>
                    <Divider />
                </Box>
            </>))}
        </Box >
    )
}

export default ShowList
