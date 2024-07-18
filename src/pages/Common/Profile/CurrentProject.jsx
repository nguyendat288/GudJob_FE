import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Pagination,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import profileApi from '../../../services/profileApi';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../utils/formatDate';

function CurrentProject() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [allProjects, setAllProjects] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [statusId, setStatusId] = useState(2); // Default to "Đã bid"

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await profileApi.getUserProjectByStatus({
          userId: currentUser?.userId,
          statusId: statusId,
          pageIndex: page,
          pageSize: pageSize,
        });
        setAllProjects(allProjects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [page, pageSize, currentUser?.userId, statusId]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (newStatusId) => {
    setStatusId(newStatusId);
    setPage(1); // Reset to first page when changing tabs
  };

  return (
    <Box
      p={3}
      m={3}
      border="1px solid #ccc"
      borderRadius={5}
      className="bg-white"
    >
      <Typography sx={{ fontSize: '2em', mb: 2 }} gutterBottom>
        Current Projects
      </Typography>
      <Box className="mb-4">
        <div className="relative w-full flex justify-left">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-b-2 border-gray-300"></span>
          </div>
          <div className="relative flex justify-center space-x-1 bg-gray-100 rounded-full p-1 shadow">
            <button
              onClick={() => handleTabChange(2)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 2
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đã bid
            </button>
            <button
              onClick={() => handleTabChange(3)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 3
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đang làm
            </button>
            <button
              onClick={() => handleTabChange(6)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 6
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đã hoàn thành
            </button>
          </div>
        </div>
      </Box>
      {allProjects?.items?.length > 0 ? (
        <Box>
          <Grid container spacing={2}>
            {allProjects.items.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ position: 'relative' }}>
                  <CardContent>
                    <Typography
                      variant="h1"
                      sx={{ fontSize: '1.5em' }}
                      gutterBottom
                    >
                      {project.projectName}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Project Owner:</strong> {project.projectOwner}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Bid Budget:</strong> {project.bidBudget} VND
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Duration:</strong> {project.duration} days
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Deadline:</strong> {formatDate(project.deadline)}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Time Bid:</strong> {formatDate(project.timeBid)}
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Chip label={project.status} color="primary" />
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                      <Button variant="outlined" color="warning">
                        Mark as done
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(allProjects.totalItemsCount / pageSize)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      ) : (
        <Typography>No projects found.</Typography>
      )}
    </Box>
  );
}

export default CurrentProject;
