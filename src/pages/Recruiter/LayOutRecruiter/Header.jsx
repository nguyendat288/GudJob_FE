import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({ title, subtitle }) => {
    return (
        <Box>
            <Typography
                fontSize='20px'
                fontWeight='bold'
                color='#000000'
            >{title}</Typography>
            <Typography
                fontSize='15px'
                fontWeight='bold'
                color='#33CCFF'
            >{subtitle}</Typography>
           
        </Box>
    )
}

export default Header
