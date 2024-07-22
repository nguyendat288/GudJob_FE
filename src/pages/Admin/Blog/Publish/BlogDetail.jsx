import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import TopBar from './TopBar';
import ProjectDescription from '../../../../components/ProjectDescription';
import Footer from '../../../../components/Footer';
import { formatDateTime } from '../../../../utils/formatDate';

const BlogDetail = () => {
  const listBlog = {
    blogId: 11,
    title: 'Bài viết về IT ',
    description:
      '<p><strong>IT ngày càng được nhiều các bạn học sinh chú ý&nbsp;</strong></p><figure class="image"><img style="aspect-ratio:2560/1600;" src="https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/images%2FIT.jpg?alt=media&amp;token=8b50d939-4e68-4390-b632-4acaada32672" width="2560" height="1600"></figure>',
    userId: 21,
    isPublished: true,
    author: 'string',
    categoryId: 1,
    blogImage:
      'https://firebasestorage.googleapis.com/v0/b/goodjob-72768.appspot.com/o/file%2F1fb70fe2-1d77-4e4b-9b63-35379c24cc63?alt=media&token=f154c729-28e6-4c1c-86d0-4076cbf46c5e',
    categoryName: 'Công nghệ thông tin',
    createDate: '2024-07-17T16:03:28.958725',
    createTime: '17/07/2024 16:03',
  };
  return (
    <Box>
      <TopBar />
      <Box display="flex" m={5}>
        <Box flex="3.5">
          <Box alignItems={'center'} justifyContent="center">
            <Typography fontSize="30px" fontWeight="bold" mb={3}>
              {' '}
              {listBlog.title}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography> Tác giả : {listBlog.author} </Typography>
              <Typography>
                {' '}
                Ngày tạo : {formatDateTime(listBlog.createDate)}{' '}
              </Typography>
            </Box>
            <Divider />
            <Box mt={5}>
              <ProjectDescription description={listBlog.description} />
            </Box>
          </Box>
        </Box>
        <Box flex="1" ml={3} p={3}>
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
