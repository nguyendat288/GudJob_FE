import { Box, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

const ListProject = () => {
    const { search } = useParams();
    return (
        <Box>
            <Typography> Hello </Typography>
        </Box>
    )
}

export default ListProject
