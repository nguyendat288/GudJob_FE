import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CategoryCard = ({ title, min, max, duration }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
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
