import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Pagination,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectApi from '../../../services/projectApi';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import LoadingComponent from '../../../components/LoadingComponent';
import { formatDate } from '../../../utils/formatDate';
import { toast } from 'react-toastify';

const ListProjectRecruiter = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const [listProject, setListProject] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusId, setStatusId] = useState(3);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let res = await projectApi.GetAllProjectByUserId(
        currentUser?.userId,
        statusId,
        page,
        4
      );
      setListProject(res);
      setTotalPage(Math.ceil(res?.totalItemsCount / 4));
      setLoading(false);
    };
    getData();
  }, [currentUser, page, statusId, reload]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (newStatusId) => {
    setStatusId(newStatusId);
    setPage(1);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (search === '') {
      let res = await projectApi.GetAllProjectByUserId(
        currentUser?.userId,
        statusId,
        page,
        4
      );
      setListProject(res);
      setTotalPage(Math.ceil(res?.totalItemsCount / 4));
    } else {
      let params = {
        Keyword: search,
        StatusId: statusId,
        PageIndex: 1,
        PageSize: 4,
      };
      let res = await projectApi.SearchRecruiter(params);
      setListProject(res);
      setTotalPage(Math.ceil(res?.totalItemsCount / 4));
    }
    setLoading(false);
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleMarkAsComplete = async (id) => {
    try {
      await projectApi.MakeDoneProject(id);
      setReload((prev) => !prev);
      toast.success('Dự án đã hoàn thành');
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    console.log('vao day');
    setSearch(e.target.value);
  };

  return (
    <Box p={3} m={3} minHeight={'100vh'}>
      {loading && <LoadingComponent loading={loading} />}
      <Typography sx={{ fontSize: '2em', mb: 2 }} gutterBottom>
        Current Projects
      </Typography>
      <Box display="flex" gap={5} flexGrow={1} mb={3}>
        <TextField
          sx={{
            width: '50%',
          }}
          id="outlined-basic"
          label="Tìm kiếm "
          onChange={handleChange}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSearch}
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          Tìm kiếm
        </Button>
        <Box ml="auto">
          <Tooltip title="Tạo dự án" arrow>
            <Button
              sx={{
                bgcolor: '#28a745',
                color: '#fff',
                fontSize: '12px',
                '&:hover': { bgcolor: '#00CC00' },
              }}
              onClick={() => navigate('/create-new-project')}
              startIcon={<AddIcon />}
            >
              Tạo dự án
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Box className="mb-4">
        <div className="relative w-full flex justify-left">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-b-2 border-gray-300"></span>
          </div>
          <div className="relative flex justify-center space-x-1 bg-gray-100 rounded-full p-1 shadow">
            <button
              onClick={() => handleTabChange(1)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Chờ duyệt
            </button>
            <button
              onClick={() => handleTabChange(5)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 5
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Từ chối
            </button>
            <button
              onClick={() => handleTabChange(2)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 2
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đang mở
            </button>
            <button
              onClick={() => handleTabChange(3)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 3
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đang tiến hành
            </button>
            <button
              onClick={() => handleTabChange(9)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 9
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đang kiểm
            </button>
            <button
              onClick={() => handleTabChange(6)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                statusId === 6
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              Đã hoàn thành
            </button>
          </div>
        </div>
      </Box>
      {listProject?.items?.length > 0 ? (
        <Box>
          <Grid container spacing={2}>
            {listProject.items.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => handleDetail(project?.id)}
                >
                  <CardContent>
                    <Typography
                      variant="h1"
                      sx={{ fontSize: '1.5em' }}
                      gutterBottom
                    >
                      {project.title}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Category:</strong>{' '}
                      {project?.category?.categoryName}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Budget:</strong> {project.minBudget} -{' '}
                      {project.maxBudget} VND
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Duration:</strong> {project.duration} days
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Created date:</strong>{' '}
                      {formatDate(project.createdDate)}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <strong>Description:</strong>{' '}
                      <i>Select this project to see full description</i>
                    </Typography>
                    {project.statusId === 5 && (
                      <Typography variant="body1" component="div">
                        <strong>Reject reason:</strong>{' '}
                        <i>Select this project to see full reject reason</i>
                      </Typography>
                    )}
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <Chip
                        label={project?.projectStatus?.statusName}
                        color="primary"
                      />
                    </Box>
                    {(project.statusId === 3 || project.statusId === 9) && (
                      <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                        <Button
                          variant="outlined"
                          color="warning"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsComplete(project?.id);
                          }}
                        >
                          Mark as complete
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box className="flex justify-center mt-4">
            <Pagination
              count={totalPage}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      ) : (
        <Typography>No projects found.</Typography>
      )}
    </Box>
  );
};

export default ListProjectRecruiter;

const style = {
  p: 4,
  overflow: 'auto',
  maxHeight: window.innerHeight - 80,
};
