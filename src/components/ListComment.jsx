import { Box, Divider, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

const ListComment = ({list}) => {

  return (
    <Paper sx={{
        marginTop: '20px'
    }}>
        <Box p={4}>
            <Typography variant='h5'>Project Bidding</Typography>
        </Box>
        <Divider />
{list.map((item,index)=>(
    <>
     <Box p={4}>
            <Typography fontSize='15px' fontWeight='bold'> {item?.appUser?.firstName} {item?.appUser?.lastName}  </Typography>
            <Typography >{item?.proposal} </Typography>
            <Typography fontSize='15px' fontWeight='400'> Budget : {item?.budget} </Typography>
            <Typography fontSize='15px' fontWeight='400'> Duration : {item?.duration} </Typography>
        </Box>
        <Divider />
    </>
))}
    </Paper>
  )
}

export default ListComment
