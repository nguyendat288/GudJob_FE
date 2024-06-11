import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({ title, subtitle }) => {
    return (
        <Box mb="25px">
            <Typography
                variant='h5'
                fontWeight='bold'
            >{title}</Typography>
            <Typography
                variant='h6'
            >{subtitle}</Typography>
        </Box>
    )
}

export default Header
