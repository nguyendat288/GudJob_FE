import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import categoryApi from '../../../services/categoryApi'
import { Link } from 'react-router-dom'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import HeroSection from '../../../components/HeroSection';

const Home = () => {
  const [listCategory, setListCategory] = useState([])
  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryApi.GetAllCategory();
      setListCategory(res)
    }
    getCategory()
  }, [])
  console.log(listCategory);
  return (
    <>
      <HeroSection />
      <Box m={3}>
        <Box>
          <Typography fontSize='25px' fontWeight='bold'>Explore popular categories </Typography>
          <Grid container spacing={3} mt={2}>
            {listCategory.length !== 0 && listCategory.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  component={Link}
                  to={`/category/${item.id}`}
                  sx={{ maxWidth: 345, textDecoration: 'none', cursor: 'pointer' }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item?.image} 
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.categoryName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Divider />
        <Box mt={3}>
          <Typography fontSize='25px' fontWeight='bold'>What our website can help you ? </Typography>
          <Box display="flex">
            <Box flex='1' p={3}>
              <CardMedia
                component="img"
                height="350"
                image='https://cdn.tgdd.vn/Files/2021/07/09/1366892/top-8-loai-tranh-phong-thuy-cho-nguoi-menh-kim-hut-tai-loc-may-man-202107091426133314.jpg'
              />
            </Box>

            <Box flex='1' p={3}>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example context
              </Typography>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example context
              </Typography>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example context
              </Typography>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                <CheckBoxOutlinedIcon sx={{ color: 'green', mr: 1 }} /> Example context
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box mt={3}>
          <Typography fontSize='25px' fontWeight='bold'> Explore more features with our membership </Typography>
          <Box display="flex">
            <Box flex='1' p={3}>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                New feature with membership
              </Typography>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                New feature with membership
              </Typography>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                New feature with membership
              </Typography>
              <Typography variant="h6" display="flex" alignItems="center" mb={2}>
                New feature with membership
              </Typography>
            </Box>
            <Box flex='1' p={3}>
              <CardMedia
                component="img"
                height="350"
                image='https://cdn.tgdd.vn/Files/2021/07/09/1366892/top-8-loai-tranh-phong-thuy-cho-nguoi-menh-kim-hut-tai-loc-may-man-202107091426133314.jpg'
              />
            </Box>
          </Box>
        </Box>
        {/* <Divider />
        <Box mt={3}>
          <Typography fontSize='25px' fontWeight='bold'> What you need we've got it  </Typography>
          
        </Box>
        <Divider /> */}
      </Box>
    </>
  )
}

export default Home
