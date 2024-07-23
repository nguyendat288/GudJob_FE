import React, { useEffect, useState } from 'react';
import ListBlog from './ListBlog';
import { Box, Typography } from '@mui/material';
import Footer from '../../../../components/Footer';
import blogApi from '../../../../services/blogApi';
import LoadingComponent from '../../../../components/LoadingComponent';
import ListBlogNew from './ListBlogNew';
import TopBarFreelancer from '../../../Freelancer/LayOut/TopBarFreelancer';

const HomeBlog = () => {
  const [listBlogHomePage, setListBlogHomePage] = useState([]);
  const [listBlogHot, setListBlogHot] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListBlog = async () => {
      try {
        setLoading(true);
        let params = {
          Top: 4,
          IsHomePage: true,
        };
        const res = await blogApi.Gets(params);
        setListBlogHomePage(res);

        let params1 = {
          Top: 4,
          isHot: true,
        };
        const res1 = await blogApi.Gets(params1);
        setListBlogHot(res1);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getListBlog();
  }, []);

  return (
    <Box>
      <TopBarFreelancer />
      {loading && <LoadingComponent loading={loading} />}

      <Box p={4}>
        <Typography fontSize="30px" fontWeight="bold" mb={2}>
          Bài viết nổi bật
        </Typography>
        <ListBlog listBlog={listBlogHot} />

        <Typography mt={5} fontSize="30px" fontWeight="bold" mb={2}>
          Bài viết mới nhất
        </Typography>
        <ListBlogNew listBlog={listBlogHomePage} />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomeBlog;
