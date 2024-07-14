import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import TypographyTitle from '../../../components/Typography/TypographyTitle';

const CreateBlog = () => {
  const userId = useSelector((state) => state.auth.login?.currentUser?.userId);

  return (
    <Box mt={10}>
      <TypographyTitle title="Create Blog" />

      
    </Box>
  )
}

export default CreateBlog

// {
//   "createdBy": 0,
//   "title": "string",
//   "description": "string",
//   "categoryId": 0,
//   "blogImage": "string"
// }