import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const CategoryCard = ({ title, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
