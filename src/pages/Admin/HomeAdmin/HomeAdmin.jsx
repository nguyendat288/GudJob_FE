import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Typography,
} from '@mui/material';
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
import TypographyHeader from '../../../components/Typography/TypographyHeader';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import { formatDateReport } from '../../../utils/formatDate';
import DataGrids from './component/DataGrids';

const HomeAdmin = () => {
  const [categoryStatistic, setCategoryStatistic] = useState([]);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalProject, setTotalProject] = useState(0);
  const [freelacerCount, setFreelacerCount] = useState(0);
  const [recruiterCount, setRecruiterCount] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const [userStatistic, setUserStatistic] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newUserStatistic, setNewUserStatistic] = useState([]);

  const [typeStatistic, setTypeStatistic] = useState('1');
  const [StatisticUsers, setStatisticUsers] = useState([]);
  const [StatisticSkills, setStatisticSkills] = useState([]);
  const [StatisticProjects, setStatisticProjects] = useState([]);
  // const [columns, setColumns] = useState();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const GetData = async () => {
      if (typeStatistic === '1') {
        let res = await Statistic.StatisticUsers(1, 10);
        setStatisticUsers(res?.data?.items);
      }
      if (typeStatistic === '2') {
        let res = await Statistic.StatisticSkills(1, 10);
        setStatisticSkills(res?.data?.items);
      }
      if (typeStatistic === '3') {
        let res = await Statistic.StatisticProjects(1, 10);
        setStatisticProjects(res?.data?.items);
      }
    };
    GetData();
  }, [typeStatistic]);

  const columnUser = [
    {
      field: 'userName',
      headerName: 'Người dùng',
      width: 180,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'totalCompletedProjects',
      headerName: 'Số dự án hoàn thành',
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },

    {
      field: 'totalPositiveRatings',
      headerName: 'Đánh giá tích cực',
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'totalNegativeRatings',
      headerName: 'Đánh giá tiêu cực',
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
  ];

  const columnSkill = [
    {
      field: 'skillName',
      headerName: 'Kỹ năng',
      width: 180,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'categoryName',
      headerName: 'Danh mục',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'totalApprovedProject',
      headerName: 'Số dự án ',
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },

    {
      field: 'totalUsers',
      headerName: 'Số lượng người dùng',
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
  ];

  const columnProject = [
    {
      field: 'categoryName',
      headerName: 'Danh mục',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'totalProjects',
      headerName: 'Tổng số dự án',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'minimumBudget',
      headerName: 'Ngân sách tối thiểu',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },

    {
      field: 'maximumBudget',
      headerName: 'Ngân sách tối đa',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },

    {
      field: 'averageBudget',
      headerName: 'Ngân sách trung bình',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },

    {
      field: 'minimumDuration',
      headerName: 'Thời hạn tối thiểu ',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },

    {
      field: 'maximumDuration',
      headerName: 'Thời hạn tối đa ',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
    {
      field: 'averageDuration',
      headerName: 'Thời hạn trung bình',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ textAlign: 'center', width: '100%' }}>{params.value}</Box>
      ),
    },
  ];

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

  const handleOpen = () => setOpen(true);

  const handleDownload = async (isChatGpt) => {
    try {
      setLoading(true);
      const response = await Statistic.ExportStatistic(isChatGpt);
      const url = window.URL.createObjectURL(
        new Blob([response], { type: response.type })
      );
      const link = document.createElement('a');
      link.href = url;
      var date = new Date();

      link.setAttribute(
        'download',
        'Báo cáo ngày ' + formatDateReport(date.toString()) + '.xlsx'
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setLoading(false);
      setOpen(false);
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
          m: 5,
          bgcolor: 'white',
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
      </Box>

      {/* User======================================================  */}

      <Box
        sx={{
          m: 5,
          bgcolor: 'white',
          borderRadius: '20px',
        }}
      >
        <Box p={3}>
          <TypographyHeader title="Biểu đồ phân phối người dùng theo phân quyền" />
        </Box>
        <Box m={2} display="flex" height="450px">
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
      </Box>

      <Box
        m={5}
        sx={{
          height: '500px',
          bgcolor: 'white',
          borderRadius: '20px',
        }}
      >
        <Box pt={3} pl={3}>
          <TypographyHeader title="Biểu đồ biểu diễn người dùng mới" />
        </Box>
        <Box
          sx={{
            height: '450px',
          }}
        >
          <LineChart
            data={newUserStatistic}
            type="Biểu đồ của người dùng trong 30 ngày gần nhất "
          />
        </Box>
      </Box>

      <Box
        m={5}
        sx={{
          bgcolor: 'white',
          borderRadius: '20px',
        }}
      >
        <Box pt={3} pl={3}>
          <TypographyHeader title="Thống kê tổng quan" />
        </Box>
        <Box m={3}>
          <Select
            fullWidth="50%"
            sx={{ bgcolor: '#FFFFFF', mt: 2 }}
            value={typeStatistic}
            onChange={(e) => setTypeStatistic(e.target.value)}
          >
            <MenuItem value="1">Thống kê người dùng</MenuItem>
            <MenuItem value="2">Thống kê kỹ năng</MenuItem>
            <MenuItem value="3">Thống kê dự án</MenuItem>
          </Select>
          <Box
            sx={{
              mt: 3,
              height: '450px',
            }}
          >
            {typeStatistic === '1' && (
              <>
                <DataGrids row={StatisticUsers} column={columnUser} />
              </>
            )}
            {typeStatistic === '2' && (
              <>
                <DataGrids row={StatisticSkills} column={columnSkill} />
              </>
            )}
            {typeStatistic === '3' && (
              <>
                <DataGrids row={StatisticProjects} column={columnProject} />
              </>
            )}
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
              onClick={(e) => handleDownload(false)}
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
              onClick={(e) => handleDownload(true)}
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
  p: 4,
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

export default HomeAdmin;
