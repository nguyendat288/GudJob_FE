import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PieChart from './component/PieChart';
import Statistic from '../../../services/adminApi/statistic';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LoadingComponent from '../../../components/LoadingComponent';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LineChart from './component/LineChart';

const HomeAdmin = () => {
  const [categoryStatistic, setCategoryStatistic] = useState([]);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalProject, setTotalProject] = useState(0);
  const [freelacerCount, setFreelacerCount] = useState(0);
  const [recruiterCount, setRecruiterCount] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const [userStatistic, setUserStatistic] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newUserStatistic, setNewUserStatistic] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await Statistic.CategoriesPieChartData();
        setTotalCategory(response?.data?.length);
        const mockPieData = response?.data.map((item) => ({
          id: item?.categoryName,
          label: item?.categoryName,
          value: item?.totalProjects,
        }));
        let total = 0;
        response?.data?.forEach((item) => (total += item?.totalProjects));
        setTotalProject(total);
        setCategoryStatistic(mockPieData);

        let res = await Statistic.UsersPieChartData();
        setUserStatistic(res?.data?.data);
        setFreelacerCount(res?.data?.freelacerCount);
        setRecruiterCount(res?.data?.recruiterCount);
        setTotalUser(res?.data?.totalUser);
        let resLine = await Statistic.NewUserData();
        ConvertDataLineChart(resLine?.data);
      } catch (error) {
        console.error(error);
      }
    };
    GetData();
  }, []);

  const ConvertDataLineChart = (data) => {
    const mockLineData = [
      {
        id: 'Tổng người dùng',
        data: data.map((item) => ({
          x: item.formattedDate,
          y: item.totalUserCount,
        })),
      },
      {
        id: 'Tổng freelancer',
        data: data.map((item) => ({
          x: item.formattedDate,
          y: item.freelancerCount,
        })),
      },
      {
        id: 'Tổng nhà tuyển dụng',
        data: data.map((item) => ({
          x: item.formattedDate,
          y: item.recruiterCount,
        })),
      },
    ];
    setNewUserStatistic(mockLineData);
  };

  const handleDownload = async () => {
    try {
      setOpen(true);
      setLoading(true);

      const response = await Statistic.ExportStatistic();
      const url = window.URL.createObjectURL(
        new Blob([response], { type: response.type })
      );
      setDownloadUrl(url);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ style }}>
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
            onClick={handleDownload}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Export
          </Button>
        </Box>
      </Box>

      {/* Category======================================================  */}

      <Box
        m={5}
        display="flex"
        height="450px"
        bgcolor="white"
        borderRadius="20px"
      >
        <Box flex="3">
          <PieChart data={categoryStatistic} />
        </Box>

        <Box flex="1" mt="50px" mr={3}>
          <Box
            sx={{
              height: '20%',
              width: '100%',
              border: '1px solid #000000',
              bgcolor: '#FFFF33',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CategoryOutlinedIcon
              sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
            />
            <Box ml={1}>
              <Typography fontSize="18px" fontWeight="bold">
                Tổng danh mục
              </Typography>
              <Typography>{totalCategory} danh mục</Typography>
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
            }}
          >
            <NewspaperOutlinedIcon
              sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
            />
            <Box ml={1}>
              <Typography fontSize="18px" fontWeight="bold">
                Tổng số dự án
              </Typography>
              <Typography>{totalProject} dự án</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* User======================================================  */}

      <Box
        m={5}
        display="flex"
        height="450px"
        bgcolor="white"
        borderRadius="20px"
      >
        <Box flex="3">
          <PieChart data={userStatistic} />
        </Box>

        <Box flex="1" mt="50px" mr={3}>
          <Box
            sx={{
              height: '20%',
              width: '100%',
              border: '1px solid #000000',
              bgcolor: '#FFFF33',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AccountCircleOutlinedIcon
              sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
            />
            <Box ml={1}>
              <Typography fontSize="18px" fontWeight="bold">
                Tổng người dùng
              </Typography>
              <Typography>{totalUser} người dùng</Typography>
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
            }}
          >
            <AccountCircleOutlinedIcon
              sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
            />
            <Box ml={1}>
              <Typography fontSize="18px" fontWeight="bold">
                Nhà tuyển dụng
              </Typography>
              <Typography>{recruiterCount} người dùng</Typography>
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
            }}
          >
            <AccountCircleOutlinedIcon
              sx={{ m: 2, fontSize: '40px', color: '#3e4396' }}
            />
            <Box ml={1}>
              <Typography fontSize="18px" fontWeight="bold">
                Freelancer
              </Typography>
              <Typography>{freelacerCount} người dùng</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        m={5}
        sx={{
          height: '450px',
          bgcolor: 'white',
          borderRadius: '20px',
        }}
      >
        <LineChart
          data={newUserStatistic}
          type="Biểu đồ của người dùng trong 30 ngày gần nhất "
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          {loading && <LoadingComponent loading={loading} />}

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Vui lòng đợi trong giây lát
          </Typography>
          {/* <CircularProgress value={downloadUrl ? false : true} /> */}
          {downloadUrl && (
            <Button
              href={downloadUrl}
              style={{
                marginTop: '20px',
                marginLeft: '10px',
              }}
              variant="outlined"
            >
              Click here to download
            </Button>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const style = {
  p: 4,
  overflow: 'auto',
  maxHeight: window.innerHeight - 80,
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default HomeAdmin;
