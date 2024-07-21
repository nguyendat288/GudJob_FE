// Footer.jsx
import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import Logo from '../assets/logo_02.png'; // Replace with your logo path or URL

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#595855', p: 6, mt: 10 }} component="footer">
      {' '}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <img src={Logo} alt="Logo" style={{ width: '150px' }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              className="font-bold"
              color={'#fad702'}
              variant="h6"
              gutterBottom
            >
              Freelancer
            </Typography>
            <Link
              href="#"
              variant="body2"
              color="#ffffff"
              display="block"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Categories
            </Link>
            <Link
              href="#"
              variant="body2"
              color="#ffffff"
              display="block"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Projects
            </Link>
            <Link
              href="#"
              variant="body2"
              color="#ffffff"
              display="block"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Membership
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              className="font-bold"
              color={'#fad702'}
              variant="h6"
              gutterBottom
            >
              About
            </Typography>
            <Link
              href="#"
              variant="body2"
              color="#ffffff"
              display="block"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              About Us
            </Link>
            <Link
              href="#"
              variant="body2"
              color="#ffffff"
              display="block"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              How It Works
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              className="font-bold"
              color={'#fad702'}
              variant="h6"
              gutterBottom
            >
              Terms
            </Typography>
            <Link
              href="#"
              variant="body2"
              color="#ffffff"
              display="block"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Terms and Conditions
            </Link>
            <Link
              href="#"
              variant="body2"
              color="#ffffff"
              display="block"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Fees and Charges
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="#ffffff" align="center">
            {'© '}
            {new Date().getFullYear()} GoodJob. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
