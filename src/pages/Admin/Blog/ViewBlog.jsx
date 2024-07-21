import {
  Box,
  Button,
  IconButton,
  Modal,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import LoadingComponent from '../../../components/LoadingComponent';
import blogApi from '../../../services/blogApi';
import DataGrids from './DataGrids';
import { formatDateTime } from '../../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
const ViewBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listBlog, setListBlog] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setDeleteItemId(null);
  };

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      let res = await blogApi.GetAllBlog(1, 10);
      setListBlog(res?.items);
    };
    getData();
    setLoading(false);
  }, []);

  const columns = [
    {
      field: 'author',
      headerName: 'Tác giả',
      width: 150,
    },
    {
      field: 'categoryName',
      headerName: 'Chủ đề ',
      width: 200,
    },
    {
      field: 'title',
      headerName: 'Tiêu đề',
      width: 250,
    },
    {
      field: 'createDate',
      headerName: 'Ngày tạo',
      width: 250,
      renderCell: (params) => (
        <>
          <Box mt={2}>
            <Typography> {formatDateTime(params?.row?.createDate)} </Typography>
          </Box>
        </>
      ),
    },
    {
      field: '',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <Box display={'flex'}>
          <IconButton onClick={(e) => handleEdit(params?.row?.blogId)}>
            <Typography color="blue">
              <EditOutlinedIcon />
            </Typography>
          </IconButton>
          <IconButton onClick={(e) => handleDelete(params?.row?.blogId)}>
            <Typography color="red">
              <DeleteOutlineOutlinedIcon />
            </Typography>
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'a',
      headerName: 'Công khai',
      width: 150,
      renderCell: (params) => (
        <Box display={'flex'}>
          <Switch
            checked={params?.row?.isPublished}
            value={params?.row?.isPublished}
            onChange={(e) => handleUpdatePublish(params?.row?.blogId)}
          />
        </Box>
      ),
    },
  ];
  const handleEdit = (id) => {
    navigate(`/update-blog/${id}`);
  };

  const handleUpdatePublish = async (id) => {
    await blogApi.UpdatePublish(id);
    updateItem(id);
  };

  const updateItem = (blogId) => {
    setListBlog((prev) =>
      prev.map((item) =>
        item.blogId === blogId
          ? { ...item, isPublished: !item.isPublished }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setOpen(true);
  };

  const handleCreate = () => {
    navigate('/create-blog');
  };

  const handleConfirm = async () => {
    if (deleteItemId == null) {
      return;
    }
    await blogApi.DeleteBlog(deleteItemId);
    removeItem(deleteItemId);
    setDeleteItemId(null);
    setOpen(false);
  };

  const removeItem = (blogId) => {
    setListBlog((prev) => prev.filter((item) => item.blogId !== blogId));
  };

  return (
    <Box className="p-4" sx={{ width: '100%', overflow: 'auto' }}>
      {loading && <LoadingComponent loading={loading} />}
      <Box display="flex" alignItems="center" mb={3}>
        <Header
          title="DANH SÁCH BÀI VIẾT"
          subtitle="Danh sách các bài viết trong trang web"
        />
        <Box ml="auto">
          <Tooltip title="Tạo bài viết" arrow>
            <Button
              sx={{
                bgcolor: '#28a745',
                color: '#fff',
                fontSize: '12px',
                '&:hover': { bgcolor: '#00CC00' },
              }}
              onClick={() => handleCreate()}
              startIcon={<AddIcon />}
            >
              Tạo bài viết
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Box>
        <DataGrids row={listBlog} column={columns} />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={style}>
          <DeleteOutlineOutlinedIcon color="error" sx={{ fontSize: 64 }} />
          <TypographyTitle title="Xác nhận" />

          <Typography sx={{ mt: 2, mb: 4 }}>
            Bạn có chắc chắn muốn xoá bài viết ?
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => handleConfirm()}
            sx={{ mr: 2 }}
          >
            Chắc chắn
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Không
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewBlog;

const style = {
  position: 'absolute',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px',
  textAlign: 'center',
};
