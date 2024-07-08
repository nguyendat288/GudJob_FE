import { Box, Button } from '@mui/material'
import React from 'react'
import TypographyTitle from './Typography/TypographyTitle'

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
      <TypographyTitle title="Join Good Jobs with just a click" />

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
