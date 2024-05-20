import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CategoryCard from './CategoryCard';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../service/index.js'
import axios from 'axios';

const categories = [
  { title: 'Graphics & Design' },
  { title: 'Digital Marketing' },
  { title: 'Writing' },
  { title: 'Translation' },
  { title: 'Content Creator' }
];

const Home = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  
  console.log("currentUser homepage", currentUser);

  const [project, setProject] = useState();
  useEffect(() => {
    axios.get(`${BASE_URL}/api/Projects/GetAll?pageIndex=1&pageSize=5`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);
  console.log("project", project);
  return (
    <>
      <Navbar />
      <HeroSection />
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          {project.items.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CategoryCard title={job.title} min={job.minBudget} max={job.maxBudget} duration={job.duration} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home
