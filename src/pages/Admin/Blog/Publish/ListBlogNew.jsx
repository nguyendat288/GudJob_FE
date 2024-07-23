import { Box, Grid, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { truncateText } from '../../../../utils/truncateText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const ListBlogNew = ({ listBlog }) => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/blog-detail/${id}`);
  };

  return (
    <Box display="flex" bgcolor="#F8F8FF" borderRadius="20px" p={5}>
      {listBlog.length > 0 && (
        <Grid container spacing={2}>
          {listBlog.map((blog, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Box display="flex">
                <img
                  src={blog?.blogImage}
                  alt={blog?.title}
                  style={{
                    width: '40%',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavigation(blog?.blogId)}
                />
                <Box
                  sx={{
                    mt: 1,
                    ml: 2,
                    cursor: 'pointer',
                  }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Tooltip title={blog?.title}>
                    <Typography
                      fontWeight="bold"
                      onClick={() => handleNavigation(blog.blogId)}
                      style={{ cursor: 'pointer' }}
                    >
                      {truncateText(blog?.title, 200)}
                    </Typography>
                  </Tooltip>
                  <Typography mt={2} fontSize="10px">
                    <AccessTimeIcon /> {blog.createTime}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ListBlogNew;
