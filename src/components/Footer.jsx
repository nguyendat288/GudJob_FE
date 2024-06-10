import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box 
        p={5} 
        bgcolor='#D9D9D9' 
        textAlign='center' 
        borderRadius={2} 
        boxShadow={3} 
        mt={4}
      >
        <Typography 
          fontSize='25px' 
          fontWeight='bold' 
          mb={3} 
        >
          Join Good Jobs with just a click
        </Typography>
        <Button 
          variant='contained' 
          color='primary' 
          size='large' 
          sx={{ 
            borderRadius: '20px', 
            textTransform: 'none', 
            padding: '10px 20px', 
            fontSize: '18px' 
          }}
        >
          Get Started
        </Button>
      </Box>

    )
}

export default Footer
