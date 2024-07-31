import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  Tooltip,
  FilledInput,
  InputAdornment,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';
import { ROLES } from '../../../constaints/role';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatDate } from '../../../utils/formatDate';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ReportModal from '../Profile/component/ReportModal';
import reportApi from '../../../services/reportApi';
import { toast } from 'react-toastify';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { formatCurrency } from '../../../utils/formatCurrency';
import BlogDescription from '../../../components/BlogDescription';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import projectApi from '../../../services/projectApi';

const ProjectDetail = ({
  detail,
  navigate,
  setOpenDelete,
  currentUser,
  handleOpenUpdate,
  projectId,
  myBidding,
  handleOpen,
  setReload,
}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleReport = async (reportData) => {
    await reportApi.createReport(reportData);
    toast.error('Đã khiếu nại dự án');
  };

  const handleDeleteFavorite = async (userId, projectId) => {
    try {
      const response = await projectApi.DeleteFavorite({ userId, projectId });
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success',
      });
      setReload((prev) => !prev);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to remove project from favorites. Please try again.',
        severity: 'error',
      });
      console.log(error);
    }
  };

  const handleAddFavorite = async (userId, projectId) => {
    try {
      const response = await projectApi.AddFavorite({ userId, projectId });
      setSnackbar({
        open: true,
        message: response.message,
        severity: 'success',
      });
      setReload((prev) => !prev);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add project to favorites. Please try again.',
        severity: 'error',
      });
      console.log(error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box display="flex" mt={4}>
      <Box flex="4">
        <Paper sx={{ bgcolor: '#FFFFFF', boxShadow: 3, borderRadius: 2 }}>
          <Box p={4} display="flex" justifyContent="space-between">
            <Box>
              <Box display="flex" alignItems="center">
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
                  <Typography fontSize="10px">
                    {detail?.projectStatus?.statusName}
                  </Typography>
                </Box>
              </Box>
              <Box className="mt-2 inline-block rounded-2xl bg-gray-300 p-2">
                <Typography fontSize="15px">
                  {detail?.category?.categoryName}
                </Typography>
              </Box>
            </Box>
            <Box className="flex-col items-center">
              <Typography className="mr-4 font-bold text-sm">
                Ngân sách: {formatCurrency(detail?.minBudget)} -{' '}
                {formatCurrency(detail?.maxBudget)}
              </Typography>
              <Typography className="mr-4 font-bold text-sm">
                Thời gian: {detail?.duration} ngày
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box p={4}>
            <Typography fontSize="14px" fontWeight="bold">
              Thông tin mô tả
            </Typography>
            <Box mt={2}>
              <BlogDescription description={detail?.description} />
            </Box>
          </Box>
          <Box pl={4}>
            <Typography fontSize="14px" fontWeight="bold">
              Kỹ năng yêu cầu
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {detail?.skill?.map((item, index) => (
                <Box
                  key={index}
                  sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}
                  className="mt-2 ml-2 inline-block rounded-3xl border border-sky-500 p-2"
                >
                  <Typography fontSize="15px">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={4}
            pb={0}
          >
            <Typography fontSize="12px">
              Ngày tạo: {formatDate(detail?.createdDate)}
            </Typography>
            <Box display="flex" alignItems="center">
              {currentUser?.userId !== detail?.createdBy && (
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={() => setIsReportModalOpen(true)}
                  className="text-blue-600 cursor-pointer"
                >
                  <Tooltip title="Report this project">
                    <FlagCircleIcon />
                  </Tooltip>
                  <Typography ml={1} fontSize="12px">
                    Tố cáo dự án
                  </Typography>
                </Box>
              )}
              <Box display="flex" sx={{ ml: 2 }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    detail?.isFavorite
                      ? handleDeleteFavorite(currentUser?.userId, detail?.id)
                      : handleAddFavorite(currentUser?.userId, detail?.id);
                  }}
                >
                  {detail?.isFavorite ? (
                    <FavoriteTwoToneIcon sx={{ color: '#fad702' }} />
                  ) : (
                    <FavoriteBorderTwoToneIcon />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box p={4} pb={0}>
            <Box
              p={2}
              border="1px solid"
              borderRadius="4px"
              style={{
                backgroundColor:
                  detail?.statusId === 5
                    ? 'var(--background-warning-color)'
                    : '#FFF8E1',
                borderColor:
                  detail?.statusId === 5 ? 'var(--secondary-color)' : 'orange',
              }}
            >
              <Typography
                fontWeight="bold"
                style={{
                  color:
                    detail?.statusId === 5
                      ? 'var(--secondary-color)'
                      : 'orange',
                }}
              >
                {detail?.statusId === 5
                  ? 'Lý do dự án bị từ chối'
                  : 'Cảnh giác với những trò lừa đảo'}
              </Typography>
              <Typography fontSize="14px">
                {detail?.statusId === 5
                  ? detail?.rejectReason
                  : 'Nếu bạn được yêu cầu trả tiền đặt cọc hoặc nếu bạn được yêu cầu trò chuyện trên Telegram, WhatsApp hoặc nền tảng nhắn tin khác thì đó có thể là một trò lừa đảo. Báo cáo các dự án này hoặc liên hệ với bộ phận Hỗ trợ để được hỗ trợ.'}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={4} gap={2}>
            {currentUser?.role === ROLES.RECRUITER &&
              currentUser?.userId === detail?.createdBy && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/update-project/${detail?.id}`)}
                  >
                    <EditOutlinedIcon />
                    <Typography>Chỉnh sửa</Typography>
                  </Button>

                  {detail?.statusId !== 2 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={(e) => setOpenDelete(true)}
                    >
                      <DeleteOutlineOutlinedIcon />
                      <Typography>Xoá</Typography>
                    </Button>
                  )}
                </>
              )}
            {myBidding == null &&
              detail?.statusId === 2 &&
              currentUser?.role !== ROLES.RECRUITER &&
              currentUser?.role !== ROLES.ADMIN && (
                <Button variant="outlined" onClick={handleOpen}>
                  Đấu thầu
                </Button>
              )}
          </Box>
        </Paper>
        {myBidding != null && detail?.statusId === 2 && (
          <>
            <Paper
              sx={{ bgcolor: '#F8F8FF', borderRadius: '5px', mt: 2, p: 5 }}
            >
              <Box display="flex" justifyContent="space-between">
                <TypographyHeader title="Thông tin đấu thấu của bạn " />
                <Tooltip title="Chỉnh sửa">
                  <IconButton
                    type="button"
                    sx={{
                      bgcolor: '#FFFF99',
                      border: '1px solid #444444',
                    }}
                    onClick={(e) => handleOpenUpdate(e)}
                    p={1}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box display="flex" mt={3} justifyContent="space-between">
                <Box>
                  <TypographyTitle title="Ngân sách bạn mong muốn " />
                  <FilledInput
                    sx={{
                      bgcolor: '#FFFFFF',
                      mt: 2,
                    }}
                    value={myBidding?.budget}
                    type="number"
                    endAdornment={
                      <InputAdornment position="end">VND</InputAdornment>
                    }
                    inputProps={{
                      'aria-label': 'weight',
                      readOnly: true,
                    }}
                  />
                </Box>
                <Box>
                  <TypographyTitle title="Thời gian bạn có thể hoàn thành " />
                  <FilledInput
                    sx={{
                      bgcolor: '#FFFFFF',
                      mt: 2,
                    }}
                    value={myBidding?.duration}
                    type="number"
                    endAdornment={
                      <InputAdornment position="end">ngày</InputAdornment>
                    }
                    inputProps={{
                      'aria-label': 'weight',
                      readOnly: true,
                    }}
                  />
                </Box>
              </Box>
              <Box mt={3}>
                <TypographyTitle title="Bình luận" />
                <TextField
                  fullWidth
                  sx={{
                    bgcolor: '#FFFFFF',
                    mt: 2,
                  }}
                  inputProps={{
                    readOnly: true,
                  }}
                  value={myBidding?.proposal}
                />
              </Box>
            </Paper>
          </>
        )}
      </Box>
      <Box flex="1" ml={4} display="flex" flexDirection="column" gap={2}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">About Recruiter</Typography>
          <Typography>
            This section contains information about the recruiter.
          </Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">How to Write a Winning Bid</Typography>
          <Typography>
            This section contains tips on writing a winning bid.
          </Typography>
        </Paper>

        <ReportModal
          open={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onReport={handleReport}
          type="project"
          projectId={projectId}
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            variant="filled"
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ProjectDetail;
