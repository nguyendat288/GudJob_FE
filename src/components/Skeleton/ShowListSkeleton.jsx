import React from 'react';
import { Box, Skeleton, Divider } from '@mui/material';

const ShowListSkeleton = () => {
  const skeletonItems = Array.from(new Array(5)); // Change the number to the number of skeleton items you need

  return (
    <Box bgcolor="#F8F8FF" borderRadius="5px" p={3}>
      <Box display="flex" mb={2}>
        <Skeleton variant="text" width={200} />
      </Box>
      <Divider />
      {skeletonItems.map((_, index) => (
        <Box key={index} mt={1} className="project-item">
          <Box mb={3}>
            <Box
              display="flex"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              <Box>
                <Box display="flex" alignItems="center">
                  <Skeleton variant="text" width={150} height={30} />
                  <Box
                    sx={{
                      display: 'inline-block',
                      padding: '2px 4px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      marginLeft: '8px',
                    }}
                  >
                    <Skeleton variant="text" width={60} />
                  </Box>
                </Box>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={100} />
              </Box>
              <Box ml="auto">
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
              </Box>
            </Box>
            <Box mt={1}>
              <Box m={2}>
                <Skeleton variant="text" width="100%" height={60} />
              </Box>
              <Skeleton variant="text" width={120} />
              <Box display="flex" flexWrap="wrap">
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={30}
                  sx={{ mt: 1, borderRadius: '10px', padding: '5px', ml: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={30}
                  sx={{ mt: 1, borderRadius: '10px', padding: '5px', ml: 2 }}
                />
              </Box>
            </Box>
            <Box mt={1} display="flex" justifyContent={'end'}>
              <Skeleton variant="text" width={100} />
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{ ml: 1 }}
              />
            </Box>
            <Box mt={1} display="flex" justifyContent="space-between">
              <Skeleton variant="text" width={100} />
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default ShowListSkeleton;
