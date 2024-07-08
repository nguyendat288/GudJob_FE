import React from 'react';
import { Box } from '@mui/material';
import heroImage from '../assets/hero-image.png'

function HeroSection() {
  
  return (
    <Box
      sx={{
        height: '70vh',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
    </Box>
  );
}

export default HeroSection;
