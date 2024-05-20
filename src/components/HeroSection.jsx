import React from 'react';
import { Box, Button } from '@mui/material';
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
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Get Started
      </Button>
    </Box>
  );
}

export default HeroSection;
