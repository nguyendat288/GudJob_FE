import React from 'react';
import { Container, Grid } from '@mui/material';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CategoryCard from './CategoryCard';

const categories = [
  { title: 'Graphics & Design', imageUrl: 'https://via.placeholder.com/300' },
  { title: 'Digital Marketing', imageUrl: 'https://via.placeholder.com/300' },
  { title: 'Writing & Translation', imageUrl: 'https://via.placeholder.com/300' },
];

const Home = () => {

  return (
    <>
      <Navbar />
      <HeroSection />
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CategoryCard title={category.title} imageUrl={category.imageUrl} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home
