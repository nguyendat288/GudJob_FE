import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { ROLES } from '../../../constaints/role';

const ListBidding = ({ listBidding, currentUser,createdBy,handleAccept }) => {
    return (
        <Box display='flex' >
            <Box flex='4' >
                {listBidding?.items?.length === 0 && (
                    <Typography> Chưa có bidding nào </Typography>
                )}
                {listBidding && listBidding?.items?.map((item, index) => (
                    <div key={index}>
                        <Paper sx={{ bgcolor: '#F8F8FF', borderRadius: '5px', mt: 1 }}>
                            <Box p={3}>
                                <Box display='flex'>
                                    <Box display='flex'>
                                        <Avatar alt="Remy Sharp"
                                            sx={{
                                                width: '50px',
                                                height: '50px'
                                            }}
                                            src={item?.appUser?.avatar} />
                                        <Box ml={2}>
                                            <Typography fontSize='15px' fontWeight='bold'> {item?.appUser?.name} </Typography>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyItems: 'center',
                                                        color: '#FFD700',
                                                        fontSize: '18px',
                                                    }}
                                                >
                                                    <StarIcon />
                                                </Typography>
                                                <Typography>5.0</Typography>
                                                <Typography>| {item?.appUser?.address?.country}</Typography>
                                            </Box>
                                            <Typography fontSize='15px' fontWeight='bold'> Skill | skill </Typography>
                                        </Box>
                                    </Box>
                                    <Box ml='auto'>
                                        <Typography> Budget : {item?.budget}$ </Typography>
                                        <Typography> in {item?.duration} days </Typography>
                                    </Box>
                                </Box>
                                <Box mt={1}>
                                    <Typography>{item?.proposal} </Typography>
                                </Box>
                                {currentUser != null && currentUser?.role === ROLES.RECRUITER && currentUser?.userId === createdBy && (
                                    <>
                                        <Box display='flex' mt={1} ml='auto'>
                                            <Button variant='contained' onClick={(e)=> handleAccept(item?.id)}>Accept</Button>
                                        </Box>
                                    </>
                                )}

                            </Box>
                        </Paper>
                    </div>
                ))}

            </Box>
            <Box flex='1' ml={2}>
            </Box>
        </Box>
    )
}

export default ListBidding
