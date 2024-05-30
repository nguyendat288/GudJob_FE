import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection';
import CategoryCard from '../../components/CategoryCard';
import { useSelector } from 'react-redux';
import authApi from '../../services/authApi.js';

const Home = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser)
  

  const [project, setProject] = useState();
    useEffect(() => {
      const getData = async () => {
          let res = await authApi.GetAllProject(1, 5);
          setProject(res)
      }
      getData()
  }, [])

  return (
    <>
      <Navbar />
      <HeroSection />
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          {currentUser ? project?.items.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CategoryCard id= {job.id} title={job.title} min={job.minBudget} max={job.maxBudget} duration={job.duration} />
            </Grid>
          )) : <p>chua dang nhap</p>}
        </Grid>
      </Container>
    </>
  );
}

export default Home
