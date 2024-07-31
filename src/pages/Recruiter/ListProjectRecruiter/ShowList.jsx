import React, { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Typography,
  Alert,
  IconButton,
  Snackbar,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ProjectDescription from '../../../components/ProjectDescription';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatCurrency } from '../../../utils/formatCurrency';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { useSelector } from 'react-redux';
import projectApi from '../../../services/projectApi';

const ShowList = ({ listProject, setReloadList }) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleAddFavorite = async (userId, projectId) => {
    try {
      const response = await projectApi.AddFavorite({ userId, projectId });
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success',
      });
      setReloadList((prev) => !prev);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add project to favorites. Please try again.',
        severity: 'error',
      });
      console.log(error);
    }
  };

  const handleDeleteFavorite = async (userId, projectId) => {
    try {
      const response = await projectApi.DeleteFavorite({ userId, projectId });
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success',
      });
      setReloadList((prev) => !prev);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to remove project from favorites. Please try again.',
        severity: 'error',
      });
      console.log(error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box bgcolor="#F8F8FF" borderRadius="5px" p={3}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box display="flex" mb={2}>
        <Typography mr={1}> Tổng số dự án : </Typography>
        <TypographyTitle title={listProject?.totalItemsCount} />
      </Box>
      <Divider />
      {(listProject === undefined || listProject == null) && <LinearProgress />}

      {listProject?.items?.length === 0 && (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Alert severity="info">Hiện tại chưa có bản ghi nào .</Alert>
        </Container>
      )}
      {listProject?.items?.length !== 0 &&
        listProject?.items?.map((project, index) => (
          <Box key={index} mt={1} className="project-item">
            <Box mb={3}>
              <Box
                display="flex"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
                onClick={() => handleDetail(project?.id)}
              >
                <Box>
                  <Box display="flex" alignItems="center">
                    <TypographyTitle title={project?.title} color="#3366FF" />
                    <Box
                      sx={{
                        display: 'inline-block',
                        padding: '2px 4px',
                        backgroundColor: project?.projectStatus?.statusColor,
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        marginLeft: '8px',
                      }}
                    >
                      <Typography fontSize="10px">
                        {' '}
                        {project?.projectStatus?.statusName}{' '}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography fontWeight="bold" fontSize="14px">
                    Ngân sách : {formatCurrency(project?.minBudget)} -{' '}
                    {formatCurrency(project?.maxBudget)}
                  </Typography>
                  <Typography fontWeight="bold" fontSize="14px">
                    Thời gian : {project?.duration} ngày
                  </Typography>
                </Box>
                <Box ml="auto">
                  <Typography fontWeight="bold" fontSize="14px">
                    Tổng : {project?.totalBids} đấu thầu
                  </Typography>
                  <Typography fontWeight="bold" fontSize="14px">
                    Trung bình : {formatCurrency(project?.averageBudget)}
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                <Box m={2}>
                  <ProjectDescription description={project?.description} />
                </Box>
                {project?.skill?.length > 0 && (
                  <Typography fontWeight="bold" fontSize="14px">
                    Kỹ năng yêu cầu
                  </Typography>
                )}

                <Box display="flex" flexWrap="wrap">
                  {project?.skill?.length > 0 &&
                    project?.skill?.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          mt: 1,
                          borderRadius: '10px',
                          padding: '5px',
                          display: 'inline-block',
                          ml: 2,
                          border: '1px solid blue',
                        }}
                      >
                        <Typography fontSize="15px"> {item} </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
              <Box mt={1} display="flex" justifyContent={'end'}>
                <Box className="flex items-center">
                  <Typography className="mr-2">{project?.timeAgo}</Typography>
                </Box>
                {currentUser?.userId && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      project.isFavorite
                        ? handleDeleteFavorite(currentUser?.userId, project?.id)
                        : handleAddFavorite(currentUser?.userId, project?.id);
                    }}
                  >
                    {project.isFavorite ? (
                      <FavoriteTwoToneIcon sx={{ color: '#fad702' }} />
                    ) : (
                      <FavoriteBorderTwoToneIcon />
                    )}
                  </IconButton>
                )}
              </Box>
              <Box mt={1} display="flex" justifyContent="space-between">
                <Typography fontSize="10px" className="flex items-center">
                  Ngày tạo : {project?.createdDate}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
    </Box>
  );
};

export default ShowList;
