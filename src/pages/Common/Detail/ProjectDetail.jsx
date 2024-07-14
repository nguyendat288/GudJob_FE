import { Box, Button, Divider, Paper, Typography, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import ProjectDescription from '../../../components/ProjectDescription';
import { ROLES } from '../../../constaints/role';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatDate } from '../../../utils/formatDate';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

import ReportModal from '../Profile/component/ReportModal';
import reportApi from '../../../services/reportApi';
import { toast } from 'react-toastify';

const ProjectDetail = ({ detail, navigate, handleDelete, currentUser, projectId }) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const handleReport = async (reportData) => {
        await reportApi.createReport(reportData);
        toast.error('Đã khiếu nại dự án');
    };

    return (
        <Box display='flex' mt={4}>
            <Box flex='4'>
                <Paper sx={{ bgcolor: '#FFFFFF', boxShadow: 3, borderRadius: 2 }}>
                    <Box p={4} display='flex' justifyContent='space-between'>
                        <Box>
                            <Box display='flex' alignItems='center'>
                                <TypographyTitle title={detail?.title} color="blue" />
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        padding: '4px 8px',
                                        backgroundColor: detail?.projectStatus?.statusColor,
                                        borderRadius: '10px',
                                        border: '1px solid #ccc',
                                        ml: 2,
                                    }}
                                >
                                    <Typography fontSize='10px'>{detail?.projectStatus?.statusName}</Typography>
                                </Box>
                               
                            </Box>
                            <Box
                                className="mt-2 inline-block rounded-2xl bg-gray-300 p-2"
                            >
                                <Typography fontSize='15px'>{detail?.category?.categoryName}</Typography>
                            </Box>
                        </Box>
                        <Box className="flex-col items-center">
                            <Typography className="mr-4 font-bold text-sm">Ngân sách: {detail?.minBudget}VND - {detail?.maxBudget}VND</Typography>
                            <Typography className="mr-4 font-bold text-sm">Thời gian: {detail?.duration} ngày</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box p={4}>
                        <Typography fontSize='14px' fontWeight='bold'>Thông tin mô tả</Typography>
                        <Box mt={2}>
                            <ProjectDescription description={detail?.description} />
                        </Box>
                    </Box>
                    <Box pl={4}>
                        <Typography fontSize='14px' fontWeight='bold'>Kỹ năng yêu cầu</Typography>
                        <Box display='flex' flexWrap='wrap'>
                            {detail?.skill?.map((item, index) => (
                                <Box
                                    key={index}
                                    className="mt-2 ml-2 inline-block rounded-2xl border border-blue-600 p-2"
                                    sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}
                                >
                                    <Typography fontSize='15px'>{item}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Box p={4}>
                            <Typography fontSize='12px'>Ngày tạo: {formatDate(detail?.createdDate)}</Typography>
                        </Box>
                        <Box p={4}>
                        {currentUser?.userId != detail?.createdBy && (<>
                                    <Tooltip title="Report this project">
                                        <FlagCircleIcon
                                            onClick={() => setIsReportModalOpen(true)}
                                            className="text-blue-600 cursor-pointer ml-2"
                                            sx={{ '&:hover': { color: 'red' } }}
                                        />
                                    </Tooltip>
                                </>)}

                            {currentUser?.role === ROLES.RECRUITER && currentUser?.userId === detail?.createdBy && (
                                <>
                                    <Button
                                        variant='contained'
                                        onClick={() => navigate(`/update-project/${detail?.id}`)}
                                        sx={{
                                            bgcolor: '#FF9800',
                                            '&:hover': { backgroundColor: '#d0e0ff' },
                                            padding: '4px 8px'
                                        }}
                                    >
                                        Update Project
                                    </Button>
                                    {detail?.statusId !== 2 && (
                                        <Button
                                            variant='contained'
                                            onClick={(e) => handleDelete(detail?.id)}
                                            sx={{
                                                bgcolor: '#f44336',
                                                ml: 2,
                                                '&:hover': { backgroundColor: '#ffe0e0' },
                                                padding: '4px 8px'
                                            }}
                                        >
                                            Delete Project
                                        </Button>
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box flex='1' ml={4}>
                <ReportModal
                    open={isReportModalOpen}
                    onClose={() => setIsReportModalOpen(false)}
                    onReport={handleReport}
                    type="project"
                    projectId={projectId}
                />
            </Box>
        </Box>
    );
};

export default ProjectDetail;
