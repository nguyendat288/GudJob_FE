import { Box, Typography, Card, CardContent, Chip, Grid, Pagination, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import profileApi from '../../../services/profileApi';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../utils/formatDate';

function CurrentProject() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const [allProjects, setAllProjects] = useState(null);
    const [page, setPage] = useState(1); // MUI Pagination starts from 1
    const [pageSize, setPageSize] = useState(4);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const allProjects = await profileApi.getUserProjectByStatus({
                    userId: currentUser?.userId,
                    statusId: 3,
                    pageIndex: page,
                    pageSize: pageSize,
                });
                setAllProjects(allProjects);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProjects();
    }, [page, pageSize, currentUser?.userId]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box p={3} m={3} borderRadius={5} className="bg-white">
            <Typography sx={{ fontSize: "2em", mb: 2 }} gutterBottom>
                Current Projects
            </Typography>
            {allProjects?.items?.length > 0 ? (
                <Box>
                    <Grid container spacing={2}>
                        {allProjects.items.map((project, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card sx={{ position: 'relative' }}>
                                    <CardContent>
                                        <Typography variant="h1" sx={{fontSize: "1.5em"}} gutterBottom>{project.projectName}</Typography>
                                        <Typography variant="body1" component="div"><strong>Project Owner:</strong> {project.projectOwner}</Typography>
                                        <Typography variant="body1" component="div"><strong>Bid Budget:</strong> {project.bidBudget} VND</Typography>
                                        <Typography variant="body1" component="div"><strong>Duration:</strong> {project.duration} days</Typography>
                                        <Typography variant="body1" component="div"><strong>Deadline:</strong> {formatDate(project.deadline)}</Typography>
                                        <Typography variant="body1" component="div"><strong>Time Bid:</strong> {formatDate(project.timeBid)}</Typography>
                                        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                                            <Chip label={project.status} color="primary" />
                                        </Box>
                                        <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                                            <Button variant="outlined" color="warning">Mark as done</Button>
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