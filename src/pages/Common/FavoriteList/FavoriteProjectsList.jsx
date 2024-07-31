import React from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  IconButton,
  LinearProgress,
  Pagination,
} from '@mui/material';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { formatCurrency } from '../../../utils/formatCurrency';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import { truncateText } from '../../../utils/truncateText';
import ProjectDescription from '../../../components/ProjectDescription';

const FavoriteProjectsList = ({
  projects,
  onRemoveFavorite,
  page,
  setPage,
  totalPages,
  loading,
}) => {
  return (
    <Box className="bg-gray-100 p-4 rounded-lg shadow-md w-1/2">
      <Box textAlign="center" mb={2}>
        <TypographyHeader title="Favorite projects" />
      </Box>
      {loading && <LinearProgress />}
      {!loading && projects.length === 0 && (
        <Container maxWidth="md" className="mt-5">
          <Typography variant="h6" color="textSecondary">
            No favorite projects found.
          </Typography>
        </Container>
      )}
      {projects.map((project) => (
        <Box
          key={project.id}
          className="p-4 mb-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" color="primary">
              {project.projectName}
            </Typography>
            <IconButton onClick={() => onRemoveFavorite(project.projectId)}>
              <FavoriteTwoToneIcon sx={{ color: '#fad702' }} />
            </IconButton>
          </Box>
          <Typography variant="body1" className="mt-2">
            <ProjectDescription description={project.description} />
            {/* {truncateText(project.description, 100)} */}
          </Typography>
          <Typography variant="body2" className="mt-1 font-bold">
            Budget: {formatCurrency(project.minBudget)} -{' '}
            {formatCurrency(project.maxBudget)}
          </Typography>
          <Typography variant="body2">
            Duration: {project.duration} days
          </Typography>
          <Typography variant="body2">
            Created: {project.createdProject}
          </Typography>
          <Divider className="my-4" />
        </Box>
      ))}
      <Box className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default FavoriteProjectsList;
