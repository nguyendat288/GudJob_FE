import { Avatar, Box, Button, Paper, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { ROLES } from '../../../constaints/role';
import reportApi from '../../../services/reportApi';
import { toast } from 'react-toastify';
import ReportModal from '../Profile/component/ReportModal';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
const ListBidding = ({ listBidding, currentUser, createdBy, handleAccept, detail }) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [bid, setBid] = useState();

    const handleReport = async (reportData) => {
        await reportApi.createReport(reportData);
        toast.error('Đã khiếu nại dự án')
    };

    const handleClickReport = (id) => {
        setBid(id);
        setIsReportModalOpen(true);
    }

    return (
        <Box display='flex' >
            <Box flex='4' >
                {listBidding?.items?.length === 0 && (
                    <Typography> Chưa có bidding nào </Typography>
                )}
                {listBidding && listBidding?.items?.map((item, index) => (
                    <div key={index}>
                        <Paper sx={{ bgcolor: '#F8F8FF', borderRadius: '5px', mt: 1 }}>
                            <Box p={3}>
                                <Box display='flex'>
                                    <Box display='flex'>
                                        <Avatar alt="Remy Sharp"
                                            sx={{
                                                width: '50px',
                                                height: '50px'
                                            }}
                                            src={item?.appUser?.avatar} />
                                        <Box ml={2}>
                                            <Box display='flex' alignItems='center'>
                                                <Typography fontSize='15px' fontWeight='bold'> {item?.appUser?.name} </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyItems: 'center',
                                                        color: '#FFD700',
                                                        fontSize: '18px',
                                                    }}
                                                >
                                                    <StarIcon />
                                                </Typography>
                                                <Typography>5.0</Typography>
                                                <Typography>| {item?.appUser?.address?.country}</Typography>
                                            </Box>
                                            <Typography fontSize='15px' fontWeight='bold'> Skill | skill </Typography>
                                        </Box>
                                    </Box>
                                    <Box ml='auto'>
                                        <Typography> Budget : {item?.budget}$ </Typography>
                                        <Typography> in {item?.duration} days </Typography>
                                    </Box>
                                </Box>
                                <Box display='flex' justifyContent='space-between' alignItems='center' mt={1}>
                                    <Typography>{item?.proposal} </Typography>
                                    <Box display='flex' alignItems='center'>
                                        <Tooltip title="Report this bidding">
                                            <Box display='flex' alignItems='center' onClick={() => handleClickReport(item?.id)} className="text-blue-600 cursor-pointer">
                                                <FlagCircleIcon />
                                                <Typography ml={1} fontSize='12px'>Report Bidding</Typography>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                {currentUser != null && currentUser?.role === ROLES.RECRUITER && currentUser?.userId === createdBy && detail.projectStatus.id !== 3 && (
                                    <>
                                        <Box display='flex' mt={1} ml='auto'>
                                            <Button variant='contained' onClick={(e) => handleAccept(item?.id)}>Accept</Button>
                                        </Box>
                                    </>
                                )}

                            </Box>
                        </Paper>
                    </div>
                ))}

            </Box>
            <Box flex='1' ml={2}>
                <ReportModal
                    open={isReportModalOpen}
                    onClose={() => setIsReportModalOpen(false)}
                    onReport={handleReport}
                    type="bid"
                    bid={bid}
                />
            </Box>
        </Box>
    )
}

export default ListBidding
