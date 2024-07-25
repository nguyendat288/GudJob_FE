import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Footer from '../../../../components/Footer';
import { formatDateTime } from '../../../../utils/formatDate';
import blogApi from '../../../../services/blogApi';
import LoadingComponent from '../../../../components/LoadingComponent';
import BlogDescription from '../../../../components/BlogDescription';
import TopBarFreelancer from '../../../Freelancer/LayOut/TopBarFreelancer';

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      let res = await blogApi.GetBlogById(blogId);
      setBlog(res);
      setLoading(false);
    };
    getBlog();
  }, []);

  return (
    <Box>
      {loading && <LoadingComponent loading={loading} />}
      <TopBarFreelancer />
      <Box display="flex" m={5}>
        <Box flex="3.5">
          <Box alignItems={'center'} justifyContent="center">
            <Typography fontSize="30px" fontWeight="bold" mb={3}>
              {' '}
              {blog?.title}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography> Tác giả : {blog?.author} </Typography>
              <Typography>
                {' '}
                Ngày tạo : {formatDateTime(blog?.createDate)}{' '}
              </Typography>
            </Box>
            <Divider />
            <Box mt={5}>
              <BlogDescription description={blog?.description} />
            </Box>
          </Box>
        </Box>
        <Box flex="1" ml={3} p={3} bgcolor="yellow">
          <Box>
            <Typography fontSize="20px" fontWeight="400">
              {' '}
              Bài viết liên quan{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default BlogDetail;
