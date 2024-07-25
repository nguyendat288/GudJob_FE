import { Box, Divider, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TypographyTitle from '../../../../components/Typography/TypographyTitle';
import { truncateText } from '../../../../utils/truncateText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const ListBlog = ({ listBlog }) => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/blog-detail/${id}`);
  };

  return (
    <Box display="flex" borderRadius="20px">
      <Box flex="3" display="flex" p={5} bgcolor="#F8F8FF">
        <Box flex="2.5">
          {listBlog[0] === undefined && (
            <Typography>Chưa có bài viết nào .</Typography>
          )}
          <img
            src={listBlog[0]?.blogImage}
            alt={listBlog[0]?.title}
            style={{
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation(listBlog[0]?.blogId)}
          />
          <Tooltip title={listBlog[0]?.title}>
            <Box
              sx={{
                cursor: 'pointer',
              }}
            >
              <TypographyTitle
                marginT={1}
                title={listBlog[0]?.title}
                onClick={() => handleNavigation(listBlog[0]?.blogId)}
              />
            </Box>
          </Tooltip>

          <Typography mt={2}>{listBlog[0]?.shortDesction}</Typography>
          <Typography mt={2} fontSize="10px">
            <AccessTimeIcon /> {listBlog[0]?.createTime}
          </Typography>
        </Box>
        <Box flex="1.5" ml={2}>
          {listBlog.length > 0 &&
            listBlog.slice(1).map((blog, index) => (
              <div key={index}>
                <Divider />
                <Box key={index} mb={2} mt={1} display="flex">
                  <img
                    src={blog?.blogImage}
                    alt={blog?.title}
                    style={{
                      width: '50%',
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
                        {truncateText(blog?.title, 50)}
                      </Typography>
                    </Tooltip>

                    <Typography mt={2} fontSize="10px">
                      <AccessTimeIcon /> {blog.createTime}
                    </Typography>
                  </Box>
                </Box>
              </div>
            ))}
        </Box>
      </Box>
      <Box flex="1" ml={1} bgcolor="blue"></Box>
    </Box>
  );
};

export default ListBlog;
