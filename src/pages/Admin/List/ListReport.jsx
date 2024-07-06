import React, { useEffect, useState } from 'react';
import reportApi from '../../../services/reportApi';
import ReportList from '../component/reportList';
import { Box, Button, Modal, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const ListReport = () => {
    const [reports, setReports] = useState([]);
    const [totalReports, setTotalReports] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [typeDes, setTypeDes] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [reportId, setReportId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reloadReports, setReloadReports] = useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const allReports = await reportApi.getAllReportByUser({
                    page: page + 1,
                    pageSize: pageSize,
                    typeDes: typeDes === "All" ? "" : typeDes
                });
                setReports(allReports.items);
                setTotalReports(allReports.totalItemsCount)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [page, pageSize, typeDes, reloadReports]);

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
            setReloadReports(prev => !prev);
            toast.success('Đã xử lý báo cáo')
            setOpenModal(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <ReportList
                reports={reports}
                totalReports={totalReports}
                pageSize={pageSize}
                page={page}
                pageChange={handlePageChange}
                pageSizeChange={setPageSize}
                typeDes={typeDes}
                setTypeDes={setTypeDes}
                onOpenModal={handleOpenModal}
                loading={loading}
                setLoading={setLoading}
            />
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" mb={2} sx={{ fontSize: '1.875rem' }}>Confirm Resolved</Typography>
                    <Typography mb={4}>Are you sure to confirm this report is resolved?</Typography>
                    <Button variant="contained" color="primary" onClick={handleApprove}>Confirm</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ListReport;
