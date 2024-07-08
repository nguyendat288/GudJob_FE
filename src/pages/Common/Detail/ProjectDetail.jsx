import { Box, Button, Divider, Paper, Typography, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import ProjectDescription from '../../../components/ProjectDescription';
import { ROLES } from '../../../constaints/role';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatDate } from '../../../utils/formatDate';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportModal from '../Profile/component/ReportModal';
import reportApi from '../../../services/reportApi';
import { toast } from 'react-toastify';

const ProjectDetail = ({ detail, navigate, handleDelete, currentUser, projectId }) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const handleReport = async (reportData) => {
        await reportApi.createReport(reportData);
        toast.error('Đã khiếu nại dự án')
    };

    return (
        <Box display='flex' mt={4}>
            <Box flex='4'>
                <Paper sx={{ bgcolor: '#F8F8FF' }}>
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
                                <Tooltip title="Report this project">
                                    <WarningAmberIcon onClick={() => setIsReportModalOpen(true)} className="text-red-600 cursor-pointer ml-2" />
                                </Tooltip>
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
                                >
                                    <Typography fontSize='15px'>{item}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box display='flex'>
                        <Box p={4}>
                            <Typography fontSize='12px'>Ngày tạo: {formatDate(detail?.createdDate)}</Typography>
                        </Box>
                        <Box className="ml-auto mr-4 flex space-x-2">
                            {currentUser?.role === ROLES.RECRUITER && currentUser?.userId === detail?.createdBy && (
                                <>
                                    <Button
                                        className="text-xs"
                                        variant='contained'
                                        onClick={() => navigate(`/update-project/${detail?.id}`)}
                                    >
                                        Update Project
                                    </Button>
                                    {detail?.statusId !== 2 && (
                                        <Button
                                            className="text-xs"
                                            variant='contained'
                                            onClick={(e) => handleDelete(detail?.id)}
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