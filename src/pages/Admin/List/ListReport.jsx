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
  const [isApproved, setIsApproved] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reloadReports, setReloadReports] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const allReports = await reportApi.getAllReportByUser({
          page: page + 1,
          pageSize: pageSize,
          typeDes: typeDes === 'All' ? '' : typeDes,
        });
        setReports(allReports.items);
        setTotalReports(allReports.totalItemsCount);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [page, pageSize, typeDes, reloadReports]);

  const handleOpenModal = (id, isApproved) => {
    setIsApproved(isApproved);
    setReportId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleApprove = async () => {
    if (reportId) {
      await reportApi.approveReport(reportId);
      setReloadReports((prev) => !prev);
      toast.success('Đã xử lý báo cáo');
      setOpenModal(false);
    }
  };

  const handleReject = async () => {
    if (reportId) {
      await reportApi.rejectReport(reportId);
      setReloadReports((prev) => !prev);
      toast.success('Đã xử lý báo cáo');
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
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2} sx={{ fontSize: '1.875rem' }}>
            {isApproved ? 'Confirm Resolved' : 'Reject Report'}
          </Typography>
          <Typography mb={4}>
            {isApproved
              ? 'Are you sure to confirm this report is resolved?'
              : 'Are you sure to reject this report?'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={isApproved ? handleApprove : handleReject}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ListReport;
