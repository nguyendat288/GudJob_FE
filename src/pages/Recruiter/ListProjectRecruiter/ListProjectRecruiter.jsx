import { Box, Button, Pagination, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectApi from '../../../services/projectApi';
import { useSelector } from 'react-redux';
import ShowList from './ShowList';
import AddIcon from '@mui/icons-material/Add';
import LoadingComponent from '../../../components/LoadingComponent';

const ListProjectRecruiter = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const [listProject, setListProject] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let res = await projectApi.GetAllProjectByUserId(
        currentUser?.userId,
        page,
        5
      );
      setListProject(res);
      setTotalPage(Math.ceil(res?.totalItemsCount / 5));
      setLoading(false);
    };
    getData();
  }, [currentUser, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (search === '') {
      let res = await projectApi.GetAllProjectByUserId(
        currentUser?.userId,
        page,
        5
      );
      setListProject(res);
      setTotalPage(Math.ceil(res?.totalItemsCount / 5));
    } else {
      let params = {
        Keyword: search,
        IsDeleted: true,
        PageIndex: 1,
        PageSize: 5,
      };
      let res = await projectApi.SearchRecruiter(params);
      setListProject(res);
      setTotalPage(Math.ceil(res?.totalItemsCount / 5));
    }
    setLoading(false);
  };

  return (
    <Box sx={style}>
      {loading && <LoadingComponent loading={loading} />}

      <Box display="flex" alignItems="center" mb={3}>
        {/* <Header
          title="DANH SÁCH DỰ ÁN"
          subtitle="Danh sách các dự án của bạn"
        /> */}
        <Box display="flex" gap={5} flexGrow={1}>
          <TextField
            sx={{
              width: '50%',
            }}
            id="outlined-basic"
            label="Tìm kiếm "
            onChange={(e) => setSearch(e.target.value)}
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
        </Box>

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
      <ShowList listProject={listProject} />
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPage}
          defaultPage={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ListProjectRecruiter;

const style = {
  p: 4,
  overflow: 'auto',
  maxHeight: window.innerHeight - 80,
};
