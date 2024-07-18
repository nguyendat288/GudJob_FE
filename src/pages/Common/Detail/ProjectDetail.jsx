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
                                    sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}
                                    className="mt-2 ml-2 inline-block rounded-3xl border border-sky-500 p-2"
                                >
                                    <Typography fontSize='15px'>{item}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box display='flex' justifyContent='space-between' alignItems='center' p={4} pb={0}>
                        <Typography fontSize='12px'>Ngày tạo: {formatDate(detail?.createdDate)}</Typography>
                        <Box display='flex' alignItems='center'>
                            <Tooltip title="Report this project">
                                {currentUser?.userId !== detail?.createdBy && (
                                    <Box display='flex' alignItems='center' onClick={() => setIsReportModalOpen(true)} className="text-blue-600 cursor-pointer">
                                        <FlagCircleIcon />
                                        <Typography ml={1} fontSize='12px'>Report Project</Typography>
                                    </Box>
                                )}

                            </Tooltip>
                        </Box>
                    </Box>
                    <Box p={4} pb={0}>
                        <Box p={2} border='1px solid orange' borderRadius='4px' bgcolor='#FFF8E1'>
                            <Typography fontWeight='bold' color='orange'>Beware of scams</Typography>
                            <Typography fontSize='14px'>
                                If you are being asked to pay a security deposit, or if you are being asked to chat on Telegram, WhatsApp, or another messaging platform, it is likely a scam. Report these projects or contact Support for assistance.
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='flex-end' p={4}>
                        {currentUser?.role === ROLES.RECRUITER && currentUser?.userId === detail?.createdBy && (
                            <>
                                <Button
                                    className="text-xs"
                                    variant='contained'
                                    sx={{ marginRight: 2 }}
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
                </Paper>
            </Box >
            <Box flex='1' ml={4} display='flex' flexDirection='column' gap={2}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h6'>About Recruiter</Typography>
                    <Typography>This section contains information about the recruiter.</Typography>
                </Paper>
                <Paper sx={{ p: 2 }}>
                    <Typography variant='h6'>How to Write a Winning Bid</Typography>
                    <Typography>This section contains tips on writing a winning bid.</Typography>
                </Paper>

                <ReportModal
                    open={isReportModalOpen}
                    onClose={() => setIsReportModalOpen(false)}
                    onReport={handleReport}
                    type="project"
                    projectId={projectId}
                />
            </Box>
        </Box >
    );
};

export default ProjectDetail;
