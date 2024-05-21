import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ id, title, min, max, duration }) => {
  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/detail/${id}`);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent onClick={(e) => handleViewDetail(id)}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Salary: {min}$ ~ {max}$
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Estimate times: {duration}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
