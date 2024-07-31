import {
  Box,
  Button,
  Divider,
  FilledInput,
  InputAdornment,
  LinearProgress,
  Modal,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import projectApi from '../../../services/projectApi';
import biddingApi from '../../../services/biddingApi';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProjectDetail from './ProjectDetail';
import ListBidding from './ListBidding';
import Header from '../../Recruiter/LayOutRecruiter/Header';
import LoadingComponent from '../../../components/LoadingComponent';
import TypographyTitle from '../../../components/Typography/TypographyTitle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
const Detail = () => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [value, setValue] = useState('1');
  const [detail, setDetail] = useState(null);

  const [budget, setBudget] = useState(0);
  const [errorBudget, seterrorBudget] = useState(false);
  const [helperTextBudget, setHelperTextBudget] = useState('');
  const [comment, setComment] = useState('');
  const [errorcomment, seterrorcomment] = useState(false);
  const [helperTextcomment, setHelperTextcomment] = useState('');
  const [duration, setDuration] = useState(0);
  const [errorduration, seterrorduration] = useState(false);
  const [helperTextduration, setHelperTextduration] = useState('');

  const [budgetUpdate, setBudgetUpdate] = useState(0);
  const [errorBudgetUpdate, seterrorBudgetUpdate] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState('');
  const [errorcommentUpdate, seterrorcommentUpdate] = useState(false);
  const [durationUpdate, setDurationUpdate] = useState(0);
  const [errordurationUpdate, seterrordurationUpdate] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (currentUser !== null && value === '1') {
      const getUserBidding = async () => {
        setLoading(true);
        try {
          let res = await biddingApi.GetBidByProjectLoggedUser(projectId);
          setBudgetUpdate(res?.result?.budget);
          setDurationUpdate(res?.result?.duration);
          setCommentUpdate(res?.result?.proposal);
          setMyBidding(res?.result);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
      getUserBidding();
    }
  }, [projectId, currentUser, value]);

  const [listBidding, setListBidding] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [openBidding, setOpenBidding] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [myBidding, setMyBidding] = useState(null);

  const [biddingId, setBiddingId] = useState(null);

  const handleOpen = () => {
    if (currentUser == null) {
      const currentUrl = window.location.href;
      localStorage.setItem('currentUrl', currentUrl);
      navigate('/login');
    }
    setOpen(true);
  };
  const handleOpenBidding = (biddingId) => {
    setOpenBidding(true);
    setBiddingId(biddingId);
  };

  const handleClose = () => setOpen(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getProjectDetail = async () => {
      setLoading(true);
      try {
        let res = await projectApi.GetProjectDetailsById(projectId, navigate);
        setDetail(res);
      } catch (error) {
        toast.error('Không tải được thông tin');
      } finally {
        setLoading(false);
      }
    };
    getProjectDetail();
  }, [projectId, reload]);

  useEffect(() => {
    const getAllBidding = async () => {
      if (value === '2') {
        setLoading(true);
        try {
          let res = await biddingApi.GetBiddingListByProjectId(
            projectId,
            page,
            5
          );
          setListBidding(res?.data);
          setTotalPage(Math.ceil(res?.data?.totalItemsCount / 5));
        } catch (error) {
          toast.error('Không tải được thông tin');
        } finally {
          setLoading(false);
        }
      }
    };
    getAllBidding();
  }, [value, projectId, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let isError = false;
    if (
      budget === 0 ||
      budget >= 2000000000 ||
      budget === '' ||
      budget === '0'
    ) {
      seterrorBudget(true);
      isError = true;
      setHelperTextBudget('* Phải lớn  hơn 0 mà nhỏ hơn 2 tỷ.');
    } else {
      seterrorBudget(false);
      setHelperTextBudget('');
    }
    if (
      duration <= 0 ||
      duration === '' ||
      duration === '0' ||
      duration >= 100
    ) {
      seterrorduration(true);
      isError = true;
      setHelperTextduration('* Phải lớn  hơn 0 và nhỏ hơn 100');
    } else {
      seterrorduration(false);
      setHelperTextduration('');
    }
    if (comment === '') {
      seterrorcomment(true);
      isError = true;
      setHelperTextcomment('* Không được để trống .');
    } else {
      seterrorcomment(false);
      setHelperTextcomment('');
    }

    if (isError) {
      setLoading(false);
      return;
    }

    let data = {
      projectId: projectId,
      proposal: comment,
      duration: duration,
      budget: budget,
    };
    try {
      await biddingApi.AddBidding(data, navigate);
      setOpen(false);
    } catch (error) {
      toast.error('Đấu thầu dự án thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    let isError = false;
    if (
      budgetUpdate === 0 ||
      budgetUpdate >= 2000000000 ||
      budgetUpdate === '' ||
      budgetUpdate === '0'
    ) {
      seterrorBudgetUpdate(true);
      isError = true;
      setHelperTextBudget('* Phải lớn  hơn 0 mà nhỏ hơn 2 tỷ.');
    } else {
      seterrorBudgetUpdate(false);
      setHelperTextBudget('');
    }
    if (
      durationUpdate <= 0 ||
      durationUpdate === '' ||
      durationUpdate === '0' ||
      durationUpdate >= 100
    ) {
      seterrordurationUpdate(true);
      isError = true;
      setHelperTextduration('* Phải lớn  hơn 0 và nhỏ hơn 100');
    } else {
      seterrordurationUpdate(false);
      setHelperTextduration('');
    }
    if (commentUpdate === '') {
      seterrorcommentUpdate(true);
      isError = true;
      setHelperTextcomment('* Không được để trống .');
    } else {
      seterrorcommentUpdate(false);
      setHelperTextcomment('');
    }

    if (isError) {
      return;
    }
    setLoading(true);

    let data = {
      id: myBidding?.id,
      proposal: commentUpdate,
      duration: durationUpdate,
      budget: budgetUpdate,
    };
    try {
      await biddingApi.UpdateBidding(data);
      setMyBidding((pre) => ({
        ...pre,
        proposal: commentUpdate,
        duration: durationUpdate,
        budget: budgetUpdate,
      }));
      setOpenUpdate(false);
    } catch (error) {
      toast.error('Đấu thầu dự án thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseBidding = () => {
    setOpenBidding(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await projectApi.DeleteProject(projectId, navigate);
      setLoading(false);
    } catch (error) {
      toast.error('Xoá dự án thất bại');
    }
  };

  const handleAccept = async () => {
    setLoading(true);
    if (biddingId == null || biddingId === undefined) {
      return;
    }
    try {
      await biddingApi.AcceptBidding(biddingId, navigate);
      toast.success('Đồng ý đầu thầu thành công');
      setLoading(false);
      setBiddingId(null);
    } catch (error) {
      toast.error('Đồng ý đấu thầu thất bại');
    }
    setOpenBidding(false);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box m={5}>
        {loading && <LoadingComponent loading={loading} />}

        <Box mb={3}>
          {value === '1' && (
            <Header
              title="MÔ TẢ DỰ ÁN"
              subtitle="Thông tin chi tiết của dự án"
            />
          )}
          {value === '2' && (
            <Header
              title="DANH SÁCH ĐẤU THẦU"
              subtitle="Danh sách đấu thầu của dự án"
            />
          )}
        </Box>

        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Mô tả dự án" sx={{ fontSize: '12px' }} value="1" />
                <Tab label="Đấu thầu" sx={{ fontSize: '12px' }} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {detail == null ? (
                <LinearProgress />
              ) : (
                <ProjectDetail
                  detail={detail}
                  navigate={navigate}
                  // handleDelete={handleDelete}
                  currentUser={currentUser}
                  projectId={projectId}
                  handleOpen={handleOpen}
                  setOpenDelete={setOpenDelete}
                  myBidding={myBidding}
                  handleOpenUpdate={handleOpenUpdate}
                  setReload={setReload}
                />
              )}
            </TabPanel>
            <TabPanel value="2">
              {listBidding == null ? (
                <LinearProgress />
              ) : (
                <ListBidding
                  listBidding={listBidding}
                  currentUser={currentUser}
                  createdBy={detail?.createdBy}
                  handleOpenBidding={handleOpenBidding}
                  detail={detail}
                  page={page}
                  totalPage={totalPage}
                  handlePageChange={handlePageChange}
                />
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
      {/* Add =============================== */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={style}>
          <Box p={2}>
            <Typography fontSize="18px" fontWeight="bold">
              Đặt giá đấu thầu cho dự án{' '}
            </Typography>
          </Box>
          <Divider />
          <Box pt={3} pl={3}>
            <Typography fontSize="15px">
              Bạn sẽ có thể chỉnh sửa giá thầu của mình cho đến khi dự án được
              trao cho ai đó.
            </Typography>
          </Box>
          <Box m={5}>
            <Box display="flex" gap={1}>
              <Box flex="1">
                <Typography fontWeight="bold">Giá đấu thầu </Typography>
                <FilledInput
                  value={budget}
                  type="number"
                  error={errorBudget}
                  id="filled-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">VND</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{ 'aria-label': 'weight' }}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <Typography color="red">{helperTextBudget}</Typography>
              </Box>
              <Box flex="1">
                <Typography fontWeight="bold">Thời gian</Typography>
                <FilledInput
                  type="number"
                  value={duration}
                  error={errorduration}
                  id="filled-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">ngày</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{ 'aria-label': 'weight' }}
                  onChange={(e) => setDuration(e.target.value)}
                />
                <Typography color="red">{helperTextduration}</Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography fontWeight="bold">Bình luận</Typography>
              <TextField
                fullWidth
                error={errorcomment}
                helperText={helperTextcomment}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
            >
              Đấu thầu
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Delete ============================ */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={styleDelete}>
          <DeleteOutlineOutlinedIcon color="error" sx={{ fontSize: 64 }} />
          <TypographyTitle title="Xác nhận" />

          <Typography sx={{ mt: 2, mb: 4 }}>
            Bạn có chắc chắn muốn xoá bài viết ?
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => handleConfirmDelete()}
            sx={{ mr: 2 }}
          >
            Chắc chắn
          </Button>
          <Button variant="outlined" onClick={handleCloseDelete}>
            Không
          </Button>
        </Box>
      </Modal>
      {/* Xác nhận Bidding  */}
      <Modal
        open={openBidding}
        onClose={handleCloseBidding}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={styleDelete}>
          <HandshakeOutlinedIcon color="success" sx={{ fontSize: 64 }} />
          <TypographyTitle title="Xác nhận" />

          <Typography sx={{ mt: 2, mb: 4 }}>
            Bạn có chắc chắn muốn chấp nhận đấu thầu này ?
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => handleAccept()}
            sx={{ mr: 2 }}
          >
            Chắc chắn
          </Button>
          <Button variant="outlined" onClick={handleCloseBidding}>
            Không
          </Button>
        </Box>
      </Modal>
      {/* Update ============================= */}
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={style}>
          <Box p={2}>
            <Typography fontSize="18px" fontWeight="bold">
              Đặt giá đấu thầu cho dự án{' '}
            </Typography>
          </Box>
          <Divider />
          <Box pt={3} pl={3}>
            <Typography fontSize="15px">
              Bạn sẽ có thể chỉnh sửa giá thầu của mình cho đến khi dự án được
              trao cho ai đó.
            </Typography>
          </Box>
          <Box m={5}>
            <Box display="flex" gap={1}>
              <Box flex="1">
                <Typography fontWeight="bold">Giá đấu thầu </Typography>
                <FilledInput
                  value={budgetUpdate}
                  type="number"
                  error={errorBudgetUpdate}
                  id="filled-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">VND</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{ 'aria-label': 'weight' }}
                  onChange={(e) => setBudgetUpdate(e.target.value)}
                />
                <Typography color="red">{helperTextBudget}</Typography>
              </Box>
              <Box flex="1">
                <Typography fontWeight="bold">Thời gian</Typography>
                <FilledInput
                  type="number"
                  value={durationUpdate}
                  error={errordurationUpdate}
                  id="filled-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">ngày</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{ 'aria-label': 'weight' }}
                  onChange={(e) => setDurationUpdate(e.target.value)}
                />
                <Typography color="red">{helperTextduration}</Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography fontWeight="bold">Bình luận</Typography>
              <TextField
                fullWidth
                error={errorcommentUpdate}
                helperText={helperTextcomment}
                value={commentUpdate}
                onChange={(e) => setCommentUpdate(e.target.value)}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Button
              variant="contained"
              disabled={loading}
              onClick={(e) => handleSubmitUpdate(e)}
            >
              Chỉnh sửa
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};

const styleDelete = {
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

export default Detail;
