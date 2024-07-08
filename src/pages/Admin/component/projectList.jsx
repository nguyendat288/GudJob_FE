import React from 'react';
import { Box, Container, Divider, LinearProgress, Typography, Alert, Button } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { ROLES } from '../../../constaints/role';
// import { useNavigate } from 'react-router-dom';
import ProjectDescription from '../../../components/ProjectDescription';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatDate } from '../../../utils/formatDate';
import projectApi from '../../../services/projectApi';

const ProjectList = ({ listProject, setReload }) => {
    const handleChangeStatus = async (id, statusId) => {
        let data = {
            statusId: statusId,
            projectId: id
        }
        await projectApi.changeProjectStatus(data);
        setReload(true);
    }

    return (
        <Box>
            {listProject === undefined && <LinearProgress />}
            {listProject?.items?.length === 0 && (
                <Container maxWidth="md" style={{ marginTop: '20px' }}>
                    <Alert severity="info">Hiện tại chưa có bản ghi nào .</Alert>
                </Container>
            )}
            {listProject?.items?.length !== 0 &&
                listProject?.items?.map((project, index) => (
                    project?.projectStatus?.id === 1 && (
                        <Box key={index} mt={1} className="project-item">
                            <Box mb={3} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                <Box
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Box display="flex">
                                        <Box>
                                            <Box display="flex">
                                                <TypographyTitle title={project?.title} color="#3366FF" />
                                                <Box
                                                    sx={{
                                                        display: 'inline-block',
                                                        padding: '2px 4px',
                                                        backgroundColor: project?.projectStatus?.statusColor,
                                                        borderRadius: '8px',
                                                        border: '1px solid #ccc',
                                                    }}
                                                >
                                                    <Typography fontSize="10px"> {project?.projectStatus?.statusName} </Typography>
                                                </Box>
                                            </Box>
                                            <Typography fontWeight="bold" fontSize="14px">
                                                Ngân sách : {project?.minBudget}VND - {project?.maxBudget}VND
                                            </Typography>
                                            <Typography fontWeight="bold" fontSize="14px">
                                                Thời gian : {project?.duration} ngày
                                            </Typography>
                                        </Box>
                                        <Box ml="auto">
                                            <Typography fontWeight="bold" fontSize="14px">
                                                Trung bình : {project?.averageBudget}VND
                                            </Typography>
                                            <Button onClick={() => handleChangeStatus(project?.id, project?.projectStatus?.id)}>Approve</Button>
                                        </Box>
                                    </Box>
                                    <Box mt={1}>
                                        <Box m={2}>
                                            <ProjectDescription description={project?.description} />
                                        </Box>
                                        <Typography fontWeight="bold" fontSize="14px">
                                            Kỹ năng yêu cầu
                                        </Typography>
                                        <Box display="flex">
                                            {project?.skill?.map((item, index) => (
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
                                    <Box mt={1}>
                                        <Typography fontSize="12px">Ngày tạo : {formatDate(project?.createdDate)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>
                    )
                ))}
        </Box>
    );
};

export default ProjectList;
