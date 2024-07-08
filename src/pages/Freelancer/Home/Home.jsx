import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import categoryApi from '../../../services/categoryApi'
import { useNavigate } from 'react-router-dom'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import HeroSection from '../../../components/HeroSection';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import { useTranslation } from 'react-i18next';
const Home = () => {
  const [listCategory, setListCategory] = useState([])
  const navigate = useNavigate()
  const {t} = useTranslation('home');

  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryApi.GetAllCategory();
      setListCategory(res)
    }
    getCategory()
  }, [])
  
  const handleClick = (id) => {
    navigate(`/category/${id}`)
  }

  return (
    <>
      <HeroSection />
      <Box m={3}>
        <Box mb={3}>
          <TypographyHeader title= {t('popular_category' )} /> 
          
          <Grid container spacing={3} mt={2}>
            {listCategory.length !== 0 && listCategory.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                onClick={(e) => handleClick(item?.id)}
                  sx={{   
                    maxWidth: 345,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                    '&:focus': {
                      outline: 'none',
                      boxShadow: '0 0 0 4px rgba(0, 123, 255, 0.5)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item?.image}
                  />
                  <CardContent>
                    <TypographyTitle title={item?.categoryName} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Divider />
        <Box mt={3}>
          <TypographyHeader title={t('website_can_help_you_about_?')} />
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
          <TypographyHeader title={t('explore_more_features_with_membership')} />
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
