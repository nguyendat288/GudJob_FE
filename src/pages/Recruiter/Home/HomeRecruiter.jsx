import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LoadingComponent from '../../../components/LoadingComponent';
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import PieChart from '../../Admin/HomeAdmin/component/PieChart';
import Statistic from '../../../services/adminApi/statistic';
import { useNavigate } from 'react-router-dom';

const HomeRecruiter = () => {
  const [categoryStatistic, setCategoryStatistic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPostedProjects, settotalPostedProjects] = useState(0);
  const [totalDoingProjects, settotalDoingProjects] = useState(0);
  const [totalCompletedProjects, settotalCompletedProjects] = useState(0);
  const [totalPendingProjects, settotalPendingProjects] = useState(0);
  // const [columns, setColumns] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await Statistic.RecruiterDashboard();
        console.log(response);

        setTotalProjects(response?.data?.totalProjects);
        settotalPostedProjects(response?.data?.totalPostedProjects);
        settotalDoingProjects(response?.data?.totalDoingProjects);
        settotalCompletedProjects(response?.data?.totalCompletedProjects);
        settotalPendingProjects(response?.data?.totalPendingProjects);

        const mockPieData = response?.data?.projectsPerCate?.map((item) => ({
          id: item?.categoryName,
          label: item?.categoryName,
          value: item?.totalProjects,
        }));
        setCategoryStatistic(mockPieData);
      } catch (error) {
        console.error(error);
      }
    };
    GetData();
  }, []);

  const handleOpen = () => setOpen(true);

  return (
    <Box sx={style}>
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: '#3e4396',
              color: '#e0e0e0',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
            onClick={handleOpen}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Xuất báo cáo
          </Button>
        </Box>
      </Box>

      {/* Category======================================================  */}

      <Box
        sx={{
          m: 3,
          borderRadius: '20px',
        }}
      >
        <Box p={3}>
          <TypographyHeader title="Biểu đồ phân phối dự án theo danh mục" />
        </Box>
        <Box m={2} display="flex" height="450px">
          <Box flex="3">
            <PieChart data={categoryStatistic} />
          </Box>

          <Box flex="1" mr={3}>
            <Box
              sx={{
                height: '20%',
                width: '100%',
                border: '1px solid #000000',
                bgcolor: '#FFFF33',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={(e) => navigate('/list-project-recruiter/3')}
            >
              <CategoryOutlinedIcon
                sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
              />
              <Box ml={1}>
                <Typography fontSize="18px" fontWeight="bold">
                  Tổng dự án
                </Typography>
                <Typography>{totalProjects} dự án</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                height: '20%',
                width: '100%',
                border: '1px solid #000000',
                bgcolor: '#FFFF33',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={(e) => navigate('/list-project-recruiter/3')}
            >
              <NewspaperOutlinedIcon
                sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
              />
              <Box ml={1}>
                <Typography fontSize="18px" fontWeight="bold">
                  Tổng dự án đã đăng
                </Typography>
                <Typography>{totalPostedProjects} dự án</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                height: '20%',
                width: '100%',
                border: '1px solid #000000',
                bgcolor: '#FFFF33',
                borderRadius: '20px',
                display: 'flex',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={(e) => navigate('/list-project-recruiter/3')}
            >
              <NewspaperOutlinedIcon
                sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
              />
              <Box ml={1}>
                <Typography fontSize="18px" fontWeight="bold">
                  Tổng dự án đang tiến hành
                </Typography>
                <Typography>{totalDoingProjects} dự án</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                height: '20%',
                width: '100%',
                border: '1px solid #000000',
                bgcolor: '#FFFF33',
                borderRadius: '20px',
                display: 'flex',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={(e) => navigate('/list-project-recruiter/6')}
            >
              <NewspaperOutlinedIcon
                sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
              />
              <Box ml={1}>
                <Typography fontSize="18px" fontWeight="bold">
                  Tổng dự án đã hoàn thành
                </Typography>
                <Typography>{totalCompletedProjects} dự án</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                height: '20%',
                width: '100%',
                border: '1px solid #000000',
                bgcolor: '#FFFF33',
                borderRadius: '20px',
                display: 'flex',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={(e) => navigate('/list-project-recruiter/1')}
            >
              <NewspaperOutlinedIcon
                sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
              />
              <Box ml={1}>
                <Typography fontSize="18px" fontWeight="bold">
                  Tổng dự án chờ duyệt
                </Typography>
                <Typography>{totalPendingProjects} dự án</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          {loading && <LoadingComponent loading={loading} />}
          <Box textAlign="center" mb={2}>
            <Typography color="blue">
              {' '}
              <DownloadOutlinedIcon fontSize="large" />
            </Typography>
            <TypographyTitle title="Xuất báo cáo" />
          </Box>
          <Box
            bgcolor="#FFFF66"
            p={2}
            border="1px solid #110000"
            borderRadius="20px"
          >
            <Typography>
              <Typography fontWeight="bold">Chú ý :</Typography>
              Xuất báo cáo với Chat GPT sẽ nhận thêm đề xuất, tư vấn từ dữ liệu
              thống kê ( Quá trình này có thể mất vài phút ) .
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              //   onClick={(e) => handleDownload(false)}
              sx={{
                flexGrow: 1,
                bgcolor: '#6666FF',
                marginRight: '8px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#5050CC',
                },
              }}
            >
              <DownloadOutlinedIcon sx={{ marginRight: '8px' }} />
              Xuất báo cáo
            </Button>
            <Button
              //   onClick={(e) => handleDownload(true)}
              variant="outlined"
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#f0f0f0',
                  borderColor: '#6666FF',
                  color: '#6666FF',
                },
              }}
            >
              <DownloadOutlinedIcon sx={{ marginRight: '8px' }} />
              Xuất báo cáo với ChatGPT
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const style = {
  overflow: 'auto',
  maxHeight: window.innerHeight - 80,
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default HomeRecruiter;
