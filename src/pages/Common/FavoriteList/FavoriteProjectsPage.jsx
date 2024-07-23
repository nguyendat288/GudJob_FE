import React, { useState, useEffect } from 'react';
import FavoriteProjectsList from '../FavoriteList/FavoriteProjectsList';
import { useSelector } from 'react-redux';
import projectApi from '../../../services/projectApi';
import { Snackbar, Alert } from '@mui/material';

const FavoriteProjectsPage = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchFavoriteProjects = async () => {
      try {
        const response = await projectApi.GetFavoriteProjects(
          currentUser?.userId,
          page
        );
        setProjects(response.items);
        setTotalPages(Math.ceil(response.totalItemsCount / 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchFavoriteProjects();
    }
  }, [currentUser, page, loading]);

  const handleRemoveFavorite = async (projectId) => {
    try {
      const response = await projectApi.DeleteFavorite({
        userId: currentUser?.userId,
        projectId,
      });
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success',
      });
      setLoading((prev) => !prev);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to remove project from favorites. Please try again.',
        severity: 'error',
      });
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="flex justify-center bg-gray-50 p-4">
      <FavoriteProjectsList
        projects={projects}
        onRemoveFavorite={handleRemoveFavorite}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
      />
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
    </div>
  );
};

export default FavoriteProjectsPage;
