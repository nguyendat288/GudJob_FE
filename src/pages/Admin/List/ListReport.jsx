import React, { useEffect, useState } from 'react';
import reportApi from '../../../services/reportApi';
import ReportList from '../component/reportList';
import { Box, Button, Modal, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const ListReport = () => {
    const [reports, setReports] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [reportId, setReportId] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const allReports = await reportApi.getAllReportByUser();
                setReports(allReports);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReport();
    }, []);

    const handleOpenModal = (id) => {
        setReportId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleApprove = async () => {
        if (reportId) {
            await reportApi.approveReport(reportId);
            toast.success('Đã xử lý báo cáo')
            setOpenModal(false);
        }
    };

    return (
        <div>
            <ReportList
                reports={reports}
                onOpenModal={handleOpenModal}
            />
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" mb={2} sx={{fontSize: '1.875rem'}}>Confirm Resolved</Typography>
                    <Typography mb={4}>Are you sure to confirm this report is resolved?</Typography>
                    <Button variant="contained" color="primary" onClick={handleApprove}>Confirm</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ListReport;
